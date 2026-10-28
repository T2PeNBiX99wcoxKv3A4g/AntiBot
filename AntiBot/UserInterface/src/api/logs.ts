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
    /** Whether the configured log folder exists. */
    exists: boolean;
    /** Whether VRChat is running. Nothing is read while it is not. */
    running: boolean;
}

export interface LogSnapshot extends LogStatus {
    lines: LogLine[];
}

/** Body of the `log.lines` push; `reset` means the viewer should drop its current lines. */
export interface LogBatch extends LogStatus {
    reset: boolean;
    lines: LogLine[];
}

export const desktopAvailable = Native.available;

export const emptyStatus: LogStatus = {exists: false, running: false};

/** Reads what the follower has buffered, plus whether VRChat is running right now. */
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

/** Asks the host to reveal the configured log folder in the file manager. */
export async function openLogFolder(): Promise<void> {
    if (!Native.available) return;

    await Native.request("log.openFolder");
}
