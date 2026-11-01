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
    language: "en",
    startHidden: false,
    oscPort: 0,
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

/** The whitelisted users, described like the instance list describes a player. */
export async function getWhitelistPeople(): Promise<InstanceUser[]> {
    if (!Native.available) return [];

    return await Native.request<InstanceUser[]>("whitelist.people");
}
