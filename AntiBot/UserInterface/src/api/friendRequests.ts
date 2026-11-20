import {Native} from "@photino-net-utils/bridge";
import {readBlock} from "./data";
import {type InstanceUser, toUser} from "./instance";

/** One friend request AntiBot has seen, with the sender described like an instance player. */
export interface FriendRequest {
    id: string;
    userId: string;
    /** When VRChat says the request was sent. */
    createdAt: string;
    /** False once the request is no longer pending; it stays in the history. */
    active: boolean;
    /** True when AntiBot hid the request automatically. */
    rejected: boolean;
    /** When AntiBot first recorded it, in Unix milliseconds. */
    firstSeen: number;
    user: InstanceUser;
}

export async function getFriendRequests(): Promise<FriendRequest[]> {
    if (!Native.available) return [];

    return await fetchFriendRequests();
}

export async function clearFriendRequests(): Promise<void> {
    if (!Native.available) return;

    await Native.request("friendRequests.clear");
}

/** Takes back an automatic rejection: unblocks the user and restores the row. */
export async function undoFriendRequest(id: string): Promise<void> {
    if (!Native.available) return;

    await Native.request("friendRequests.undo", {id});
}

export function onFriendRequestsChanged(handler: (requests: FriendRequest[]) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "friendRequests.changed") return;

        void fetchFriendRequests().then(handler, () => {
            // The host did not answer; the list on screen stays as it was.
        });
    });
}

async function fetchFriendRequests(): Promise<FriendRequest[]> {
    const block = await readBlock("/requests");

    return block.rows.map((row) => ({
        id: String(row.id),
        userId: String(row.userId),
        createdAt: String(row.createdAt),
        active: Number(row.active) !== 0,
        rejected: Number(row.rejected) !== 0,
        firstSeen: Number(row.firstSeen),
        user: toUser(row, "user."),
    }));
}
