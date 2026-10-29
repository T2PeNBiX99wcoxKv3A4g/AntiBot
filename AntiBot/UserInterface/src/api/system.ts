import {Native} from "@photino-net-utils/bridge";

export interface AppInfo {
    version: string;
    platform: string;
    /** True when the interface has to paint the window's rounded corners itself (Linux). */
    rounded: boolean;
}

/** Reads the app version declared in the csproj, plus the host platform id. */
export async function getAppInfo(): Promise<AppInfo> {
    if (!Native.available) return {version: "dev", platform: "web", rounded: false};

    return await Native.request<AppInfo>("app.info");
}
