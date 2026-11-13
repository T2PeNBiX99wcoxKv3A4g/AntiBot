import {Native} from "@photino-net-utils/bridge";
import type {ThemeMode} from "@photino-net-utils/bridge";
import type {InstanceUser} from "./instance";
import type {AppSettingsGenerated} from "./settings.generated";

/** The stored settings plus the folder the host uses when nothing has been saved. */
export type SettingsView = AppSettingsGenerated & {defaultLogDirectory: string};

/** What `settings.save` sends; generated from the C# `AppSettings` model. */
export type AppSettings = AppSettingsGenerated;

const empty: SettingsView = {
    logDirectory: "",
    defaultLogDirectory: "",
    avatarApiProviders: [],
    autoBlock: true,
    autoDisableAvatarInteraction: true,
    autoHideChatBox: true,
    autoCloseVrchat: false,
    autoSafeMode: false,
    autoSafeAvatar: false,
    safeAvatarId: "",
    skipCloseInVr: true,
    autoRejectFriendRequests: true,
    threatThreshold: 50,
    whitelist: [],
    language: "system",
    theme: "system",
    startHidden: false,
    oscPort: 0,
};

/** Anything the host does not recognize falls back to following the system. */
export function normalizeTheme(theme: string | undefined): ThemeMode {
    return theme === "light" || theme === "dark" ? theme : "system";
}

/** Reads the log folder, the avatar databases and the protection settings. */
export async function getSettings(): Promise<SettingsView> {
    if (!Native.available) return empty;

    return await Native.request<SettingsView>("settings.get");
}

/** Persists the settings and returns the stored snapshot. */
export async function saveSettings(settings: AppSettings): Promise<SettingsView> {
    if (!Native.available) return {...empty, ...settings};

    return await Native.request<SettingsView>("settings.save", settings);
}

/** The whitelisted users, described like the instance list describes a player. */
export async function getWhitelistPeople(): Promise<InstanceUser[]> {
    if (!Native.available) return [];

    return await Native.request<InstanceUser[]>("whitelist.people");
}

/** Adds or removes one user id and returns the stored list. */
export async function setWhitelisted(userId: string, whitelisted: boolean): Promise<string[]> {
    if (!Native.available) return [];

    const view = await getSettings();
    const list = view.whitelist.filter((id) => id !== userId);

    if (whitelisted)
        list.push(userId);

    return (await saveSettings({...view, whitelist: list})).whitelist;
}
