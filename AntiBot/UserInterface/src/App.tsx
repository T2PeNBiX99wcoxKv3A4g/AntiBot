import {useEffect, useState} from "react";
import styled from "styled-components";
import {Native, ResizeHandles, useTranslation, useWindowCorners} from "@photino-net-utils/bridge";
import {type AppInfo, getAppInfo} from "./api/system";
import {Sidebar} from "./components/Sidebar";
import {TitleBar} from "./components/TitleBar";
import {useVrchatLog} from "./hooks/useVrchatLog";
import {useAuth} from "./hooks/useAuth";
import {AccountPage} from "./pages/AccountPage";
import {InstancePage} from "./pages/InstancePage";
import {LogViewerPage} from "./pages/LogViewerPage";
import {OperationsPage} from "./pages/OperationsPage";
import {RequestsPage} from "./pages/RequestsPage";
import {SettingsPage} from "./pages/SettingsPage";
import type {Page} from "./pages";

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
    logs: {title: "VRChat log", subtitle: "Live output of VRChat's log while it is running."},
    instance: {title: "Instance", subtitle: "Players in your VRChat instance, from the API once signed in."},
    requests: {
        title: "Friend requests",
        subtitle: "Every incoming request AntiBot has recorded, with the sender's profile.",
    },
    operations: {
        title: "Operations",
        subtitle: "The automatic actions AntiBot has taken, newest first.",
    },
    account: {title: "Account", subtitle: "Sign in to VRChat so the instance comes from the API, not the log."},
    settings: {title: "Settings", subtitle: "Where the log comes from, and what AntiBot does with it."},
};

export default function App() {
    const t = useTranslation();
    const [page, setPage] = useState<Page>("logs");
    const [info, setInfo] = useState<AppInfo | null>(null);
    const corners = useWindowCorners();
    const log = useVrchatLog();
    const auth = useAuth();
    const signedIn = auth.state === "loggedIn";

    useEffect(() => {
        void getAppInfo().then(setInfo, () => setInfo(null));
    }, []);

    // The host waits for this before pushing events; sending to a web view that is still loading
    // would abort it.
    useEffect(() => {
        const timer = window.setTimeout(() => Native.send({type: "app.ready"}), 200);
        return () => window.clearTimeout(timer);
    }, []);

    // The tray can ask for a page (for example "Settings") while the window is hidden.
    useEffect(() => {
        return Native.on((message) => {
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
                <Sidebar onNavigate={setPage} page={page} status={log.status}/>

                <Main>
                    <Header>
                        <HeaderText>
                            <h1>{t(title)}</h1>
                            <p>{t(subtitle)}</p>
                        </HeaderText>
                        <HeaderMeta>
                            {!signedIn && (
                                <SignInPill onClick={() => setPage("account")} type="button">
                                    {t("Not signed in · only the log is available")}
                                </SignInPill>
                            )}
                        </HeaderMeta>
                    </Header>

                    <Content $flush={page !== "settings"}>
                        {page === "logs"
                            ? <LogViewerPage log={log}/>
                            : page === "instance"
                                ? <InstancePage signedIn={signedIn} onSignIn={() => setPage("account")}/>
                                : page === "requests"
                                    ? <RequestsPage signedIn={signedIn} onSignIn={() => setPage("account")}/>
                                    : page === "operations"
                                        ? <OperationsPage/>
                                        : page === "account"
                                            ? <AccountPage/>
                                            : <SettingsPage info={info}/>}
                    </Content>

                    <Footer>
                        <span>{info ? `v${info.version} · ${info.platform}` : t("browser preview")}</span>
                    </Footer>
                </Main>
            </Shell>

            <ResizeHandles/>
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

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`;

const Content = styled.div<{ $flush: boolean }>`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding: ${({$flush}) => $flush ? "16px 26px 18px" : "22px 30px 30px"};
    overflow: ${({$flush}) => $flush ? "hidden" : "auto"};
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

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
