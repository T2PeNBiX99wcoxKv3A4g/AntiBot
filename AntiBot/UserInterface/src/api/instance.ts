import type {LocalizationKey} from "@photino-net-utils/bridge";
import {Native} from "@photino-net-utils/bridge";
import {type DataBlock, readBlock} from "./data";

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
    /** Bot threat score; higher is more suspicious and there is no upper limit. */
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

const LocalFlag = 1;
const FriendFlag = 2;
const RobotFlag = 4;
const WhitelistFlag = 8;
const ProfileLoadedFlag = 16;
const AvatarLoadedFlag = 32;

/** Reads the list the host built from the log, or from the API while signed in. */
export async function getInstance(): Promise<InstanceSnapshot> {
    if (!Native.available) return emptyInstance;

    return await fetchInstance();
}

/** Subscribes to list changes. The push is only a ping; the list itself is fetched. */
export function onInstanceChanged(handler: (snapshot: InstanceSnapshot) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "instance.changed") return;

        void fetchInstance().then(handler, () => {
            // The host did not answer; the list on screen stays as it was.
        });
    });
}

async function fetchInstance(): Promise<InstanceSnapshot> {
    return toSnapshot(await readBlock("/instance"));
}

function toSnapshot(block: DataBlock): InstanceSnapshot {
    const meta = block.meta;

    return {
        running: meta.running === "1",
        world: meta.world ?? "",
        instance: meta.instance ?? "",
        users: block.rows.map((row) => toUser(row)),
        source: meta.source === "api" || meta.source === "log" ? meta.source : undefined,
        worldName: meta.worldName,
        userCount: Number(meta.userCount ?? 0),
        capacity: Number(meta.capacity ?? 0),
        worldId: meta.worldId,
        worldThumbnail: meta.worldThumbnail,
        instanceType: meta.instanceType,
        instanceRegion: meta.instanceRegion,
        instanceOwnerId: meta.instanceOwnerId,
        instanceShortName: meta.instanceShortName,
        instanceNumber: meta.instanceNumber,
        instanceDisplayName: meta.instanceDisplayName,
        instanceRestricted: meta.instanceRestricted === "1",
        instanceAgeGated: meta.instanceAgeGated === "1",
    };
}

export function toUser(row: Record<string, string | number>, prefix = ""): InstanceUser {
    const flags = Number(row[`${prefix}flags`] ?? 0);
    const text = (name: string) => String(row[prefix + name] ?? "");

    return {
        userId: text("userId"),
        name: text("name"),
        local: (flags & LocalFlag) !== 0,
        joinedAt: text("joined"),
        iconUrl: text("icon") || undefined,
        trust: text("trust") || undefined,
        status: text("status") || undefined,
        statusDescription: text("statusText") || undefined,
        pronouns: text("pronouns") || undefined,
        bio: text("bio") || undefined,
        dateJoined: text("dateJoined") || undefined,
        platform: text("platform") || undefined,
        avatarName: text("avatarName") || undefined,
        isRobot: (flags & RobotFlag) !== 0,
        isFriend: (flags & FriendFlag) !== 0,
        threat: Number(row[`${prefix}threat`] ?? 0),
        threatReasons: toReasons(text("reasons")),
        whitelisted: (flags & WhitelistFlag) !== 0,
        profileLoaded: (flags & ProfileLoadedFlag) !== 0,
        avatarLoaded: (flags & AvatarLoadedFlag) !== 0,
    };
}

/** The reasons travel as one string: key, weight and detail, separated by unit separators. */
export function toReasons(value: string): ThreatReason[] {
    if (!value) return [];

    return value.split("\u001f").map((part) => {
        const [text, weight, detail] = part.split("|");

        return {
            text: text as LocalizationKey,
            weight: Number(weight ?? 0),
            detail: detail || undefined,
        };
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
