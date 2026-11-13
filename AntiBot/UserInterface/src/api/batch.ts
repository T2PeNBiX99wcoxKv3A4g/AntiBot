import {Native} from "@photino-net-utils/bridge";
import type {InstanceUser} from "./instance";
import type {LocalizationKey} from "./i18n.generated";

/** The users the pasted links point at, and the lines that did not contain a user id. */
export interface BatchPreview {
    users: InstanceUser[];
    invalid: string[];
    /** Set when the host could not parse at all, for example while signed out. */
    error?: string;
}

/** What `batch.run` answered before the queue started. */
export interface BatchStart {
    started: boolean;
    total: number;
    /** Translation keys for the actions this run will apply. */
    actions: LocalizationKey[];
    error?: string;
}

export interface BatchProgress {
    running: boolean;
    done: number;
    total: number;
    failed: number;
    userId?: string;
}

/** One user's result in a finished batch. */
export interface BatchOutcome {
    userId: string;
    ok: boolean;
    error?: string;
}

export interface BatchFinished {
    cancelled: boolean;
    done: number;
    total: number;
    failed: number;
    error?: string;
    outcomes: BatchOutcome[];
}

/** The running batch, or the last one that finished. */
export interface BatchState {
    running: boolean;
    done: number;
    total: number;
    failed: number;
    cancelled: boolean;
    error?: string;
    outcomes: BatchOutcome[];
    actions: LocalizationKey[];
}

/** Parses the links now; the profile lookup can take a while for a long list. */
export async function parseLinks(text: string): Promise<BatchPreview> {
    if (!Native.available) return {users: [], invalid: []};

    return await Native.request<BatchPreview>("batch.parse", {text}, 180_000);
}

/** Starts the queue. The progress arrives as `batch.progress` events. */
export async function startBatch(userIds: string[]): Promise<BatchStart> {
    return await Native.request<BatchStart>("batch.run", {userIds}, 30_000);
}

/** Stops the running queue after the request that is already in flight. */
export async function stopBatch(): Promise<void> {
    await Native.request("batch.stop");
}

export async function getBatchState(): Promise<BatchState> {
    if (!Native.available)
        return {running: false, done: 0, total: 0, failed: 0, cancelled: false, outcomes: [], actions: []};

    return await Native.request<BatchState>("batch.state");
}

export function onBatchProgress(handler: (progress: BatchProgress) => void): () => void {
    return Native.on((message) => {
        if (message.type === "batch.progress") handler(message.data as BatchProgress);
    });
}

export function onBatchFinished(handler: (finished: BatchFinished) => void): () => void {
    return Native.on((message) => {
        if (message.type === "batch.finished") handler(message.data as BatchFinished);
    });
}
