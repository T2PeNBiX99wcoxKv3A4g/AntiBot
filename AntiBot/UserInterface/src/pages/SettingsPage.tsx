import {lazy, Suspense, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import type {LocalizationKey, ThemeMode} from "@photino-net-utils/bridge";
import {loadStrings, type Translate, useTranslation} from "@photino-net-utils/bridge";
import {desktopAvailable, openLogFolder} from "../api/logs";
import {type AppSettings, getSettings, getWhitelistPeople, normalizeTheme, saveSettings} from "../api/settings";
import {type OscStatus, oscStatus, testOsc} from "../api/osc";
import type {InstanceUser} from "../api/instance";
import {
    type AppInfo,
    cancelUpdateDownload,
    checkForUpdates,
    getUpdateStatus,
    installUpdate,
    onUpdateChangelog,
    onUpdateProgress,
    openLogsFolder,
    openReleasesPage,
    RELEASES_URL,
    setStartup,
    startUpdateDownload,
    startupStatus,
    type StartupStatus,
    type UpdateCheck,
    type UpdateProgress
} from "../api/system";
import {Dropdown} from "../components/Dropdown";
import {DownloadIcon, ExternalIcon, EyeIcon, EyeOffIcon, FolderIcon, RefreshIcon, TrashIcon} from "../components/Icons";
import {Toggle} from "../components/Toggle";

/* The licence texts are large, so the notices page is loaded only when it is opened. */
const AttributionPage = lazy(() =>
    import("../components/AttributionPage").then((module) => ({default: module.AttributionPage}))
);

/** The stored value that follows the operating system's language. */
const SYSTEM_LOCALE = "system";

/** Language names are always shown in their own language. */
const LOCALE_NAMES: Record<string, string> = {
    en: "English",
    ja: "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
};

/** The settings sections, in page order; the jump list is built from this. */
const SECTIONS: { id: string; label: LocalizationKey }[] = [
    {id: "settings-language", label: "language"},
    {id: "settings-appearance", label: "appearance"},
    {id: "settings-startup", label: "start_with_the_system"},
    {id: "settings-log-source", label: "log_source"},
    {id: "settings-avatar-lookups", label: "avatar_name_lookups"},
    {id: "settings-osc", label: "osc"},
    {id: "settings-protection", label: "automatic_protection"},
    {id: "settings-whitelist", label: "whitelist"},
    {id: "settings-build", label: "build"},
];

interface SettingsPageProps {
    info: AppInfo | null;
}

type UpdateDialogPhase = UpdateProgress["phase"] | "installing";

interface UpdateDialogState {
    phase: UpdateDialogPhase;
    changelog: string;
    downloaded: number;
    total: number;
    percent: number;
    error?: string;
}

export function SettingsPage({info}: SettingsPageProps) {
    const t = useTranslation();
    const [directory, setDirectory] = useState("");
    const [defaultDirectory, setDefaultDirectory] = useState("");
    const [providers, setProviders] = useState<string[]>([]);
    const [newProvider, setNewProvider] = useState("");
    const [autoBlock, setAutoBlock] = useState(true);
    const [autoAvatar, setAutoAvatar] = useState(true);
    const [autoChat, setAutoChat] = useState(true);
    const [autoClose, setAutoClose] = useState(false);
    const [autoSafeMode, setAutoSafeMode] = useState(false);
    const [autoSafeAvatar, setAutoSafeAvatar] = useState(false);
    const [safeAvatarId, setSafeAvatarId] = useState("");
    const [skipCloseVr, setSkipCloseVr] = useState(true);
    const [autoReject, setAutoReject] = useState(true);
    const [threshold, setThreshold] = useState(50);
    const [whitelist, setWhitelist] = useState<string[]>([]);
    const [newWhitelist, setNewWhitelist] = useState("");
    const [people, setPeople] = useState<InstanceUser[]>([]);
    const [language, setLanguage] = useState(SYSTEM_LOCALE);
    const [theme, setTheme] = useState<ThemeMode>("system");
    const [locales, setLocales] = useState<string[]>([]);
    const [startHidden, setStartHidden] = useState(false);
    const [oscPort, setOscPort] = useState(9000);
    const [oscState, setOscState] = useState<OscStatus | null>(null);
    const [oscResult, setOscResult] = useState("");
    const [oscBusy, setOscBusy] = useState(false);
    const [startup, setStartupState] = useState<StartupStatus | null>(null);
    const [startupBusy, setStartupBusy] = useState(false);
    const [updateResult, setUpdateResult] = useState<UpdateCheck | null>(null);
    const [updateBusy, setUpdateBusy] = useState(false);
    const [updateDialog, setUpdateDialog] = useState<UpdateDialogState | null>(null);
    const [attributionOpen, setAttributionOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [error, setError] = useState<string | null>(null);
    const thresholdTimer = useRef(0);
    const autoInstalled = useRef(false);
    const oscTimer = useRef(0);

    /** A profile is fetched the first time it is asked for, so the names arrive a moment later. */
    const loadPeople = async (attempt: number) => {
        try {
            const list = await getWhitelistPeople();
            setPeople(list);

            if (attempt < 6 && list.some((person) => person.name === person.userId))
                window.setTimeout(() => void loadPeople(attempt + 1), 1200);
        } catch {
            // The host failed to answer; ids are shown until it does.
        }
    };

    /** Whether VRChat is advertising OSC, which the host reads from the log. */
    const refreshOsc = () => {
        void oscStatus().then(setOscState, () => setOscState(null));
    };

    const runOscTest = async () => {
        setOscBusy(true);
        setOscResult("");

        try {
            const result = await testOsc(oscPort);
            setOscResult(result.sent
                ? t("sent_to_port_port_if_the_quick_menu_opened_osc_is_working", {port: result.port})
                : t("could_not_send_the_test_message"));
            refreshOsc();
        } catch (reason) {
            setOscResult(reason instanceof Error ? reason.message : String(reason));
        } finally {
            setOscBusy(false);
        }
    };

    /** The slider fires on every step, so the save waits for it to settle. */
    const changeOscPort = (value: number) => {
        setOscPort(value);
        window.clearTimeout(oscTimer.current);
        oscTimer.current = window.setTimeout(() => void persist({oscPort: value}), 400);
    };

    useEffect(() => {
        void getSettings().then((settings) => {
            setDirectory(settings.logDirectory ?? "");
            setDefaultDirectory(settings.defaultLogDirectory ?? "");
            setProviders(settings.avatarApiProviders ?? []);

            setAutoBlock(settings.autoBlock);
            setAutoAvatar(settings.autoDisableAvatarInteraction);
            setAutoChat(settings.autoHideChatBox);
            setAutoClose(settings.autoCloseVrchat);
            setAutoSafeMode(settings.autoSafeMode);
            setAutoSafeAvatar(settings.autoSafeAvatar);
            setSafeAvatarId(settings.safeAvatarId ?? "");
            setSkipCloseVr(settings.skipCloseInVr);
            setAutoReject(settings.autoRejectFriendRequests);
            setThreshold(settings.threatThreshold);
            setWhitelist(settings.whitelist ?? []);
            setLanguage(settings.language ?? SYSTEM_LOCALE);
            setTheme(normalizeTheme(settings.theme));
            setStartHidden(settings.startHidden);
            setOscPort(settings.oscPort || 9000);

            void loadPeople(0);
            refreshOsc();
        }, () => setError(t("could_not_read_the_settings")));
    }, []);

    useEffect(() => {
        void loadStrings().then((payload) => setLocales(payload.available), () => setLocales([]));
    }, []);

    useEffect(() => {
        void startupStatus().then(setStartupState, () => setStartupState(null));
    }, []);

    useEffect(() => {
        void getUpdateStatus().then(setUpdateResult, () => undefined);
    }, []);

    useEffect(() => {
        const offProgress = onUpdateProgress((progress) => {
            setUpdateDialog((current) => current
                ? {
                    ...current,
                    phase: progress.phase,
                    downloaded: progress.downloaded,
                    total: progress.total,
                    percent: progress.percent,
                    error: progress.error ?? (progress.phase === "error" ? current.error : undefined),
                }
                : current);
        });

        const offChangelog = onUpdateChangelog((payload) => {
            setUpdateDialog((current) => current ? {...current, changelog: payload.text} : current);
        });

        return () => {
            offProgress();
            offChangelog();
        };
    }, []);

    /* Marks the section being read, so the jump list also shows where the page is. */
    useEffect(() => {
        const sections = SECTIONS.map((section) => document.getElementById(section.id));
        if (sections.some((section) => section === null)) return;

        const observer = new IntersectionObserver((entries) => {
            const top = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
            if (top) setActiveSection(top.target.id);
        }, {rootMargin: "-8% 0px -70% 0px"});

        sections.forEach((section) => observer.observe(section!));
        return () => observer.disconnect();
    }, []);

    const jumpTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    const trimmed = directory.trim();

    /** The form values as the backend expects them, with any field overridden for an immediate save. */
    const formSettings = (overrides: Partial<AppSettings> = {}): AppSettings => ({
        logDirectory: trimmed,
        avatarApiProviders: providers.map((provider) => provider.trim()).filter((provider) => provider.length > 0),
        autoBlock,
        autoDisableAvatarInteraction: autoAvatar,
        autoHideChatBox: autoChat,
        autoCloseVrchat: autoClose,
        autoSafeMode,
        autoSafeAvatar,
        safeAvatarId: safeAvatarId.trim(),
        skipCloseInVr: skipCloseVr,
        autoRejectFriendRequests: autoReject,
        threatThreshold: threshold,
        whitelist,
        language,
        theme,
        startHidden,
        oscPort,
        ...overrides,
    });

    /** Every control saves itself, so nothing waits for a separate save button. */
    const persist = async (overrides: Partial<AppSettings> = {}, reloadPeople = false) => {
        setError(null);

        try {
            const stored = await saveSettings(formSettings(overrides));
            setWhitelist(stored.whitelist ?? []);
            setSafeAvatarId(stored.safeAvatarId ?? "");

            if (reloadPeople)
                void loadPeople(0);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        }
    };

    /** Language applies immediately; the provider reloads the strings when settings.changed arrives. */
    const changeLanguage = (next: string) => {
        setLanguage(next);
        void persist({language: next});
    };

    /** The theme applies immediately; App listens to settings.changed and re-applies it. */
    const changeTheme = (next: ThemeMode) => {
        setTheme(next);
        void persist({theme: next});
    };

    /** The startup entry lives outside the settings; its presence is the state. */
    const changeStartup = async (enabled: boolean) => {
        setStartupBusy(true);
        setError(null);

        try {
            setStartupState(await setStartup(enabled));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        } finally {
            setStartupBusy(false);
        }
    };

    // A finished download installs itself; the panel is only a progress report, no second click.
    useEffect(() => {
        if (updateDialog?.phase !== "ready" || autoInstalled.current)
            return;

        autoInstalled.current = true;
        void installNow();
    }, [updateDialog?.phase]);

    const revealFolder = async () => {
        setError(null);

        try {
            await openLogFolder();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        }
    };

    /** Opens the folder the backend writes its own logs to, ready to attach to a bug report. */
    const revealLogs = async () => {
        setError(null);

        try {
            await openLogsFolder();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        }
    };

    /** Reads the published version file and compares it with this build. */
    const checkUpdates = async () => {
        setUpdateBusy(true);
        setUpdateResult(null);
        setError(null);

        try {
            setUpdateResult(await checkForUpdates());
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        } finally {
            setUpdateBusy(false);
        }
    };

    const openReleasePage = async () => {
        setError(null);

        try {
            await openReleasesPage(RELEASES_URL);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        }
    };

    /** Opens the floating download panel; the host sends progress and the changelog from there. */
    const startUpdate = async () => {
        setError(null);
        autoInstalled.current = false;
        setUpdateDialog({phase: "changelog", changelog: "", downloaded: 0, total: 0, percent: 0});

        try {
            const ack = await startUpdateDownload();
            if (!ack.ok)
                setUpdateDialog((current) => current
                    ? {...current, phase: "error", error: ack.error ?? ""}
                    : current);
        } catch (reason) {
            setUpdateDialog((current) => current
                ? {...current, phase: "error", error: reason instanceof Error ? reason.message : String(reason)}
                : current);
        }
    };

    const cancelUpdate = async () => {
        try {
            await cancelUpdateDownload();
        } catch (reason) {
            setUpdateDialog((current) => current
                ? {...current, phase: "error", error: reason instanceof Error ? reason.message : String(reason)}
                : current);
        }
    };

    const installNow = async () => {
        setUpdateDialog((current) => current ? {...current, phase: "installing"} : current);

        try {
            const ack = await installUpdate();
            if (!ack.ok)
                setUpdateDialog((current) => current
                    ? {...current, phase: "error", error: ack.error ?? ""}
                    : current);
        } catch (reason) {
            setUpdateDialog((current) => current
                ? {...current, phase: "error", error: reason instanceof Error ? reason.message : String(reason)}
                : current);
        }
    };

    /** The slider fires on every step, so the save waits for it to settle. */
    const changeThreshold = (value: number) => {
        setThreshold(value);
        window.clearTimeout(thresholdTimer.current);
        thresholdTimer.current = window.setTimeout(() => void persist({threatThreshold: value}), 400);
    };

    const addProvider = () => {
        const value = newProvider.trim();
        if (value.length === 0 || providers.includes(value)) return;

        const next = [...providers, value];
        setProviders(next);
        setNewProvider("");
        void persist({avatarApiProviders: next});
    };

    const removeProvider = (index: number) => {
        const next = providers.filter((_, i) => i !== index);
        setProviders(next);
        void persist({avatarApiProviders: next});
    };

    const addWhitelist = () => {
        const id = newWhitelist.trim();
        if (id.length === 0 || whitelist.includes(id)) return;

        const next = [...whitelist, id];
        setWhitelist(next);
        setNewWhitelist("");
        void persist({whitelist: next}, true);
    };

    const removeWhitelist = (id: string) => {
        const next = whitelist.filter((item) => item !== id);
        setWhitelist(next);
        void persist({whitelist: next}, true);
    };

    return (
        <SettingsBody>
            <Stack>
                <Section id="settings-language">
                    <SectionHeader>
                        <h2>{t("language")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("language")}</Label>
                            <Dropdown
                                onChange={(value) => void changeLanguage(value)}
                                options={[
                                    {value: SYSTEM_LOCALE, label: t("system_default")},
                                    ...locales.map((locale) => ({
                                        value: locale,
                                        label: LOCALE_NAMES[locale] ?? locale,
                                    })),
                                ]}
                                value={language}
                            />
                            <Hint>{t("language_used_by_both_the_interface_and_the_desktop_backend")}</Hint>
                        </Field>

                    </Card>
                </Section>

                <Section id="settings-appearance">
                    <SectionHeader>
                        <h2>{t("appearance")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("theme")}</Label>
                            <Dropdown
                                onChange={(value) => changeTheme(value as ThemeMode)}
                                options={[
                                    {value: "system", label: t("follow_the_system")},
                                    {value: "light", label: t("light")},
                                    {value: "dark", label: t("dark")},
                                ]}
                                value={theme}
                            />
                            <Hint>{t("applies_to_the_whole_interface")}</Hint>
                        </Field>
                    </Card>
                </Section>

                <Section id="settings-startup">
                    <SectionHeader>
                        <h2>{t("start_with_the_system")}</h2>
                    </SectionHeader>

                    <Card>
                        <ToggleRow>
                            <Toggle
                                checked={startup?.enabled ?? false}
                                disabled={startupBusy || !startup?.supported}
                                hint={t("create_an_autostart_entry_for_this_user")}
                                onChange={(value) => void changeStartup(value)}
                                title={t("start_with_the_system")}
                            />
                            <Toggle
                                checked={startHidden}
                                hint={t("open_in_the_tray_instead_of_showing_the_window")}
                                onChange={(value) => {
                                    setStartHidden(value);
                                    void persist({startHidden: value});
                                }}
                                title={t("start_hidden")}
                            />
                        </ToggleRow>
                    </Card>
                </Section>

                <Section id="settings-log-source">
                    <SectionHeader>
                        <h2>{t("log_source")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("vr_chat_log_folder")}</Label>
                            <Row>
                                <Input
                                    aria-label={t("vr_chat_log_folder")}
                                    onBlur={() => void persist()}
                                    onChange={(event) => setDirectory(event.target.value)}
                                    placeholder={t("vr_chat_s_log_folder")}
                                    spellCheck={false}
                                    value={directory}
                                />
                            </Row>
                            <Hint>
                                {t("the_newest_log_in_this_folder_is_followed_while_vr_chat_is_running_nothing_is_read_while_it_is_closed")}
                            </Hint>
                        </Field>

                        <Actions>
                            <Button disabled={!desktopAvailable} onClick={revealFolder} type="button">
                                <FolderIcon/>{t("open_folder")}
                            </Button>
                            <Button
                                disabled={!defaultDirectory || trimmed === defaultDirectory}
                                onClick={() => {
                                    setDirectory(defaultDirectory);
                                    void persist({logDirectory: defaultDirectory});
                                }}
                                type="button"
                            >
                                {t("use_vr_chat_s_folder")}
                            </Button>
                        </Actions>
                    </Card>
                </Section>

                <Section id="settings-avatar-lookups">
                    <SectionHeader>
                        <h2>{t("avatar_name_lookups")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("api_endpoints")}</Label>
                            <Hint>
                                {t("tried_in_order_the_first_name_wins_each_is_called_as")}
                                <code> ?fileId=file_…</code> {t("and_must_answer_with_json_containing_a")}
                                <code> name</code>.
                            </Hint>

                            <Providers>
                                {providers.length === 0 &&
                                    <EmptyHint>{t("no_endpoint_avatar_names_stay_unknown")}</EmptyHint>}
                                {providers.map((provider, index) => (
                                    <Row key={`${provider}-${index}`}>
                                        <Input
                                            aria-label={t("avatar_api_endpoint")}
                                            onBlur={() => void persist()}
                                            onChange={(event) => {
                                                const next = [...providers];
                                                next[index] = event.target.value;
                                                setProviders(next);
                                            }}
                                            spellCheck={false}
                                            value={provider}
                                        />
                                        <Button
                                            aria-label={t("remove_endpoint")}
                                            onClick={() => removeProvider(index)}
                                            type="button"
                                        >
                                            <TrashIcon/>
                                        </Button>
                                    </Row>
                                ))}
                            </Providers>

                            <Row>
                                <Input
                                    aria-label={t("new_avatar_api_endpoint")}
                                    onChange={(event) => setNewProvider(event.target.value)}
                                    placeholder="https://example.com/avatars"
                                    spellCheck={false}
                                    value={newProvider}
                                />
                                <Button disabled={newProvider.trim().length === 0} onClick={addProvider} type="button">
                                    {t("add")}
                                </Button>
                            </Row>
                        </Field>
                    </Card>
                </Section>

                <Section id="settings-osc">
                    <SectionHeader>
                        <h2>{t("osc")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("osc_port")}</Label>
                            <Row>
                                <Input
                                    aria-label={t("osc_port")}
                                    max={65535}
                                    min={1}
                                    onChange={(event) => changeOscPort(Number(event.target.value) || 9000)}
                                    type="number"
                                    value={oscPort}
                                />
                            </Row>
                            <Hint>
                                {t("vr_chat_listens_on_9000_unless_it_was_started_with_a_custom_osc_port")}
                            </Hint>
                        </Field>

                        <Field>
                            <Row>
                                <Button disabled={oscBusy} onClick={() => void runOscTest()} type="button">
                                    {oscBusy ? t("testing") : t("test_connection")}
                                </Button>
                                <Hint>{t("opens_vr_chat_s_quick_menu_when_osc_is_working")}</Hint>
                            </Row>

                            <Hint>
                                {oscState?.listening
                                    ? oscState.detected > 0 && oscState.detected !== oscPort
                                        ? t("vr_chat_reports_port_detected_anti_bot_sends_to_port",
                                            {detected: oscState.detected, port: oscPort})
                                        : t("vr_chat_is_advertising_osc_on_port_port", {port: oscPort})
                                    : t("vr_chat_is_not_advertising_osc_enable_it_in_the_action_menu")}
                            </Hint>

                            {oscResult && <Hint>{oscResult}</Hint>}
                        </Field>
                    </Card>
                </Section>

                <Section id="settings-protection">
                    <SectionHeader>
                        <h2>{t("automatic_protection")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("threat_threshold")}</Label>
                            <Row>
                                <ThresholdInput
                                    min={0}
                                    onChange={(event) => changeThreshold(Number(event.target.value))}
                                    step={10}
                                    type="number"
                                    value={threshold}
                                />
                            </Row>
                            <Hint>
                                {t("any_user_at_or_above_this_score_is_acted_on_the_score_is_a_guess_and_can_be_wrong_friends_and_whitelisted_users_are_never_acted_on")}
                            </Hint>
                        </Field>

                        <ToggleRow>
                            <Toggle
                                checked={autoBlock}
                                hint={t("block_the_user_vr_chat_may_then_refuse_to_send_them_your_avatar_if_it_checks_blocks_on_the_server_it_may_also_have_no_effect")}
                                onChange={(value) => {
                                    setAutoBlock(value);
                                    void persist({autoBlock: value});
                                }}
                                title={t("block_the_user")}
                            />
                            <Toggle
                                checked={autoAvatar}
                                hint={t("turn_the_user_s_avatar_interactions_off_so_their_avatar_cannot_trigger_anything_on_yours")}
                                onChange={(value) => {
                                    setAutoAvatar(value);
                                    void persist({autoDisableAvatarInteraction: value});
                                }}
                                title={t("disable_avatar_interactions")}
                            />
                            <Toggle
                                checked={autoChat}
                                hint={t("hide_the_user_s_chat_box_so_they_cannot_flood_or_harass_through_it")}
                                onChange={(value) => {
                                    setAutoChat(value);
                                    void persist({autoHideChatBox: value});
                                }}
                                title={t("hide_the_chat_box")}
                            />
                            <Toggle
                                checked={autoSafeMode}
                                hint={t("turn_on_vr_chat_s_safe_mode_over_osc_when_a_user_reaches_the_threshold_so_every_non_friend_avatar_is_replaced_at_once_it_needs_osc_enabled_in_vr_chat_and_stays_on_until_you_turn_it_off")}
                                onChange={(value) => {
                                    setAutoSafeMode(value);
                                    void persist({autoSafeMode: value});
                                }}
                                requires={t("requires_osc")}
                                title={t("safe_mode_osc")}
                            />
                            <Toggle
                                checked={autoSafeAvatar}
                                hint={t("switch_to_another_avatar_over_osc_when_a_user_reaches_the_threshold_it_is_not_switched_back")}
                                onChange={(value) => {
                                    setAutoSafeAvatar(value);
                                    void persist({autoSafeAvatar: value});
                                }}
                                requires={t("requires_osc")}
                                title={t("switch_avatar_osc")}
                            />
                            <ToggleField>
                                <Label>{t("safe_avatar_id")}</Label>
                                <SecretInput
                                    disabled={!autoSafeAvatar}
                                    onBlur={() => void persist()}
                                    onChange={setSafeAvatarId}
                                    placeholder="avtr_… or https://vrchat.com/home/avatar/avtr_…"
                                    value={safeAvatarId}
                                />
                                <Hint>
                                    {t("only_avatars_in_your_favourites_your_recents_or_your_own_uploads_can_be_used_paste_the_avatar_s_link_or_its_id_avtr")}
                                </Hint>
                            </ToggleField>
                            <Toggle
                                checked={autoClose}
                                hint={t("close_vr_chat_so_the_client_has_as_little_chance_as_possible_to_download_and_cache_their_avatar") + " " +
                                    t("when_vr_chat_really_quits_the_osc_actions_are_skipped_because_there_is_nothing_left_to_protect")}
                                onChange={(value) => {
                                    setAutoClose(value);
                                    void persist({autoCloseVrchat: value});
                                }}
                                title={t("close_vr_chat")}
                            />
                            <Toggle
                                checked={skipCloseVr}
                                disabled={!autoClose}
                                hint={t("do_not_close_vr_chat_while_a_vr_headset_is_in_use_quitting_from_vr_is_disruptive")}
                                onChange={(value) => {
                                    setSkipCloseVr(value);
                                    void persist({skipCloseInVr: value});
                                }}
                                title={t("skip_while_in_vr")}
                            />
                            <Toggle
                                checked={autoReject}
                                hint={t("reject_friend_requests_from_any_user_at_or_above_the_threshold_vr_chat_s_notification_is_hidden_and_only_the_block_avatar_interaction_and_chat_box_actions_are_applied_to_the_sender_the_request_stays_in_anti_bot_s_list_as_rejected_where_it_can_be_undone")}
                                onChange={(value) => {
                                    setAutoReject(value);
                                    void persist({autoRejectFriendRequests: value});
                                }}
                                title={t("reject_friend_requests")}
                            />
                        </ToggleRow>
                    </Card>
                </Section>

                <Section id="settings-whitelist">
                    <SectionHeader>
                        <h2>{t("whitelist")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("add_a_user")}</Label>
                            <Row>
                                <Input
                                    aria-label={t("whitelisted_user_id")}
                                    onChange={(event) => setNewWhitelist(event.target.value)}
                                    placeholder="usr_… or https://vrchat.com/home/user/usr_…"
                                    spellCheck={false}
                                    value={newWhitelist}
                                />
                                <Button disabled={newWhitelist.trim().length === 0} onClick={addWhitelist}
                                        type="button">
                                    {t("add")}
                                </Button>
                            </Row>
                            <Hint>
                                {t("paste_a_vr_chat_user_id_or_profile_link_whitelisted_users_get_a_white_row_and_no_automatic_action")}
                            </Hint>
                        </Field>

                        <WhitelistList>
                            {whitelist.length === 0 && <EmptyHint>{t("nobody_is_whitelisted")}</EmptyHint>}
                            {whitelist.map((id) => {
                                const person = people.find((item) => item.userId === id);
                                return (
                                    <WhitelistRow key={id}>
                                        <WhitelistAvatar $src={person?.iconUrl ?? person?.avatarUrl}/>
                                        <WhitelistName>
                                            <strong>{person?.name ?? id}</strong>
                                            <span>{person?.trust ?? id}</span>
                                        </WhitelistName>
                                        <Button
                                            aria-label={t("remove_from_whitelist")}
                                            onClick={() => removeWhitelist(id)}
                                            type="button"
                                        >
                                            <TrashIcon/>
                                        </Button>
                                    </WhitelistRow>
                                );
                            })}
                        </WhitelistList>
                    </Card>
                </Section>

                {error && <ErrorText>{error}</ErrorText>}

                <Section id="settings-build">
                    <SectionHeader>
                        <h2>{t("build")}</h2>
                    </SectionHeader>

                    <Card>
                        <Field>
                            <Label>{t("version")}</Label>
                            <Value $mono>{info ? `v${info.version} · ${info.platform}` : t("browser_preview")}</Value>
                            <Hint>{t("read_from_the_executable_the_interface_is_running_in")}</Hint>
                        </Field>

                        <Actions>
                            <Button disabled={updateBusy} onClick={() => void checkUpdates()} type="button">
                                <RefreshIcon/>{updateBusy ? t("checking") : t("check_for_updates")}
                            </Button>
                            {updateResult?.available && (
                                <Button onClick={() => void openReleasePage()} type="button">
                                    <ExternalIcon size={16}/>{t("open_release_page")}
                                </Button>
                            )}
                            {updateResult?.available && info?.platform === "windows" && (
                                <Button onClick={() => void startUpdate()} type="button">
                                    <DownloadIcon/>{t("download_and_install")}
                                </Button>
                            )}
                            <Button onClick={() => void revealLogs()} type="button">
                                <FolderIcon/>{t("open_log_folder")}
                            </Button>
                        </Actions>

                        {updateResult && (updateResult.available
                            ? <UpdateAvailable>
                                {t("version_version_is_available", {version: updateResult.latest})}
                            </UpdateAvailable>
                            : <Hint>
                                {t("up_to_date_version_is_the_newest_version", {version: updateResult.current})}
                            </Hint>)}

                        {info?.logDirectory && (
                            <Field>
                                <Label>{t("log_files_are_written_to")}</Label>
                                <Value $mono>{info.logDirectory}</Value>
                            </Field>
                        )}
                    </Card>
                </Section>

                <AttributionLink onClick={() => setAttributionOpen(true)} type="button">
                    {t("open_source_attribution")}
                </AttributionLink>

                <Suspense fallback={null}>
                    {attributionOpen && <AttributionPage onClose={() => setAttributionOpen(false)}/>}
                </Suspense>
            </Stack>

            <SettingsNav>
                {SECTIONS.map((section) => (
                    <NavItem
                        $active={activeSection === section.id}
                        key={section.id}
                        onClick={() => jumpTo(section.id)}
                        type="button"
                    >
                        {t(section.label)}
                    </NavItem>
                ))}
            </SettingsNav>

            {updateDialog && (
                <UpdateOverlay>
                    <UpdatePanel aria-modal="true" role="dialog">
                        <UpdateHead>
                            <DownloadIcon size={20}/>
                            <div>
                                <h2>{t("updating_anti_bot")}</h2>
                                <p>
                                    {updateResult?.latest
                                        ? t("version_version", {version: updateResult.latest})
                                        : t("preparing_the_update")}
                                </p>
                            </div>
                        </UpdateHead>

                        <ChangelogTitle>{t("changelog")}</ChangelogTitle>
                        <Changelog>
                            {updateDialog.changelog || (updateDialog.phase === "changelog"
                                ? t("loading_the_changelog")
                                : t("the_changelog_could_not_be_loaded"))}
                        </Changelog>

                        <ProgressRow>
                            <span>{updatePhaseLabel(updateDialog.phase, t)}</span>
                            <span>{updateSizeLabel(updateDialog)}</span>
                        </ProgressRow>

                        <UpdateBar>
                            <UpdateFill $percent={Math.max(0, Math.min(100, updateDialog.percent))}/>
                        </UpdateBar>

                        {updateDialog.error && <ErrorText>{updateDialog.error}</ErrorText>}

                        <UpdateActions>
                            {(updateDialog.phase === "changelog" || updateDialog.phase === "downloading") && (
                                <Button onClick={() => void cancelUpdate()} type="button">
                                    {t("cancel")}
                                </Button>
                            )}
                            {updateDialog.phase === "installing" && (
                                <Button disabled type="button">{t("installing")}</Button>
                            )}
                            {(updateDialog.phase === "error" || updateDialog.phase === "cancelled") && (
                                <Button onClick={() => setUpdateDialog(null)} type="button">
                                    {t("close")}
                                </Button>
                            )}
                        </UpdateActions>
                    </UpdatePanel>
                </UpdateOverlay>
            )}
        </SettingsBody>
    );
}

function updatePhaseLabel(phase: UpdateDialogPhase, t: Translate): string {
    switch (phase) {
        case "changelog":
            return t("preparing_the_update");
        case "downloading":
            return t("downloading_the_update");
        case "ready":
            return t("download_complete");
        case "cancelled":
            return t("update_cancelled");
        case "error":
            return t("the_update_failed");
        case "installing":
            return t("installing");
        default:
            return "";
    }
}

function updateSizeLabel(state: UpdateDialogState): string {
    if (state.total > 0)
        return `${formatBytes(state.downloaded)} / ${formatBytes(state.total)}`;

    return state.downloaded > 0 ? formatBytes(state.downloaded) : "";
}

function formatBytes(bytes: number): string {
    if (bytes <= 0)
        return "0 B";

    const units = ["B", "KB", "MB", "GB"];
    var value = bytes;
    var unit = 0;

    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit++;
    }

    return `${value.toFixed(unit === 0 || value >= 10 ? 0 : 1)} ${units[unit]}`;
}

/** A text field whose value is hidden until the eye is used, for ids that should not be on screen. */
function SecretInput({value, onChange, onBlur, placeholder, disabled}: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    placeholder: string;
    disabled: boolean;
}) {
    const t = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
        <SecretWrap>
            <Input
                disabled={disabled}
                onBlur={onBlur}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                spellCheck={false}
                type={visible ? "text" : "password"}
                value={value}
            />
            <Reveal
                aria-label={visible ? t("hide_the_avatar_id") : t("show_the_avatar_id")}
                onClick={() => setVisible((current) => !current)}
                type="button"
            >
                {visible ? <EyeOffIcon size={14}/> : <EyeIcon size={14}/>}
            </Reveal>
        </SecretWrap>
    );
}

const SettingsBody = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    max-width: 960px;
`;

/** The jump list sits to the right of the cards, like URLCheck's settings page. */
const SettingsNav = styled.nav`
    position: sticky;
    top: 0;
    z-index: 10;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 144px;
    flex-shrink: 0;
    padding-top: 2px;
    user-select: none;

    @media (max-width: 1050px) {
        display: none;
    }
`;

const NavItem = styled.button<{ $active: boolean }>`
    width: 100%;
    overflow: hidden;
    padding: 6px 9px;
    border: 0;
    border-radius: 7px;
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.16)" : "transparent"};
    color: ${({$active}) => $active ? "var(--text-primary)" : "var(--text-muted)"};
    font: inherit;
    font-size: 10.5px;
    font-weight: ${({$active}) => $active ? "600" : "500"};
    line-height: 1.35;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`;

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 760px;
    min-width: 0;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-margin-top: 24px;
`;

const SectionHeader = styled.div`
    h2 {
        font-size: 13px;
        font-weight: 600;
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Providers = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const EmptyHint = styled.span`
    font-size: 11px;
    color: var(--text-muted);
`;

const Input = styled.input`
    flex: 1;
    min-width: 0;
    padding: 8px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-primary);
    font: inherit;
    font-family: var(--font-mono);
    font-size: 11px;

    &::placeholder {
        color: var(--text-muted);
    }

    &:focus {
        outline: none;
        border-color: var(--border-color-hover);
    }
`;

const Label = styled.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

/** Keeps the reveal button over the field, so the id is hidden until it is asked for. */
const SecretWrap = styled.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`;

const Reveal = styled.button`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`;

const Value = styled.span<{ $mono?: boolean }>`
    font-family: ${({$mono}) => $mono ? "var(--font-mono)" : "var(--font-sans)"};
    font-size: 12px;
    color: var(--text-primary);
    overflow-wrap: anywhere;
`;

const Hint = styled.span`
    font-size: 10px;
    line-height: 1.5;
    color: var(--text-muted);

    code {
        font-family: var(--font-mono);
    }
`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-secondary);
    font: inherit;
    font-size: 11px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const ErrorText = styled.span`
    color: var(--danger);
    font-size: 11px;
`;

/** The published version is newer than this build. */
const UpdateAvailable = styled.span`
    font-size: 11px;
    color: var(--accent-primary);
`;

const UpdateOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(4, 3, 10, 0.72);
    backdrop-filter: blur(6px);
`;

const UpdatePanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(760px, 94vw);
    max-height: 88vh;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
`;

const UpdateHead = styled.div`
    display: flex;
    gap: 12px;

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        margin-top: 2px;
        font-size: 11px;
        color: var(--text-secondary);
    }
`;

const ChangelogTitle = styled.span`
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

const Changelog = styled.pre`
    min-height: 130px;
    max-height: 42vh;
    margin: 0;
    padding: 12px;
    overflow: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 10.5px;
    line-height: 1.55;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
`;

const ProgressRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: var(--text-secondary);
`;

const UpdateBar = styled.div`
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
`;

const UpdateFill = styled.div<{ $percent: number }>`
    width: ${({$percent}) => `${$percent}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.7), var(--accent-primary));
    transition: width 180ms ease;
`;

const UpdateActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

/** A quiet line at the very bottom that opens the notices page. */
const AttributionLink = styled.button`
    align-self: flex-start;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    font-size: 10.5px;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;

    &:hover {
        color: var(--text-secondary);
    }
`;

const ThresholdInput = styled.input`
    width: 120px;
    padding: 7px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 12px;
`;

const ToggleRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

/** The field that belongs to a toggle, lined up under its text. */
const ToggleField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 24px;
`;

const WhitelistList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const WhitelistRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.05);
`;

const WhitelistAvatar = styled.span<{ $src?: string }>`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
`;

const WhitelistName = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;

    strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 500;
    }

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--font-mono);
        font-size: 9.5px;
        color: var(--text-muted);
    }
`;
