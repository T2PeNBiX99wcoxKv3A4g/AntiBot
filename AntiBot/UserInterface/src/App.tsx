import {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {Native, ResizeHandles, useTheme, useWindowCorners, type ThemeMode} from "@photino-net-utils/bridge";
import {useTranslation} from "@photino-net-utils/bridge";
import type {LocalizationKey} from "@photino-net-utils/bridge";
import {getSettings, normalizeTheme} from "./api/settings";
import {type AppInfo, getAppInfo, getUpdateStatus, type UpdateCheck} from "./api/system";
import {Sidebar} from "./components/Sidebar";
import {TitleBar} from "./components/TitleBar";
import {ContextMenu} from "./components/ContextMenu";
import {useVrchatLog} from "./hooks/useVrchatLog";
import {useAuth} from "./hooks/useAuth";
import {AccountPage} from "./pages/AccountPage";
import {BatchPage} from "./pages/BatchPage";
import {DebugPage} from "./pages/DebugPage";
import {InstancePage} from "./pages/InstancePage";
import {LogViewerPage} from "./pages/LogViewerPage";
import {OperationsPage} from "./pages/OperationsPage";
import {RequestsPage} from "./pages/RequestsPage";
import {SettingsPage} from "./pages/SettingsPage";
import type {Page} from "./pages";

/** Pages fade in from a little below, which makes a switch feel like a change of view. */
const pageIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(8px) scale(0.995);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const pageMeta: Record<Page, { title: LocalizationKey; subtitle: LocalizationKey }> = {
    logs: {title: "vr_chat_log", subtitle: "live_output_of_vr_chat_s_log_while_it_is_running"},
    instance: {title: "instance", subtitle: "players_in_your_vr_chat_instance_from_the_api_once_signed_in"},
    batch: {
        title: "batch_actions",
        subtitle: "apply_the_moderation_actions_enabled_under_automatic_protection_to_a_list_of_vr_chat_users",
    },
    requests: {
        title: "friend_requests",
        subtitle: "every_incoming_request_anti_bot_has_recorded_with_the_sender_s_profile",
    },
    operations: {
        title: "operations",
        subtitle: "the_automatic_actions_anti_bot_has_taken_newest_first",
    },
    account: {title: "account", subtitle: "sign_in_to_vr_chat_so_the_instance_comes_from_the_api_not_the_log"},
    settings: {title: "settings", subtitle: "where_the_log_comes_from_and_what_anti_bot_does_with_it"},
    debug: {title: "debug", subtitle: "tools_that_only_a_debug_build_shows"},
};

export default function App() {
    const t = useTranslation();
    const [page, setPage] = useState<Page>("logs");
    const [info, setInfo] = useState<AppInfo | null>(null);
    const [update, setUpdate] = useState<UpdateCheck | null>(null);
    const [authExpired, setAuthExpired] = useState(false);
    const [pendingSettingsSection, setPendingSettingsSection] = useState<string | null>(null);
    const [theme, setTheme] = useState<ThemeMode>("system");
    const corners = useWindowCorners();
    const log = useVrchatLog();
    const {auth, ready} = useAuth();
    const signedIn = auth.state === "loggedIn";
    useTheme(theme);

    // A successful sign-in makes the expiry notice obsolete.
    useEffect(() => {
        if (signedIn) setAuthExpired(false);
    }, [signedIn]);

    useEffect(() => {
        void getAppInfo().then(setInfo, () => setInfo(null));
    }, []);

    // The theme lives in the settings; the host pushes settings.changed after every save.
    useEffect(() => {
        void getSettings().then((settings) => setTheme(normalizeTheme(settings.theme)), () => undefined);

        return Native.on((message) => {
            if (message.type === "settings.changed")
                setTheme(normalizeTheme((message.data as { theme?: string } | undefined)?.theme));
        });
    }, []);

    // The backend caches the published version, so this normally answers at once.
    useEffect(() => {
        void getUpdateStatus().then(setUpdate, () => undefined);
    }, []);

    // A footer click asks for the settings page and one of its sections in the same action.
    useEffect(() => {
        if (page !== "settings" || !pendingSettingsSection)
            return;

        const frame = window.requestAnimationFrame(() => {
            document.getElementById(pendingSettingsSection)?.scrollIntoView({behavior: "smooth", block: "start"});
            setPendingSettingsSection(null);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [page, pendingSettingsSection]);

    // The host waits for this before pushing events; sending to a web view that is still loading
    // would abort it.
    useEffect(() => {
        const timer = window.setTimeout(() => Native.send({type: "app.ready"}), 200);
        return () => window.clearTimeout(timer);
    }, []);

    // The tray can ask for a page (for example "settings") while the window is hidden.
    useEffect(() => {
        return Native.on((message) => {
            if (message.type === "auth.expired") {
                setAuthExpired(true);
                setPage("account");
                return;
            }

            if (message.type === "app.update" || message.type === "update.checked") {
                setUpdate((message.data as UpdateCheck | undefined) ?? null);
                return;
            }

            if (message.type !== "app.navigate")
                return;

            const page = (message.data as { page?: Page } | undefined)?.page;
            if (page) setPage(page);
        });
    }, []);

    const {title, subtitle} = pageMeta[page];

    return (
        <Root $rounded={corners}>
            <TitleBar/>

            <Shell>
                <Sidebar debug={info?.debug ?? false} onNavigate={setPage} page={page} status={log.status}/>

                <Main>
                    <Header>
                        <HeaderText key={page}>
                            <h1>{t(title)}</h1>
                            <p>{t(subtitle)}</p>
                        </HeaderText>
                        <HeaderMeta>
                            {!signedIn && (
                                <SignInPill onClick={() => setPage("account")} type="button">
                                    {authExpired
                                        ? t("session_expired_automatic_protection_is_off")
                                        : t("not_signed_in_only_the_log_is_available")}
                                </SignInPill>
                            )}
                        </HeaderMeta>
                    </Header>

                    <Content $flush={page !== "settings"} key={page}>
                        {page === "logs"
                            ? <LogViewerPage log={log}/>
                            : page === "instance"
                                ? <InstancePage signedIn={signedIn} onSignIn={() => setPage("account")}/>
                                : page === "batch"
                                    ? <BatchPage signedIn={signedIn} onSignIn={() => setPage("account")}/>
                                    : page === "requests"
                                        ? <RequestsPage signedIn={signedIn} onSignIn={() => setPage("account")}/>
                                        : page === "operations"
                                            ? <OperationsPage/>
                                            : page === "account"
                                                ? <AccountPage initial={auth} ready={ready} expired={authExpired}/>
                                                : page === "debug"
                                                    ? <DebugPage/>
                                                    : <SettingsPage info={info}/>}
                    </Content>

                    <Footer>
                        <Version>
                            <VersionText>
                                {info ? `v${info.version} · ${info.platform}` : t("browser_preview")}
                            </VersionText>
                            {info?.debug && <DebugBadge title={t("debug")}>{t("debug")}</DebugBadge>}
                            {update?.available && (
                                <UpdateDot
                                    aria-label={t("version_version_is_available", {version: update.latest})}
                                    onClick={() => {
                                        setPage("settings");
                                        setPendingSettingsSection("settings-build");
                                    }}
                                    title={t("version_version_is_available", {version: update.latest})}
                                    type="button"
                                />
                            )}
                        </Version>
                    </Footer>
                </Main>
            </Shell>

            <ResizeHandles/>
            <ContextMenu/>
        </Root>
    );
}

const Root = styled.div<{ $rounded: boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--bg-primary);

    /* An undecorated window gets no frame from the compositor, so the corners are drawn here. */
    border-radius: ${({$rounded}) => ($rounded ? "10px" : "0")};
    box-shadow: ${({$rounded}) => ($rounded ? "inset 0 0 0 1px var(--border-color)" : "none")};
`;

const Shell = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    background: radial-gradient(1100px 620px at 18% -10%, rgba(139, 92, 246, 0.12), transparent 60%),
    radial-gradient(900px 500px at 110% 15%, rgba(99, 102, 241, 0.12), transparent 55%),
    var(--bg-primary);
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`;

const Header = styled.header`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 26px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    animation: ${pageIn} 0.18s cubic-bezier(0.22, 1, 0.36, 1);

    h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
    }
`;

const HeaderMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
`;

const SignInPill = styled.button`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 10px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: 999px;
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font-family: var(--font-mono);
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.7);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const Content = styled.div<{ $flush: boolean }>`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding: ${({$flush}) => $flush ? "16px 26px 18px" : "22px 30px 30px"};
    overflow: ${({$flush}) => $flush ? "hidden" : "auto"};
    animation: ${pageIn} 0.18s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 7px 26px;
    border-top: 1px solid var(--border-color);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;

const Version = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
`;

const VersionText = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

/** Marks a build that was compiled with Debug, which is the only one with the debug page. */
const DebugBadge = styled.span`
    flex-shrink: 0;
    padding: 1px 5px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.14);
`;

/** Shown next to the version only when the published build is newer than this one. */
const UpdateDot = styled.button`
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.14), 0 0 10px rgba(167, 139, 250, 0.55);
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease;

    &:hover {
        transform: scale(1.25);
        box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.2), 0 0 14px rgba(167, 139, 250, 0.7);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 3px;
    }
`;
