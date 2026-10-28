import {Native} from "@photino-net-utils/bridge";

export interface AppInfo {
    version: string;
    platform: string;
}

/** Reads the app version declared in the csproj, plus the host platform id. */
export async function getAppInfo(): Promise<AppInfo> {
    if (!Native.available) return {version: "dev", platform: "web"};

    return await Native.request<AppInfo>("app.info");
}
