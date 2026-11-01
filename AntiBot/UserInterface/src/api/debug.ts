import {Native} from "@photino-net-utils/bridge";

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
    reasons: string[];
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
