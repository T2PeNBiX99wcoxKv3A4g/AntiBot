import {Native} from "@photino-net-utils/bridge";
import type {ThreatReason} from "./instance";

/** Everything the scoring looks at, plus what it decided. */
export interface DebugUserResult {
    id: string;
    displayName: string;
    dateJoined?: string;
    trust?: string;
    platform?: string;
    avatarName?: string;
    isRobot: boolean;
    threat: number;
    reasons: ThreatReason[];
}

/** Debug builds only: scores a user id or a profile link without waiting for them to join. */
export async function scoreUser(input: string): Promise<DebugUserResult> {
    return await Native.request<DebugUserResult>("debug.user", {userId: input}, 60_000);
}

/** Debug builds only: asks the local VRChat client to quit the way the automatic action does. */
export async function closeVrchat(): Promise<boolean> {
    const result = await Native.request<{ ok: boolean }>("debug.closeVrchat", undefined, 60_000);
    return result.ok;
}

/** What the host saw when it tried to press VRChat's OSC panic button. */
export interface DebugSafeModeResult {
    ok: boolean;
    listening: boolean;
}

/** Debug builds only: turns VRChat's Safe Mode on over OSC. */
export async function enableSafeMode(): Promise<DebugSafeModeResult> {
    return await Native.request<DebugSafeModeResult>("debug.safeMode", undefined, 30_000);
}

/** What the host saw when it tried to switch to the configured avatar. */
export interface DebugAvatarResult {
    ok: boolean;
    listening: boolean;
    already: boolean;
    configured: boolean;
}

/** Debug builds only: switches to the avatar id saved in the settings. */
export async function switchAvatar(): Promise<DebugAvatarResult> {
    return await Native.request<DebugAvatarResult>("debug.avatar", undefined, 30_000);
}
