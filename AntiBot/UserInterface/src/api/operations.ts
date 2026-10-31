import {Native} from "@photino-net-utils/bridge";

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
}

export async function getOperations(): Promise<OperationEntry[]> {
    if (!Native.available) return [];

    return await Native.request<OperationEntry[]>("operations.snapshot");
}

export async function clearOperations(): Promise<void> {
    if (!Native.available) return;

    await Native.request("operations.clear");
}

export function onOperationsChanged(handler: (entries: OperationEntry[]) => void): () => void {
    return Native.on((message) => {
        if (message.type === "operations.changed") handler(message.data as OperationEntry[]);
    });
}
