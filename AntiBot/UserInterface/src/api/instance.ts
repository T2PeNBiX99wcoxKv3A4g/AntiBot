import {Native} from "@photino-net-utils/bridge";

/** A player the local log places in the current instance. */
export interface InstanceUser {
    userId: string;
    name: string;
    local: boolean;
    joinedAt: string;
}

export interface InstanceSnapshot {
    running: boolean;
    world: string;
    instance: string;
    users: InstanceUser[];
}

export const emptyInstance: InstanceSnapshot = {running: false, world: "", instance: "", users: []};

/** Reads the list the host built from the log so far. */
export async function getInstance(): Promise<InstanceSnapshot> {
    if (!Native.available) return emptyInstance;

    return await Native.request<InstanceSnapshot>("instance.snapshot");
}

/** Subscribes to list changes as join/leave lines are read. Returns an unsubscribe function. */
export function onInstanceChanged(handler: (snapshot: InstanceSnapshot) => void): () => void {
    return Native.on((message) => {
        if (message.type === "instance.changed") handler(message.data as InstanceSnapshot);
    });
}
