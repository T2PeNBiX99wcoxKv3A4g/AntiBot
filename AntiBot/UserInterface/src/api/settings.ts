import {Native} from "@photino-net-utils/bridge";
import type {InstanceUser} from "./instance";

/** The stored settings plus the folder the host uses when nothing has been saved. */
export interface SettingsView {
    logDirectory: string;
    defaultLogDirectory: string;
    avatarApiProviders: string[];
    autoBlock: boolean;
    autoDisableAvatarInteraction: boolean;
    autoHideChatBox: boolean;
    autoCloseVrchat: boolean;
    autoSafeMode: boolean;
    autoSafeAvatar: boolean;
    safeAvatarId: string;
    skipCloseInVr: boolean;
    autoRejectFriendRequests: boolean;
    threatThreshold: number;
    whitelist: string[];
    language: string;
    startHidden: boolean;
    /** 0 uses the port VRChat reports. */
    oscPort: number;
    rememberPassword: boolean;
}

export interface AppSettings {
    logDirectory: string;
    avatarApiProviders: string[];
    autoBlock: boolean;
    autoDisableAvatarInteraction: boolean;
    autoHideChatBox: boolean;
    autoCloseVrchat: boolean;
    autoSafeMode: boolean;
    autoSafeAvatar: boolean;
    safeAvatarId: string;
    skipCloseInVr: boolean;
    autoRejectFriendRequests: boolean;
    threatThreshold: number;
    whitelist: string[];
    language: string;
    startHidden: boolean;
    oscPort: number;
}

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
    startHidden: false,
    oscPort: 0,
    rememberPassword: false,
};

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

/** Turns the optional remembered password on or off without touching the other settings. */
export async function saveRememberPassword(enabled: boolean): Promise<SettingsView> {
    if (!Native.available) return {...empty, rememberPassword: enabled};

    return await Native.request<SettingsView>("settings.rememberPassword", {enabled}, 60_000);
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
