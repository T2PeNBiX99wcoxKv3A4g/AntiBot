import {Native} from "@photino-net-utils/bridge";

/** What the host knows about VRChat's OSC, which it reads from the log. */
export interface OscStatus {
    /** Whether VRChat advertised an OSC port this session. */
    listening: boolean;
    /** The port messages are sent to. */
    port: number;
    /** Whether VRChat's own OSC output is being received. */
    receiving: boolean;
}

export interface OscTestResult extends OscStatus {
    /** Whether the test message could be sent. */
    sent: boolean;
}

export async function oscStatus(): Promise<OscStatus> {
    return await Native.request<OscStatus>("osc.status");
}

/** Sends a harmless message that opens VRChat's Quick Menu when OSC works. */
export async function testOsc(): Promise<OscTestResult> {
    return await Native.request<OscTestResult>("osc.test", undefined, 15_000);
}
