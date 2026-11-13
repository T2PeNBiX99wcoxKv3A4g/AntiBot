import {Native} from "@photino-net-utils/bridge";
import type {LocalizationKey} from "@photino-net-utils/bridge";

/** One scoring signal: a translation key, the points it added (negative for trust) and a placeholder. */
export interface ThreatReason {
    text: LocalizationKey;
    weight: number;
    /** Fills the `{days}` placeholder of the text, when it has one. */
    detail?: string;
}

/** One player in the current instance. */
export interface InstanceUser {
    userId: string;
    name: string;
    local: boolean;
    joinedAt: string;
    /** From the cached VRChat profile; absent until it was fetched. */
    avatarUrl?: string;
    avatarImageUrl?: string;
    /** The player's custom profile icon, shown in the list when they have one. */
    iconUrl?: string;
    trust?: string;
    /** VRChat presence: active, join me, ask me, busy or offline. */
    status?: string;
    /** The user's custom status text, if they set one. */
    statusDescription?: string;
    /** The user's pronouns; VRChat lets them enter any text. */
    pronouns?: string;
    /** The user's profile bio. */
    bio?: string;
    dateJoined?: string;
    platform?: string;
    /** Resolved from the avatar's image file id; absent while unknown. */
    avatarName?: string;
    /** True when the avatar is VRChat's default Robot avatar. */
    isRobot?: boolean;
    /** True when this player is on the signed-in account's friend list. */
    isFriend?: boolean;
    /** 0-100 bot threat score. */
    threat?: number;
    /** Why the score is what it is. */
    threatReasons?: ThreatReason[];
    /** True when the user is on the whitelist and never acted on. */
    whitelisted?: boolean;
    /** Whether the profile lookup finished; false means the row is still loading. */
    profileLoaded?: boolean;
    /** Whether the avatar-name lookup finished; false means it is still in flight. */
    avatarLoaded?: boolean;
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
    instanceType?: string;
    instanceRegion?: string;
    instanceOwnerId?: string;
    instanceShortName?: string;
    instanceNumber?: string;
    instanceDisplayName?: string;
    instanceRestricted?: boolean;
    instanceAgeGated?: boolean;
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

/** One user's full description, for the details panel outside the instance page. */
export async function describeUser(userId: string, displayName: string): Promise<InstanceUser> {
    return await Native.request<InstanceUser>("user.describe", {userId, displayName});
}

/** The bio lives on the public profile, so it is read when the details panel opens. */
export async function getUserBio(userId: string): Promise<string | null> {
    if (!Native.available) return null;

    const result = await Native.request<{ bio?: string }>("user.bio", {userId});
    return result.bio ?? null;
}
