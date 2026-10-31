import {Native} from "@photino-net-utils/bridge";
import type {InstanceUser} from "./instance";

/** One friend request AntiBot has seen, with the sender described like an instance player. */
export interface FriendRequest {
    id: string;
    userId: string;
    /** When VRChat says the request was sent. */
    createdAt: string;
    /** False once the request is no longer pending; it stays in the history. */
    active: boolean;
    /** When AntiBot first recorded it, in Unix milliseconds. */
    firstSeen: number;
    user: InstanceUser;
}

export async function getFriendRequests(): Promise<FriendRequest[]> {
    if (!Native.available) return [];

    return await Native.request<FriendRequest[]>("friendRequests.snapshot");
}

export function onFriendRequestsChanged(handler: (requests: FriendRequest[]) => void): () => void {
    return Native.on((message) => {
        if (message.type === "friendRequests.changed") handler(message.data as FriendRequest[]);
    });
}
