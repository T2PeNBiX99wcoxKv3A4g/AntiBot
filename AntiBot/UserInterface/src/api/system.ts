import {Native} from "@photino-net-utils/bridge";

export interface AppInfo {
    version: string;
    platform: string;
    /** The folder the app writes its own log files to. */
    logDirectory: string;
    /** True when the interface has to paint the window's rounded corners itself (Linux). */
    rounded: boolean;
    /** True in a debug build, which is the only one that offers the debug page. */
    debug: boolean;
}

/** Reads the app version declared in the csproj, plus the host platform id and where logs live. */
export async function getAppInfo(): Promise<AppInfo> {
    if (!Native.available)
        return {version: "dev", platform: "web", logDirectory: "", rounded: false, debug: false};

    return await Native.request<AppInfo>("app.info");
}

export interface StartupStatus {
    /** False on platforms with no per-user Startup folder. */
    supported: boolean;
    enabled: boolean;
}

/** Reports whether AntiBot starts with the user's session. */
export async function startupStatus(): Promise<StartupStatus> {
    if (!Native.available) return {supported: false, enabled: false};

    return await Native.request<StartupStatus>("app.startup");
}

/** Adds or removes the per-user autostart entry. */
export async function setStartup(enabled: boolean): Promise<StartupStatus> {
    return await Native.request<StartupStatus>("app.setStartup", {enabled});
}

/** Hands a VRChat link to the default browser; the host refuses anything else. */
export async function openUrl(url: string): Promise<void> {
    if (!Native.available) {
        window.open(url, "_blank", "noreferrer");
        return;
    }

    await Native.request("system.openUrl", {url});
}

/** Opens the folder AntiBot writes its own log files to, for a bug report. */
export async function openLogsFolder(): Promise<void> {
    if (!Native.available) return;

    await requireAck("update.openLogs");
}

/** Where the newest release can be downloaded from. */
export const RELEASES_URL = "https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/releases/latest";

/** Opens the releases page in the default browser. */
export async function openReleasesPage(): Promise<void> {
    if (!Native.available) {
        window.open(RELEASES_URL, "_blank", "noreferrer");
        return;
    }

    await requireAck("update.openRelease");
}

/** Body of `app.checkUpdate`: the running version, the published one, and whether it is newer. */
export interface UpdateCheck {
    current: string;
    latest: string;
    available: boolean;
}

/**
 * The update state, read from the version file the release workflow publishes. Null while it is
 * unknown, which is also what a failed automatic check reports.
 */
export async function getUpdateStatus(): Promise<UpdateCheck | null> {
    if (!Native.available) return null;

    return (await Native.request<UpdateCheck | null>("update.status")) ?? null;
}

/** Compares this build with the published `.version`, ignoring the backend cache. */
export async function checkForUpdates(): Promise<UpdateCheck> {
    if (!Native.available) return {current: "dev", latest: "dev", available: false};

    return await Native.request<UpdateCheck>("update.check");
}

/** Body of an update action: whether it started, and why it did not. */
export interface UpdateAck {
    ok: boolean;
    error?: string;
}

export type UpdatePhase = "changelog" | "downloading" | "ready" | "cancelled" | "error";

/** One `update.progress` event from the host. */
export interface UpdateProgress {
    phase: UpdatePhase;
    downloaded: number;
    total: number;
    percent: number;
    error?: string;
}

/** The release changelog, fetched while the update downloads. */
export interface UpdateChangelog {
    text: string;
}

async function requireAck(type: string, payload?: unknown, timeout = 30_000): Promise<void> {
    const ack = await Native.request<UpdateAck>(type, payload, timeout);
    if (!ack.ok)
        throw new Error(ack.error ?? "The update action failed.");
}

/** Starts the MSI download; progress arrives through {@link onUpdateProgress}. */
export async function startUpdateDownload(): Promise<UpdateAck> {
    if (!Native.available) return {ok: false, error: "The desktop host is not available."};

    return await Native.request<UpdateAck>("update.download", undefined, 30_000);
}

/** Stops a download that is still running and removes the partial file. */
export async function cancelUpdateDownload(): Promise<void> {
    await requireAck("update.cancel");
}

/** Runs the downloaded MSI; the host closes after the installer starts. */
export async function installUpdate(): Promise<UpdateAck> {
    if (!Native.available) return {ok: false, error: "The desktop host is not available."};

    return await Native.request<UpdateAck>("update.install", undefined, 30_000);
}

export function onUpdateProgress(handler: (progress: UpdateProgress) => void): () => void {
    return Native.on((message) => {
        if (message.type === "update.progress") handler(message.data as UpdateProgress);
    });
}

export function onUpdateChangelog(handler: (changelog: UpdateChangelog) => void): () => void {
    return Native.on((message) => {
        if (message.type === "update.changelog") handler(message.data as UpdateChangelog);
    });
}
