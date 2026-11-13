// App/update/startup messages are owned by PhotinoNETUtils, so their client lives in the bridge.
export {
    type AppInfo,
    type StartupStatus,
    type UpdateAck,
    type UpdateChangelog,
    type UpdateCheck,
    type UpdatePhase,
    type UpdateProgress,
    cancelUpdateDownload,
    checkForUpdates,
    getAppInfo,
    getUpdateStatus,
    installUpdate,
    onUpdateChangelog,
    onUpdateProgress,
    openLogsFolder,
    openReleasesPage,
    openUrl,
    setStartup,
    startUpdateDownload,
    startupStatus
} from "@photino-net-utils/bridge";

/** Where the releases page lives when the interface runs in a plain browser. */
export const RELEASES_URL = "https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/releases/latest";
