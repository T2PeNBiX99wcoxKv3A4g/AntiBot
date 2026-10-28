import {useEffect, useState} from "react";
import styled from "styled-components";
import {Native} from "@photino-net-utils/bridge";
import {fileName} from "./api/logs";
import {getAppInfo, type AppInfo} from "./api/system";
import {Sidebar} from "./components/Sidebar";
import {useVrchatLog} from "./hooks/useVrchatLog";
import {LogViewerPage} from "./pages/LogViewerPage";
import {SettingsPage} from "./pages/SettingsPage";
import type {Page} from "./pages";

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
    logs: {title: "VRChat log", subtitle: "Live output of the newest VRChat session log."},
    settings: {title: "Settings", subtitle: "Where the log comes from, and what AntiBot does with it."},
};

export default function App() {
    const [page, setPage] = useState<Page>("logs");
    const [info, setInfo] = useState<AppInfo | null>(null);
    const log = useVrchatLog();

    useEffect(() => {
        void getAppInfo().then(setInfo, () => setInfo(null));
    }, []);

    // The host waits for this before pushing events; sending to a web view that is still loading
    // would abort it.
    useEffect(() => {
        const timer = window.setTimeout(() => Native.send({type: "app.ready"}), 200);
        return () => window.clearTimeout(timer);
    }, []);

    const {title, subtitle} = pageMeta[page];
    const file = fileName(log.status.file);

    return (
        <Shell>
            <Sidebar onNavigate={setPage} page={page} status={log.status}/>

            <Main>
                <Header>
                    <HeaderText>
                        <Eyebrow>VRChat / anti-bot</Eyebrow>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </HeaderText>
                    <HeaderMeta>
                        <StatusPill $active={file !== null}>
                            <Dot $active={file !== null}/>
                            {file ? "following" : "waiting for VRChat"}
                        </StatusPill>
                    </HeaderMeta>
                </Header>

                <Content $flush={page === "logs"}>
                    {page === "logs"
                        ? <LogViewerPage log={log}/>
                        : <SettingsPage info={info} status={log.status}/>}
                </Content>

                <Footer>
                    <span>{info ? `v${info.version} · ${info.platform}` : "browser preview"}</span>
                    <span>{file ? `log: ${file}` : "no VRChat log found yet"}</span>
                </Footer>
            </Main>
        </Shell>
    );
}

const Shell = styled.div`
    display: flex;
    height: 100%;
    background:
        radial-gradient(1100px 620px at 18% -10%, rgba(34, 211, 238, 0.08), transparent 60%),
        radial-gradient(900px 500px at 110% 15%, rgba(99, 102, 241, 0.1), transparent 55%),
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

const Eyebrow = styled.span`
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-primary);
`;

const HeaderMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
`;

const StatusPill = styled.span<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 10px;
    border: 1px solid ${({$active}) => $active ? "var(--border-color-hover)" : "var(--border-color)"};
    border-radius: 999px;
    background: var(--bg-card);
    font-family: var(--font-mono);
    font-size: 10px;
    color: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-secondary)"};
    white-space: nowrap;
`;

const Dot = styled.span<{ $active: boolean }>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-muted)"};
    box-shadow: ${({$active}) => $active ? "0 0 8px var(--accent-primary)" : "none"};
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
    justify-content: space-between;
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
