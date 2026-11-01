import {Native} from "@photino-net-utils/bridge";

export interface AppInfo {
    version: string;
    platform: string;
    /** True when the interface has to paint the window's rounded corners itself (Linux). */
    rounded: boolean;
    /** True in a debug build, which is the only one that offers the debug page. */
    debug: boolean;
}

/** Reads the app version declared in the csproj, plus the host platform id. */
export async function getAppInfo(): Promise<AppInfo> {
    if (!Native.available) return {version: "dev", platform: "web", rounded: false, debug: false};

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
