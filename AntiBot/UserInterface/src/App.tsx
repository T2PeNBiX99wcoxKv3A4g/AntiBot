import {useEffect, useState} from "react";
import styled from "styled-components";
import {Native} from "@photino-net-utils/bridge";
import {getAppInfo, type AppInfo} from "./api/system";
import {Sidebar} from "./components/Sidebar";
import {ResizeHandles} from "./components/ResizeHandles";
import {TitleBar} from "./components/TitleBar";
import {useVrchatLog} from "./hooks/useVrchatLog";
import {InstancePage} from "./pages/InstancePage";
import {LogViewerPage} from "./pages/LogViewerPage";
import {SettingsPage} from "./pages/SettingsPage";
import type {Page} from "./pages";

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
    logs: {title: "VRChat log", subtitle: "Live output of VRChat's log while it is running."},
    instance: {title: "Instance", subtitle: "Players in your VRChat instance, read from the local log."},
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
    const running = log.status.running;

    return (
        <Root>
            <TitleBar/>

            <Shell>
                <Sidebar onNavigate={setPage} page={page} status={log.status}/>

                <Main>
                    <Header>
                        <HeaderText>
                            <h1>{title}</h1>
                            <p>{subtitle}</p>
                        </HeaderText>
                        <HeaderMeta>
                            <StatusPill $active={running}>
                                <Dot $active={running}/>
                                {running ? "VRChat running" : "VRChat not running"}
                            </StatusPill>
                        </HeaderMeta>
                    </Header>

                    <Content $flush={page !== "settings"}>
                        {page === "logs"
                            ? <LogViewerPage log={log}/>
                            : page === "instance"
                                ? <InstancePage/>
                                : <SettingsPage info={info}/>}
                    </Content>

                    <Footer>
                        <span>{info ? `v${info.version} · ${info.platform}` : "browser preview"}</span>
                    </Footer>
                </Main>
            </Shell>

            <ResizeHandles/>
        </Root>
    );
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-primary);
`;

const Shell = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    background:
        radial-gradient(1100px 620px at 18% -10%, rgba(139, 92, 246, 0.12), transparent 60%),
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
