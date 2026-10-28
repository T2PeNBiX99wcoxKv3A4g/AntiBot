import {Native} from "@photino-net-utils/bridge";

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
    directory: string;
    /** Whether the log folder exists on this machine. */
    exists: boolean;
    file: string | null;
    modifiedAt: string | null;
}

export interface LogSnapshot extends LogStatus {
    lines: LogLine[];
}

/** Body of the `log.lines` push; `reset` means the follower switched to a different file. */
export interface LogBatch {
    file: string | null;
    modifiedAt: string | null;
    reset: boolean;
    lines: LogLine[];
}

export const desktopAvailable = Native.available;

export const emptyStatus: LogStatus = {directory: "", exists: false, file: null, modifiedAt: null};

/** Reads the file being followed plus the lines buffered so far. */
export async function getLogSnapshot(): Promise<LogSnapshot> {
    if (!Native.available) return {...emptyStatus, lines: []};

    return await Native.request<LogSnapshot>("log.snapshot");
}

/** Subscribes to lines pushed while VRChat writes its log. Returns an unsubscribe function. */
export function onLogLines(handler: (batch: LogBatch) => void): () => void {
    return Native.on((message) => {
        if (message.type === "log.lines") handler(message.data as LogBatch);
    });
}

/** Asks the host to reveal the VRChat log folder in the file manager. */
export async function openLogFolder(): Promise<void> {
    if (!Native.available) return;

    await Native.request("log.openFolder");
}

/** The file name without its folder, for headers and status cards. */
export function fileName(path: string | null): string | null {
    if (!path) return null;

    return path.split(/[\\/]/).pop() ?? path;
}
