import {Native} from "@photino-net-utils/bridge";

/** What the host knows about VRChat's OSC, which it reads from the log. */
export interface OscStatus {
    /** Whether VRChat advertised an OSC port this session. */
    listening: boolean;
    /** The port messages are sent to. */
    port: number;
    /** Whether VRChat's own OSC output is being received. */
    receiving: boolean;
    /** The port VRChat itself advertised, or 0 when it has not said. */
    detected: number;
}

export interface OscTestResult {
    /** Whether the test message could be sent. */
    sent: boolean;
    /** The port it was sent to. */
    port: number;
}

export async function oscStatus(): Promise<OscStatus> {
    return await Native.request<OscStatus>("osc.status");
}

/**
 * Sends a harmless message that opens VRChat's Quick Menu when OSC works. The port is passed along
 * so the test uses what is in the field even before it was saved.
 */
export async function testOsc(port: number): Promise<OscTestResult> {
    return await Native.request<OscTestResult>("osc.test", {port}, 15_000);
}
