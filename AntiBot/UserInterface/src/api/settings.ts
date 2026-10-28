import {Native} from "@photino-net-utils/bridge";

/** The stored settings plus the folder the host uses when nothing has been saved. */
export interface SettingsView {
    logDirectory: string;
    defaultLogDirectory: string;
}

export interface AppSettings {
    logDirectory: string;
}

const empty: SettingsView = {logDirectory: "", defaultLogDirectory: ""};

/** Reads the log folder; its default is VRChat's own log folder. */
export async function getSettings(): Promise<SettingsView> {
    if (!Native.available) return empty;

    return await Native.request<SettingsView>("settings.get");
}

/** Persists the log folder. The follower switches to it without a restart. */
export async function saveSettings(settings: AppSettings): Promise<void> {
    if (!Native.available) return;

    await Native.request("settings.save", settings);
}
