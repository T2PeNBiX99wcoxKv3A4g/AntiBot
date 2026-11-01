import {lazy, Suspense, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {loadStrings, useTranslation} from "@photino-net-utils/bridge";
import {desktopAvailable, openLogFolder} from "../api/logs";
import {type AppSettings, getSettings, getWhitelistPeople, saveSettings} from "../api/settings";
import type {InstanceUser} from "../api/instance";
import {type AppInfo, setStartup, startupStatus, type StartupStatus} from "../api/system";
import {Dropdown} from "../components/Dropdown";
import {FolderIcon, EyeIcon, EyeOffIcon, TrashIcon} from "../components/Icons";

/* The licence texts are large, so the notices page is loaded only when it is opened. */
const AttributionPage = lazy(() =>
    import("../components/AttributionPage").then((module) => ({default: module.AttributionPage}))
);

/** Language names are always shown in their own language. */
const LOCALE_NAMES: Record<string, string> = {
    en: "English",
    ja: "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
};

/** The settings sections, in page order; the jump list is built from this. */
const SECTIONS = [
    {id: "settings-language", label: "Language"},
    {id: "settings-startup", label: "Start with the system"},
    {id: "settings-log-source", label: "Log source"},
    {id: "settings-avatar-lookups", label: "Avatar name lookups"},
    {id: "settings-protection", label: "Automatic protection"},
    {id: "settings-whitelist", label: "Whitelist"},
    {id: "settings-build", label: "Build"},
];

interface SettingsPageProps {
    info: AppInfo | null;
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
    const [language, setLanguage] = useState("en");
    const [locales, setLocales] = useState<string[]>([]);
    const [startHidden, setStartHidden] = useState(false);
    const [startup, setStartupState] = useState<StartupStatus | null>(null);
    const [startupBusy, setStartupBusy] = useState(false);
    const [attributionOpen, setAttributionOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [error, setError] = useState<string | null>(null);
    const thresholdTimer = useRef(0);

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
            setLanguage(settings.language ?? "en");
            setStartHidden(settings.startHidden);

            void loadPeople(0);
        }, () => setError(t("Could not read the settings.")));
    }, []);

    useEffect(() => {
        void loadStrings().then((payload) => setLocales(payload.available), () => setLocales([]));
    }, []);

    useEffect(() => {
        void startupStatus().then(setStartupState, () => setStartupState(null));
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
        startHidden,
        ...overrides,
    });

    /** Every control saves itself, so nothing waits for a separate save button. */
    const persist = async (overrides: Partial<AppSettings> = {}, reloadPeople = false) => {
        setError(null);

        try {
            const stored = await saveSettings(formSettings(overrides));
            setWhitelist(stored.whitelist ?? []);

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

    const revealFolder = async () => {
        setError(null);

        try {
            await openLogFolder();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
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
                    <h2>{t("Language")}</h2>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>{t("Language")}</Label>
                        <Dropdown
                            onChange={(value) => void changeLanguage(value)}
                            options={locales.map((locale) => ({
                                value: locale,
                                label: LOCALE_NAMES[locale] ?? locale,
                            }))}
                            value={language}
                        />
                        <Hint>{t("Language used by both the interface and the desktop backend.")}</Hint>
                    </Field>

                </Card>
            </Section>

            <Section id="settings-startup">
                <SectionHeader>
                    <h2>{t("Start with the system")}</h2>
                </SectionHeader>

                <Card>
                    <ToggleRow>
                        <Toggle
                            checked={startup?.enabled ?? false}
                            disabled={startupBusy || !startup?.supported}
                            hint={t("Create an autostart entry for this user.")}
                            onChange={(value) => void changeStartup(value)}
                            title={t("Start with the system")}
                        />
                        <Toggle
                            checked={startHidden}
                            hint={t("Open in the tray instead of showing the window.")}
                            onChange={(value) => {
                                setStartHidden(value);
                                void persist({startHidden: value});
                            }}
                            title={t("Start hidden")}
                        />
                    </ToggleRow>
                </Card>
            </Section>

            <Section id="settings-log-source">
                <SectionHeader>
                    <h2>{t("Log source")}</h2>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>{t("VRChat log folder")}</Label>
                        <Row>
                            <Input
                                aria-label={t("VRChat log folder")}
                                onBlur={() => void persist()}
                                onChange={(event) => setDirectory(event.target.value)}
                                placeholder={t("VRChat's log folder")}
                                spellCheck={false}
                                value={directory}
                            />
                        </Row>
                        <Hint>
                            {t("The newest log in this folder is followed while VRChat is running. Nothing is read while it is closed.")}
                        </Hint>
                    </Field>

                    <Actions>
                        <Button disabled={!desktopAvailable} onClick={revealFolder} type="button">
                            <FolderIcon/>{t("Open folder")}
                        </Button>
                        <Button
                            disabled={!defaultDirectory || trimmed === defaultDirectory}
                            onClick={() => {
                                setDirectory(defaultDirectory);
                                void persist({logDirectory: defaultDirectory});
                            }}
                            type="button"
                        >
                            {t("Use VRChat's folder")}
                        </Button>
                    </Actions>
                </Card>
            </Section>

            <Section id="settings-avatar-lookups">
                <SectionHeader>
                    <h2>{t("Avatar name lookups")}</h2>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>{t("API endpoints")}</Label>
                        <Hint>
                            {t("Tried in order; the first name wins. Each is called as")}
                            <code> ?fileId=file_…</code> {t("and must answer with JSON containing a")}
                            <code> name</code>.
                        </Hint>

                        <Providers>
                            {providers.length === 0 && <EmptyHint>{t("No endpoint; avatar names stay unknown.")}</EmptyHint>}
                            {providers.map((provider, index) => (
                                <Row key={`${provider}-${index}`}>
                                    <Input
                                        aria-label={t("Avatar API endpoint")}
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
                                        aria-label={t("Remove endpoint")}
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
                                aria-label={t("New avatar API endpoint")}
                                onChange={(event) => setNewProvider(event.target.value)}
                                placeholder="https://example.com/avatars"
                                spellCheck={false}
                                value={newProvider}
                            />
                            <Button disabled={newProvider.trim().length === 0} onClick={addProvider} type="button">
                                {t("Add")}
                            </Button>
                        </Row>
                    </Field>
                </Card>
            </Section>

            <Section id="settings-protection">
                <SectionHeader>
                    <h2>{t("Automatic protection")}</h2>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>{t("Threat threshold")}</Label>
                        <Row>
                            <Range
                                max={100}
                                min={0}
                                onChange={(event) => changeThreshold(Number(event.target.value))}
                                step={5}
                                type="range"
                                value={threshold}
                            />
                            <ThresholdValue>{threshold}</ThresholdValue>
                        </Row>
                        <Hint>
                            {t("Any user at or above this score is acted on; the score is a guess and can be wrong. Friends and whitelisted users are never acted on.")}
                        </Hint>
                    </Field>

                    <ToggleRow>
                        <Toggle
                            checked={autoBlock}
                            hint={t("Block the user. VRChat may then refuse to send them your avatar if it checks blocks on the server; it may also have no effect.")}
                            onChange={(value) => {
                                setAutoBlock(value);
                                void persist({autoBlock: value});
                            }}
                            title={t("Block the user")}
                        />
                        <Toggle
                            checked={autoAvatar}
                            hint={t("Turn the user's avatar interactions off, so their avatar cannot trigger anything on yours.")}
                            onChange={(value) => {
                                setAutoAvatar(value);
                                void persist({autoDisableAvatarInteraction: value});
                            }}
                            title={t("Disable avatar interactions")}
                        />
                        <Toggle
                            checked={autoChat}
                            hint={t("Hide the user's chat box, so they cannot flood or harass through it.")}
                            onChange={(value) => {
                                setAutoChat(value);
                                void persist({autoHideChatBox: value});
                            }}
                            title={t("Hide the chat box")}
                        />
                        <Toggle
                            checked={autoSafeMode}
                            hint={t("Turn on VRChat's Safe Mode over OSC when a user reaches the threshold, so every non-friend avatar is replaced at once. It needs OSC enabled in VRChat and stays on until you turn it off.")}
                            onChange={(value) => {
                                setAutoSafeMode(value);
                                void persist({autoSafeMode: value});
                            }}
                            title={t("Safe Mode (OSC)")}
                        />
                        <Toggle
                            checked={autoSafeAvatar}
                            hint={t("Switch to another avatar over OSC when a user reaches the threshold. It is not switched back.")}
                            onChange={(value) => {
                                setAutoSafeAvatar(value);
                                void persist({autoSafeAvatar: value});
                            }}
                            title={t("Switch avatar (OSC)")}
                        />
                        <ToggleField>
                            <Label>{t("Safe avatar id")}</Label>
                            <SecretInput
                                disabled={!autoSafeAvatar}
                                onBlur={() => void persist()}
                                onChange={setSafeAvatarId}
                                placeholder="avtr_…"
                                value={safeAvatarId}
                            />
                            <Hint>
                                {t("Only avatars in your favourites, your recents or your own uploads can be used. Copy the id (avtr_…) from the avatar's page on vrchat.com.")}
                            </Hint>
                        </ToggleField>
                        <Toggle
                            checked={autoClose}
                            hint={t("Close VRChat, so the client has as little chance as possible to download and cache their avatar.")}
                            onChange={(value) => {
                                setAutoClose(value);
                                void persist({autoCloseVrchat: value});
                            }}
                            title={t("Close VRChat")}
                        />
                        <Toggle
                            checked={skipCloseVr}
                            disabled={!autoClose}
                            hint={t("Do not close VRChat while a VR headset is in use; quitting from VR is disruptive.")}
                            onChange={(value) => {
                                setSkipCloseVr(value);
                                void persist({skipCloseInVr: value});
                            }}
                            title={t("Skip while in VR")}
                        />
                        <Toggle
                            checked={autoReject}
                            hint={t("Reject friend requests from any user at or above the threshold. VRChat's notification is hidden and the actions above are applied to the sender; the request stays in AntiBot's list as rejected, where it can be undone.")}
                            onChange={(value) => {
                                setAutoReject(value);
                                void persist({autoRejectFriendRequests: value});
                            }}
                            title={t("Reject friend requests")}
                        />
                    </ToggleRow>
                </Card>
            </Section>

            <Section id="settings-whitelist">
                <SectionHeader>
                    <h2>{t("Whitelist")}</h2>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>{t("Add a user")}</Label>
                        <Row>
                            <Input
                                aria-label={t("Whitelisted user id")}
                                onChange={(event) => setNewWhitelist(event.target.value)}
                                placeholder="usr_…"
                                spellCheck={false}
                                value={newWhitelist}
                            />
                            <Button disabled={newWhitelist.trim().length === 0} onClick={addWhitelist} type="button">
                                {t("Add")}
                            </Button>
                        </Row>
                        <Hint>
                            {t("Paste a VRChat user id. Whitelisted users get a white row and no automatic action.")}
                        </Hint>
                    </Field>

                    <WhitelistList>
                        {whitelist.length === 0 && <EmptyHint>{t("Nobody is whitelisted.")}</EmptyHint>}
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
                                        aria-label={t("Remove from whitelist")}
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
                    <h2>{t("Build")}</h2>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>{t("Version")}</Label>
                        <Value $mono>{info ? `v${info.version} · ${info.platform}` : t("browser preview")}</Value>
                        <Hint>{t("Read from the executable the interface is running in.")}</Hint>
                    </Field>
                </Card>
            </Section>

            <AttributionLink onClick={() => setAttributionOpen(true)} type="button">
                {t("Open source attribution")}
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
        </SettingsBody>
    );
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
                aria-label={visible ? t("Hide the avatar id") : t("Show the avatar id")}
                onClick={() => setVisible((current) => !current)}
                type="button"
            >
                {visible ? <EyeOffIcon size={14}/> : <EyeIcon size={14}/>}
            </Reveal>
        </SecretWrap>
    );
}

function Toggle({checked, onChange, title, hint, disabled = false}: {
    checked: boolean;
    onChange: (value: boolean) => void;
    title: string;
    hint: string;
    disabled?: boolean;
}) {
    return (
        <ToggleItem>
            <ToggleLabel>
                <input
                    checked={checked}
                    disabled={disabled}
                    onChange={(event) => onChange(event.target.checked)}
                    type="checkbox"
                />
                <span>{title}</span>
            </ToggleLabel>
            <ToggleHint>{hint}</ToggleHint>
        </ToggleItem>
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

const Range = styled.input`
    flex: 1;
    accent-color: var(--accent-primary);
`;

const ThresholdValue = styled.strong`
    width: 48px;
    text-align: right;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent-primary);
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

const ToggleItem = styled.label`
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
`;

const ToggleLabel = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    input {
        accent-color: var(--accent-primary);
    }
`;

const ToggleHint = styled.span`
    padding-left: 24px;
    font-size: 10.5px;
    color: var(--text-muted);
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
