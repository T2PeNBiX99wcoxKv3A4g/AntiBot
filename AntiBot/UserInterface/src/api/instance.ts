import {Native} from "@photino-net-utils/bridge";

/** One player in the current instance. */
export interface InstanceUser {
    userId: string;
    name: string;
    local: boolean;
    joinedAt: string;
    /** From the cached VRChat profile; absent until it was fetched. */
    avatarUrl?: string;
    avatarImageUrl?: string;
    trust?: string;
    dateJoined?: string;
    platform?: string;
}

export interface InstanceSnapshot {
    running: boolean;
    world: string;
    instance: string;
    users: InstanceUser[];
    /** `api` once an account is signed in; `log` when the list is rebuilt from VRChat's log. */
    source?: "api" | "log";
    worldName?: string;
    userCount?: number;
    capacity?: number;
    worldId?: string;
    worldThumbnail?: string;
}

export const emptyInstance: InstanceSnapshot = {running: false, world: "", instance: "", users: []};

/** Reads the list the host built from the log, or from the API while signed in. */
export async function getInstance(): Promise<InstanceSnapshot> {
    if (!Native.available) return emptyInstance;

    return await Native.request<InstanceSnapshot>("instance.snapshot");
}

/** Subscribes to list changes. Returns an unsubscribe function. */
export function onInstanceChanged(handler: (snapshot: InstanceSnapshot) => void): () => void {
    return Native.on((message) => {
        if (message.type === "instance.changed") handler(message.data as InstanceSnapshot);
    });
}
