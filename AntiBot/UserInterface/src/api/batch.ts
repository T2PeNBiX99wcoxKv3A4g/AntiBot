import type {LocalizationKey} from "@photino-net-utils/bridge";
import {Native} from "@photino-net-utils/bridge";
import {data} from "./data";
import {type InstanceUser, toUser} from "./instance";

/** The users the pasted links point at, and the lines that did not contain a user id. */
export interface BatchPreview {
    users: InstanceUser[];
    invalid: string[];
    /** Set when the host could not parse at all, for example while signed out. */
    error?: string;
}

/** What `batch.run` answered before the queue started. */
export interface BatchStart {
    started: boolean;
    total: number;
    /** Translation keys for the actions this run will apply. */
    actions: LocalizationKey[];
    error?: string;
}

export interface BatchProgress {
    running: boolean;
    done: number;
    total: number;
    failed: number;
    userId?: string;
}

/** One user's result in a finished batch. */
export interface BatchOutcome {
    userId: string;
    ok: boolean;
    error?: string;
}

export interface BatchFinished {
    cancelled: boolean;
    done: number;
    total: number;
    failed: number;
    error?: string;
    outcomes: BatchOutcome[];
}

/** The running batch, or the last one that finished. */
export interface BatchState {
    running: boolean;
    done: number;
    total: number;
    failed: number;
    cancelled: boolean;
    error?: string;
    outcomes: BatchOutcome[];
    actions: LocalizationKey[];
}

/** Parses the links now; the profile lookup can take a while for a long list. */
export async function parseLinks(text: string): Promise<BatchPreview> {
    if (!Native.available) return {users: [], invalid: []};

    try {
        const page = await data.readBlock("/batch-preview", {
            method: "POST",
            headers: {"Content-Type": "text/plain; charset=utf-8"},
            body: text,
        });

        return {
            users: page.rows.map((row) => toUser(row)),
            invalid: split(page.meta.invalid),
            error: textOrUndefined(page.meta.error),
        };
    } catch {
        return await Native.request<BatchPreview>("batch.parse", {text}, 180_000);
    }
}

/** Starts the queue. The progress arrives as `batch.progress` events. */
export async function startBatch(userIds: string[]): Promise<BatchStart> {
    return await Native.request<BatchStart>("batch.run", {userIds}, 30_000);
}

/** Stops the running queue after the request that is already in flight. */
export async function stopBatch(): Promise<void> {
    await Native.request("batch.stop");
}

/** Adds the parsed users to the bot list without moderating them. */
export async function addBatchToBotList(userIds: string[]): Promise<number> {
    if (!Native.available) return 0;

    const result = await Native.request<{ added: number }>("batch.addBots", {userIds}, 120_000);
    return result.added;
}

export async function getBatchState(): Promise<BatchState> {
    if (!Native.available)
        return {running: false, done: 0, total: 0, failed: 0, cancelled: false, outcomes: [], actions: []};

    try {
        const page = await data.readBlock("/batch-state");
        const meta = page.meta;

        return {
            running: meta.running === "1",
            done: Number(meta.done ?? 0),
            total: Number(meta.total ?? 0),
            failed: Number(meta.failed ?? 0),
            cancelled: meta.cancelled === "1",
            error: textOrUndefined(meta.error),
            outcomes: page.rows.map((row) => ({
                userId: String(row.userId),
                ok: Number(row.ok) !== 0,
                error: textOrUndefined(row.error),
            })),
            actions: split(meta.actions) as LocalizationKey[],
        };
    } catch {
        return await Native.request<BatchState>("batch.state");
    }
}

export function onBatchProgress(handler: (progress: BatchProgress) => void): () => void {
    return Native.on((message) => {
        if (message.type === "batch.progress") handler(message.data as BatchProgress);
    });
}

export function onBatchFinished(handler: (finished: BatchFinished) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "batch.finished") return;

        // The event is a ping; the outcome list comes from the data plane.
        const fallback = message.data as BatchFinished;
        void getBatchState().then(
            (state) => handler({
                cancelled: state.cancelled,
                done: state.done,
                total: state.total,
                failed: state.failed,
                error: state.error,
                outcomes: state.outcomes,
            }),
            () => handler(fallback),
        );
    });
}

function split(value: string | number | undefined): string[] {
    const text = typeof value === "string" ? value : "";
    return text.length > 0 ? text.split("\u001f") : [];
}

function textOrUndefined(value: string | number | undefined): string | undefined {
    const text = typeof value === "string" ? value : "";
    return text.length > 0 ? text : undefined;
}
