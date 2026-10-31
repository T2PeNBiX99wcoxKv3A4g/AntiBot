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
    autoReturnHome: boolean;
    autoRejectFriendRequests: boolean;
    threatThreshold: number;
    whitelist: string[];
}

export interface AppSettings {
    logDirectory: string;
    avatarApiProviders: string[];
    autoBlock: boolean;
    autoDisableAvatarInteraction: boolean;
    autoHideChatBox: boolean;
    autoReturnHome: boolean;
    autoRejectFriendRequests: boolean;
    threatThreshold: number;
    whitelist: string[];
}

const empty: SettingsView = {
    logDirectory: "",
    defaultLogDirectory: "",
    avatarApiProviders: [],
    autoBlock: true,
    autoDisableAvatarInteraction: true,
    autoHideChatBox: true,
    autoReturnHome: true,
    autoRejectFriendRequests: true,
    threatThreshold: 70,
    whitelist: [],
};

/** Reads the log folder, the avatar databases and the protection settings. */
export async function getSettings(): Promise<SettingsView> {
    if (!Native.available) return empty;

    return await Native.request<SettingsView>("settings.get");
}

/** Persists the settings. */
export async function saveSettings(settings: AppSettings): Promise<void> {
    if (!Native.available) return;

    await Native.request("settings.save", settings);
}

/** The whitelisted users, described like the instance list describes a player. */
export async function getWhitelistPeople(): Promise<InstanceUser[]> {
    if (!Native.available) return [];

    return await Native.request<InstanceUser[]>("whitelist.people");
}
