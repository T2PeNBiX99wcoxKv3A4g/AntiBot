import {Native} from "@photino-net-utils/bridge";
import {readBlock} from "./data";

/** One automatic action AntiBot took. */
export interface OperationEntry {
    id: number;
    /** Unix milliseconds. */
    at: number;
    kind: string;
    userId: string;
    displayName: string;
    detail: string;
    avatarUrl?: string;
    /** True once the action was taken back. */
    undone?: boolean;
}

export async function getOperations(): Promise<OperationEntry[]> {
    if (!Native.available) return [];

    return await fetchOperations();
}

export async function clearOperations(): Promise<void> {
    if (!Native.available) return;

    await Native.request("operations.clear");
}

/** Takes an action back: a block becomes an unblock, and so on. */
export interface UndoResult {
    ok: boolean;
    message: string;
}

export async function undoOperation(id: number): Promise<UndoResult> {
    if (!Native.available) return {ok: false, message: "The desktop host is not available."};

    return await Native.request<UndoResult>("operations.undo", {id});
}

export function onOperationsChanged(handler: (entries: OperationEntry[]) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "operations.changed") return;

        void fetchOperations().then(handler, () => {
            // The host did not answer; the history on screen stays as it was.
        });
    });
}

async function fetchOperations(): Promise<OperationEntry[]> {
    const block = await readBlock("/operations");

    return block.rows.map((row) => ({
        id: Number(row.id),
        at: Number(row.at),
        kind: String(row.kind),
        userId: String(row.userId),
        displayName: String(row.displayName),
        detail: String(row.detail),
        avatarUrl: String(row.avatar ?? "") || undefined,
        undone: Number(row.undone) !== 0,
    }));
}
