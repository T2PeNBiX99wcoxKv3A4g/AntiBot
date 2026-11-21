import {Native} from "@photino-net-utils/bridge";
import {readBlock} from "./data";

/** One line of the VRChat log, already split into the parts the viewer renders. */
export interface LogLine {
    id: number;
    /** Wall-clock time of the line, or an empty string for a continuation line. */
    time: string;
    /** Lower-case level, or an empty string for a continuation line. */
    level: string;
    message: string;
}

export interface LogStatus {
    /** Whether the configured log folder exists. */
    exists: boolean;
    /** Whether VRChat is running. Nothing is read while it is not. */
    running: boolean;
}

export interface LogSnapshot extends LogStatus {
    lines: LogLine[];
}

/** Body of a push; `reset` means the viewer should drop its current lines. */
export interface LogBatch extends LogStatus {
    reset: boolean;
    lines: LogLine[];
}

export const desktopAvailable = Native.available;

export const emptyStatus: LogStatus = {exists: false, running: false};

/** How many lines one request asks for. */
const SnapshotLines = 5_000;
const PushLines = 3_000;

/** The newest line the page has been given, and the buffer it belongs to. */
let newest = 0;
let generation = -1;
let knownStatus: LogStatus = {...emptyStatus};

/** One fetch at a time: a transfer can ping faster than a request settles. */
let fetching = false;
let queued = false;
let queuedHandler: ((batch: LogBatch) => void) | null = null;

/** Reads what the follower has buffered, plus whether VRChat is running right now. */
export async function getLogSnapshot(): Promise<LogSnapshot> {
    if (!Native.available) return {...emptyStatus, lines: []};

    const page = await fetchLog(0, SnapshotLines);
    generation = page.generation;
    newest = page.lines.at(-1)?.id ?? newest;
    knownStatus = {exists: page.exists, running: page.running};

    return {exists: page.exists, running: page.running, lines: page.lines};
}

/** Subscribes to the ping that says new lines exist. Returns an unsubscribe function. */
export function onLogLines(handler: (batch: LogBatch) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "log.changed") return;

        pull(handler);
    });
}

/**
 * Fetches what the page is missing, one request at a time. A ping that arrives while a request is
 * in flight only marks that another pass is needed, so the same lines are never fetched twice and
 * the view is not handed two overlapping batches.
 */
function pull(handler: (batch: LogBatch) => void): void {
    if (fetching) {
        queued = true;
        queuedHandler = handler;
        return;
    }

    fetching = true;

    void fetchLog(newest, PushLines).then((page) => {
        // A new buffer (VRChat restarted, or the folder changed) starts the view over.
        const reset = generation >= 0 && page.generation !== generation;
        const status = {exists: page.exists, running: page.running};
        const statusChanged = status.exists !== knownStatus.exists || status.running !== knownStatus.running;

        generation = page.generation;
        knownStatus = status;
        newest = page.lines.at(-1)?.id ?? newest;

        // Nothing new and nothing changed: a state update would only redraw the same rows.
        if (!reset && !statusChanged && page.lines.length === 0) return;

        handler({...status, reset, lines: page.lines});
    }, () => {
        // The host did not answer; the next ping asks again.
    }).finally(() => {
        fetching = false;

        if (queued && queuedHandler) {
            queued = false;

            const next = queuedHandler;
            queuedHandler = null;
            pull(next);
        }
    });
}

/** Asks the host to reveal the configured log folder in the file manager. */
export async function openLogFolder(): Promise<void> {
    if (!Native.available) return;

    await Native.request("log.openFolder");
}

export interface LogExport {
    saved: boolean;
    lines: number;
    path?: string;
}

/** Asks for a save location and writes every line read so far, in its original form. */
export async function exportLog(): Promise<LogExport> {
    if (!Native.available) return {saved: false, lines: 0};

    return await Native.request<LogExport>("log.export");
}

interface LogPage extends LogStatus {
    generation: number;
    lines: LogLine[];
}

/** One page of lines newer than the ones the page already has. */
async function fetchLog(after: number, limit: number): Promise<LogPage> {
    const block = await readBlock(`/log?after=${Math.max(0, after)}&limit=${limit}`);

    return {
        exists: block.meta.exists === "1",
        running: block.meta.running === "1",
        generation: Number(block.meta.generation ?? 0),
        lines: block.rows.map((row) => ({
            id: Number(row.id),
            time: String(row.time),
            level: String(row.level),
            message: String(row.message),
        })),
    };
}
