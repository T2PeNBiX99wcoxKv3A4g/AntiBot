import {Native} from "@photino-net-utils/bridge";

export type AuthState = "loggedOut" | "twoFactor" | "locked" | "loggedIn";

/** How the session cookie is kept between launches. */
export type AuthStorage = "none" | "password" | "system" | "tpm" | "hello" | "software";

export interface Account {
    id: string;
    displayName: string;
    avatarUrl?: string;
    status?: string;
    statusDescription?: string;
}

/** One row of the account list, as the host keeps it. */
export interface AccountSummary {
    /** The hashed folder name; the account id itself is never sent to the interface. */
    dir: string;
    name: string;
    /** A data URL of the cached picture, so the list renders while the session is locked. */
    avatar?: string;
    storage: AuthStorage;
    active: boolean;
    /** False for a "do not remember" account, which only lives until AntiBot exits. */
    stored: boolean;
}

/** An account whose password is saved on this device; pressing it signs in. */
export interface SavedAccount {
    dir: string;
    name: string;
    /** A cached data URL, or the VRChat CDN link when nothing has been cached yet. */
    avatar?: string;
    /** Whether this account signs in by itself when the session expires. */
    autoLogin: boolean;
}

export interface AuthSnapshot {
    state: AuthState;
    user?: Account;
    storage: AuthStorage;
    twoFactorMethods: string[];
    /** Whether the platform can protect the session without a password (DPAPI, keyring). */
    systemStorage: boolean;
    systemStorageName: string;
    /** Whether the machine has a TPM that can hold the wrapping key. */
    tpmStorage: boolean;
    /** Whether Windows Hello can gate the wrapping key. */
    helloStorage: boolean;
    /** Whether the plain key-file mode is offered (Linux). */
    softwareStorage: boolean;
    /** When the session cookie expires, if VRChat gave it an expiry. */
    expiresAt?: string;
    /** Whether the user has already picked a storage mode, including "do not remember". */
    storageChosen: boolean;
    /** Every account AntiBot can switch to, newest first. */
    accounts: AccountSummary[];
    /** Every account with a password saved on this device, newest first. */
    saved: SavedAccount[];
}

export const signedOut: AuthSnapshot = {
    state: "loggedOut",
    storage: "none",
    twoFactorMethods: [],
    systemStorage: false,
    systemStorageName: "",
    tpmStorage: false,
    helloStorage: false,
    softwareStorage: false,
    storageChosen: false,
    accounts: [],
    saved: [],
};

export interface DeviceCode {
    deviceCode: string;
    url: string;
    qrDataUrl: string;
    interval: number;
    expiresIn: number;
}

export interface DevicePoll {
    approved: boolean;
    reason?: string;
    auth?: AuthSnapshot;
}

/** The session the host restored at startup, if any. */
export async function getAuth(): Promise<AuthSnapshot> {
    if (!Native.available) return signedOut;

    return await Native.request<AuthSnapshot>("auth.state");
}

/** Signs in with the password; the reply asks for a second factor when VRChat wants one. */
export async function login(
    username: string,
    password: string,
    rememberPassword = true,
    autoLogin = true,
): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.login", {username, password, rememberPassword, autoLogin},
        30_000);
}

/** Signs in with one saved account; omitting `dir` uses the most recently saved one. */
export async function signInWithSavedPassword(dir?: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.login.saved", {dir}, 120_000);
}

/** Deletes one saved password, leaving the account and its session alone. */
export async function forgetSavedPassword(dir: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.saved.forget", {dir}, 30_000);
}

/** `method` is `totp`, `emailOtp` or `otp` (a recovery code). */
export async function verify(method: string, code: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.verify", {method, code}, 30_000);
}

/** Opens a session that was stored with a password, or one the account list asked for. */
export async function unlock(password: string, dir?: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.unlock", {password, dir}, 120_000);
}

/** Body for a switch: a password-protected account is asked for before anything is changed. */
export interface SwitchResult {
    ok: boolean;
    needsPassword: boolean;
    error?: string;
    auth?: AuthSnapshot;
    /** The saved session is gone, so the account has to be signed in again. */
    needsLogin?: boolean;
}

/** Makes another stored account the signed-in one. */
export async function switchAccount(dir: string): Promise<SwitchResult> {
    return await Native.request<SwitchResult>("auth.switch", {dir}, 120_000);
}

/** Forgets an account and its stored session. */
export async function removeAccount(dir: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.remove", {dir}, 30_000);
}

/** Drops a sign-in that was started and then abandoned. */
export async function cancelSignIn(): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.signin.cancel", undefined, 15_000);
}

export async function saveStorage(mode: AuthStorage, password?: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.storage.save", {mode, password}, 30_000);
}

export async function logout(): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.logout", undefined, 30_000);
}

/** Starts a device (QR) sign-in, which is approved in a browser or the VRChat app. */
export async function startDevice(): Promise<DeviceCode> {
    return await Native.request<DeviceCode>("auth.device.start", undefined, 30_000);
}

export async function pollDevice(deviceCode: string): Promise<DevicePoll> {
    return await Native.request<DevicePoll>("auth.device.poll", {deviceCode}, 30_000);
}

export function onAuthChanged(handler: (snapshot: AuthSnapshot) => void): () => void {
    return Native.on((message) => {
        if (message.type === "auth.changed") handler(message.data as AuthSnapshot);
    });
}
