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

    await Native.request("app.openLogs");
}

/** Where the newest release can be downloaded from. */
export const RELEASES_URL = "https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/releases/latest";

/** Opens the releases page in the default browser. */
export async function openReleasesPage(): Promise<void> {
    if (!Native.available) {
        window.open(RELEASES_URL, "_blank", "noreferrer");
        return;
    }

    await Native.request("app.openReleases");
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

    return (await Native.request<UpdateCheck | null>("app.updateStatus")) ?? null;
}

/** Compares this build with the published `.version`, ignoring the backend cache. */
export async function checkForUpdates(): Promise<UpdateCheck> {
    if (!Native.available) return {current: "dev", latest: "dev", available: false};

    return await Native.request<UpdateCheck>("app.checkUpdate");
}
