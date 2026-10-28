import {useEffect, useState} from "react";
import styled from "styled-components";
import {getGuardStatus, idleStatus, type GuardStatus} from "./api/guard";
import {getAppInfo, type AppInfo} from "./api/system";
import {InfoIcon, PulseIcon, ShieldIcon} from "./components/Icons";
import {Sidebar} from "./components/Sidebar";
import type {Page} from "./pages";

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
    overview: {title: "Overview", subtitle: "What AntiBot is meant to catch, and how it will work."},
    signals: {title: "Signals", subtitle: "Evidence sources planned for account classification."},
    settings: {title: "Settings", subtitle: "Configuration will be enabled with the pipeline."},
};

const pipeline = [
    {title: "Observe", text: "Follow the local VRChat log for joins, leaves and session activity."},
    {title: "Classify", text: "Score accounts from configurable signals, with visible evidence."},
    {title: "Review", text: "Present confidence and context instead of a black-box verdict."},
    {title: "Act", text: "Alert locally, keep history, or prepare a report when the user decides."},
];

const signals = [
    {title: "Account age", text: "New accounts with an otherwise impossible activity history."},
    {title: "Join cadence", text: "Repeated joins across worlds in a suspiciously short window."},
    {title: "Session behaviour", text: "Movement, idle time and interaction patterns that look automated."},
    {title: "Profile traits", text: "Avatar and profile combinations repeatedly seen on reported accounts."},
    {title: "Group history", text: "Membership patterns that correlate with known bot networks."},
    {title: "Report history", text: "Local reports the user has already collected for an account."},
];

export default function App() {
    const [page, setPage] = useState<Page>("overview");
    const [info, setInfo] = useState<AppInfo | null>(null);
    const [guard, setGuard] = useState<GuardStatus>(idleStatus);

    useEffect(() => {
        void getAppInfo().then(setInfo, () => setInfo(null));
        void getGuardStatus().then(setGuard, () => setGuard(idleStatus));
    }, []);

    const {title, subtitle} = pageTitles[page];

    return (
        <Shell>
            <Sidebar page={page} onNavigate={setPage} state={guard.state}/>

            <Main>
                <Header>
                    <HeaderText>
                        <Eyebrow>VRChat / anti-bot</Eyebrow>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </HeaderText>
                    <HeaderMeta>
                        <StatusPill $active={guard.monitoring}>
                            <Dot $active={guard.monitoring}/>
                            {guard.monitoring ? "monitoring" : guard.state}
                        </StatusPill>
                        <ScaffoldBadge>scaffold</ScaffoldBadge>
                    </HeaderMeta>
                </Header>

                <Content>
                    <Notice>
                        <InfoIcon/>
                        <span>
                            This build is a scaffold. The shell, tray and native bridge work, but no
                            VRChat data is read and no account is classified or blocked.
                        </span>
                    </Notice>

                    {page === "overview" && <OverviewPage guard={guard}/>}
                    {page === "signals" && <SignalsPage/>}
                    {page === "settings" && <SettingsPage/>}
                </Content>

                <Footer>
                    <span>{info ? `v${info.version} · ${info.platform}` : "browser preview"}</span>
                    <span>Detection pipeline: not connected</span>
                </Footer>
            </Main>
        </Shell>
    );
}

function OverviewPage({guard}: { guard: GuardStatus }) {
    return (
        <Stack>
            <Hero>
                <HeroMark><ShieldIcon size={30}/></HeroMark>
                <div>
                    <HeroTitle>Automated accounts, made visible.</HeroTitle>
                    <HeroText>
                        AntiBot is a local review layer for VRChat sessions. It will collect evidence
                        around suspicious accounts and leave the decision to you — no automatic
                        moderation, no black-box bans.
                    </HeroText>
                    <HeroActions>
                        <PrimaryButton disabled type="button">
                            <PulseIcon/>
                            Start monitoring
                        </PrimaryButton>
                        <DisabledHint>Detection is not implemented yet</DisabledHint>
                    </HeroActions>
                </div>
            </Hero>

            <StatGrid>
                <StatCard>
                    <StatLabel>Observed accounts</StatLabel>
                    <StatValue>{guard.observed}</StatValue>
                    <StatHint>No session data yet</StatHint>
                </StatCard>
                <StatCard>
                    <StatLabel>Flagged accounts</StatLabel>
                    <StatValue>{guard.flagged}</StatValue>
                    <StatHint>Nothing to review yet</StatHint>
                </StatCard>
                <StatCard>
                    <StatLabel>Guard state</StatLabel>
                    <StatValue $mono>{guard.state}</StatValue>
                    <StatHint>{guard.monitoring ? "Collecting signals" : "Idle by design"}</StatHint>
                </StatCard>
            </StatGrid>

            <Section>
                <SectionHeader>
                    <h2>Planned pipeline</h2>
                    <span>design only</span>
                </SectionHeader>
                <Steps>
                    {pipeline.map((step, index) => (
                        <Step key={step.title}>
                            <StepIndex>{String(index + 1).padStart(2, "0")}</StepIndex>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </Step>
                    ))}
                </Steps>
            </Section>

            <Section>
                <SectionHeader>
                    <h2>Signals on the roadmap</h2>
                    <span>configurable later</span>
                </SectionHeader>
                <Chips>
                    {signals.map((signal) => <Chip key={signal.title}>{signal.title}</Chip>)}
                </Chips>
            </Section>
        </Stack>
    );
}

function SignalsPage() {
    return (
        <Stack>
            <Section>
                <SectionHeader>
                    <h2>Detection signals</h2>
                    <span>planned</span>
                </SectionHeader>
                <SignalGrid>
                    {signals.map((signal) => (
                        <SignalCard key={signal.title}>
                            <SignalTop>
                                <h3>{signal.title}</h3>
                                <PlannedTag>planned</PlannedTag>
                            </SignalTop>
                            <p>{signal.text}</p>
                        </SignalCard>
                    ))}
                </SignalGrid>
            </Section>

            <Callout>
                <InfoIcon/>
                <div>
                    <strong>No signal is active yet.</strong>
                    <p>
                        The list above is the intended evidence set. Each source needs its own data
                        access, weighting and review flow before it can influence a result.
                    </p>
                </div>
            </Callout>
        </Stack>
    );
}

function SettingsPage() {
    return (
        <Stack>
            <Section>
                <SectionHeader>
                    <h2>Configuration</h2>
                    <span>disabled in the scaffold</span>
                </SectionHeader>
                <FormCard>
                    <Field>
                        <label htmlFor="log-directory">VRChat log directory</label>
                        <input disabled id="log-directory" placeholder="Not configured"/>
                        <small>Used later to follow join, leave and session events.</small>
                    </Field>
                    <Field>
                        <label htmlFor="threshold">Flag threshold</label>
                        <input disabled id="threshold" placeholder="—"/>
                        <small>How much evidence is required before an account is surfaced.</small>
                    </Field>
                    <Field>
                        <label htmlFor="action">Action on match</label>
                        <select disabled id="action">
                            <option>Review only</option>
                        </select>
                        <small>Actions remain manual until the detection pipeline exists.</small>
                    </Field>
                </FormCard>
            </Section>

            <Callout>
                <InfoIcon/>
                <div>
                    <strong>Settings are placeholders.</strong>
                    <p>
                        They are intentionally disabled so the scaffold cannot pretend to protect an
                        instance. Persistence and validation arrive with the first real detector.
                    </p>
                </div>
            </Callout>
        </Stack>
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
    padding: 28px 34px 20px;
    border-bottom: 1px solid var(--border-color);
`;

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    h1 {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 13px;
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
    text-transform: capitalize;
    color: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-secondary)"};
`;

const Dot = styled.span<{ $active: boolean }>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-muted)"};
    box-shadow: ${({$active}) => $active ? "0 0 8px var(--accent-primary)" : "none"};
`;

const ScaffoldBadge = styled.span`
    padding: 6px 10px;
    border: 1px dashed var(--border-color);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;

const Content = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 22px 34px 34px;
`;

const Notice = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 18px;
    padding: 12px 14px;
    border: 1px solid rgba(34, 211, 238, 0.18);
    border-radius: var(--radius-md);
    background: rgba(34, 211, 238, 0.05);
    color: var(--text-secondary);
    font-size: 12px;
    line-height: 1.55;

    svg {
        flex-shrink: 0;
        margin-top: 1px;
        color: var(--accent-primary);
    }
`;

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const Hero = styled.section`
    display: flex;
    gap: 18px;
    padding: 24px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    background:
        linear-gradient(135deg, rgba(34, 211, 238, 0.07), rgba(99, 102, 241, 0.06)),
        var(--bg-card);
`;

const HeroMark = styled.div`
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 15px;
    color: var(--accent-primary);
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.2);
`;

const HeroTitle = styled.h2`
    margin-bottom: 6px;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
`;

const HeroText = styled.p`
    max-width: 720px;
    font-size: 13px;
    line-height: 1.65;
    color: var(--text-secondary);
`;

const HeroActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
`;

const PrimaryButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--accent-gradient);
    color: #041016;
    font: inherit;
    font-size: 12px;
    font-weight: 600;

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`;

const DisabledHint = styled.span`
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
`;

const StatCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const StatLabel = styled.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

const StatValue = styled.span<{ $mono?: boolean }>`
    font-family: ${({$mono}) => $mono ? "var(--font-mono)" : "var(--font-sans)"};
    font-size: ${({$mono}) => $mono ? "20px" : "28px"};
    font-weight: 600;
    letter-spacing: -0.02em;
    text-transform: ${({$mono}) => $mono ? "capitalize" : "none"};
`;

const StatHint = styled.span`
    font-size: 11px;
    color: var(--text-muted);
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;

    h2 {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.01em;
    }

    span {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-muted);
    }
`;

const Steps = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
`;

const Step = styled.div`
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);

    h3 {
        margin: 8px 0 4px;
        font-size: 12px;
        font-weight: 600;
    }

    p {
        font-size: 11px;
        line-height: 1.55;
        color: var(--text-muted);
    }
`;

const StepIndex = styled.span`
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-primary);
`;

const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

const Chip = styled.span`
    padding: 5px 9px;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background: var(--bg-card);
    font-size: 11px;
    color: var(--text-secondary);
`;

const SignalGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
`;

const SignalCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);

    p {
        font-size: 12px;
        line-height: 1.55;
        color: var(--text-muted);
    }
`;

const SignalTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    h3 {
        font-size: 13px;
        font-weight: 600;
    }
`;

const PlannedTag = styled.span`
    padding: 3px 7px;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.12);
    font-family: var(--font-mono);
    font-size: 9px;
    color: #a5b4fc;
`;

const Callout = styled.div`
    display: flex;
    gap: 10px;
    padding: 16px;
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-secondary);

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    strong {
        display: block;
        margin-bottom: 3px;
        font-size: 12px;
        color: var(--text-primary);
    }

    p {
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-muted);
    }
`;

const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 620px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
        font-size: 11px;
        font-weight: 600;
        color: var(--text-secondary);
    }

    input,
    select {
        padding: 9px 10px;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        background: var(--bg-input);
        color: var(--text-muted);
        font: inherit;
        font-size: 12px;
    }

    small {
        font-size: 10px;
        color: var(--text-muted);
    }
`;

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 34px;
    border-top: 1px solid var(--border-color);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;
