import {Native} from "@photino-net-utils/bridge";

export interface GuardStatus {
    state: string;
    monitoring: boolean;
    observed: number;
    flagged: number;
}

export const idleStatus: GuardStatus = {
    state: "idle",
    monitoring: false,
    observed: 0,
    flagged: 0,
};

/** Reads the placeholder guard state. No detection pipeline runs yet. */
export async function getGuardStatus(): Promise<GuardStatus> {
    if (!Native.available) return idleStatus;

    return await Native.request<GuardStatus>("guard.status");
}
