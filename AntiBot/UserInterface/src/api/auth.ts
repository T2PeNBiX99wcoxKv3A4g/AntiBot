import {Native} from "@photino-net-utils/bridge";

export type AuthState = "loggedOut" | "twoFactor" | "locked" | "loggedIn";

/** How the session cookie is kept between launches. */
export type AuthStorage = "none" | "password" | "system";

export interface Account {
    id: string;
    displayName: string;
    avatarUrl?: string;
    statusDescription?: string;
}

export interface AuthSnapshot {
    state: AuthState;
    user?: Account;
    storage: AuthStorage;
    twoFactorMethods: string[];
    /** Whether the platform can protect the session without a password (DPAPI, keyring). */
    systemStorage: boolean;
    systemStorageName: string;
}

export const signedOut: AuthSnapshot = {
    state: "loggedOut",
    storage: "none",
    twoFactorMethods: [],
    systemStorage: false,
    systemStorageName: "",
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
export async function login(username: string, password: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.login", {username, password}, 30_000);
}

/** `method` is `totp`, `emailOtp` or `otp` (a recovery code). */
export async function verify(method: string, code: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.verify", {method, code}, 30_000);
}

/** Opens a session that was stored with a password. */
export async function unlock(password: string): Promise<AuthSnapshot> {
    return await Native.request<AuthSnapshot>("auth.unlock", {password}, 30_000);
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
