import {useEffect, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import {type DebugUserResult, closeVrchat, enableSafeMode, scoreUser, switchAvatar} from "../api/debug";
import {type OscStatus, oscStatus} from "../api/osc";

/** Debug builds only: the actions that are hard to trigger for real. */
export function DebugPage() {
    return (
        <Page>
            <CloseClient/>
            <SafeMode/>
            <SafeAvatar/>
            <UserCheck/>
        </Page>
    );
}

/** Asks the local client to quit, so the leave packet is sent the same way as a normal exit. */
function CloseClient() {
    const t = useTranslation();
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState("");
    const [failed, setFailed] = useState(false);

    const run = async () => {
        setBusy(true);
        setResult("");
        setFailed(false);

        try {
            const closed = await closeVrchat();
            setFailed(!closed);
            setResult(closed ? t("VRChat closed.") : t("VRChat did not close. Is it running?"));
        } catch (err) {
            setFailed(true);
            setResult(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card>
            <h2>{t("Close VRChat")}</h2>
            <p>{t("Asks VRChat to quit normally, so the client tells the instance it is leaving.")}</p>

            <Actions>
                <Primary disabled={busy} onClick={() => void run()} type="button">
                    {busy ? t("Working…") : t("Close VRChat")}
                </Primary>
            </Actions>

            {result && <Status $failed={failed}>{result}</Status>}
        </Card>
    );
}

function Row({label, value}: { label: string; value: string }) {
    return (
        <>
            <dt>{label}</dt>
            <dd>{value}</dd>
        </>
    );
}

/** Presses VRChat's panic button over OSC, which replaces every non-friend avatar at once. */
function SafeMode() {
    const t = useTranslation();
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState("");
    const [failed, setFailed] = useState(false);
    const [osc, setOsc] = useState<OscStatus | null>(null);

    const refresh = () => void oscStatus().then(setOsc, () => setOsc(null));

    useEffect(() => {
        refresh();
    }, []);

    const run = async () => {
        setBusy(true);
        setResult("");
        setFailed(false);

        try {
            const state = await enableSafeMode();
            setFailed(!state.ok);
            setResult(state.ok
                ? t("Safe Mode request sent.")
                : t("VRChat is not listening for OSC. Enable it in the Action Menu."));
            refresh();
        } catch (err) {
            setFailed(true);
            setResult(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card>
            <h2>{t("Safe Mode (OSC)")}</h2>
            <p>{t("Presses VRChat's panic button over OSC, which replaces every non-friend avatar at once. It is a toggle, so pressing it again turns Safe Mode off.")}</p>

            <Rows>
                <Row label={t("OSC")}
                     value={osc?.listening
                         ? t("Listening on port {port}", {port: osc.port})
                         : t("Not listening")}/>
                <Row label={t("Safe Mode")} value={osc?.safeMode ? t("On") : t("Off")}/>
            </Rows>

            <Actions>
                <Primary disabled={busy} onClick={() => void run()} type="button">
                    {busy ? t("Working…") : t("Safe Mode (OSC)")}
                </Primary>
            </Actions>

            {result && <Status $failed={failed}>{result}</Status>}
        </Card>
    );
}

/** Switches to the avatar id saved in the settings, over OSC. */
function SafeAvatar() {
    const t = useTranslation();
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState("");
    const [failed, setFailed] = useState(false);

    const run = async () => {
        setBusy(true);
        setResult("");
        setFailed(false);

        try {
            const state = await switchAvatar();
            setFailed(!state.ok);
            setResult(state.ok
                ? t("Avatar changed.")
                : state.already
                    ? t("Already wearing that avatar.")
                    : !state.configured
                        ? t("Set the avatar id in the settings first.")
                        : t("VRChat is not listening for OSC. Enable it in the Action Menu."));
        } catch (err) {
            setFailed(true);
            setResult(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card>
            <h2>{t("Switch avatar (OSC)")}</h2>
            <p>{t("Asks VRChat to wear the avatar id from the settings.")}</p>

            <Actions>
                <Primary disabled={busy} onClick={() => void run()} type="button">
                    {busy ? t("Working…") : t("Switch avatar (OSC)")}
                </Primary>
            </Actions>

            {result && <Status $failed={failed}>{result}</Status>}
        </Card>
    );
}

/** Scores any user id or profile link, so the rules can be tried without waiting for a bot. */
function UserCheck() {
    const t = useTranslation();
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<DebugUserResult | null>(null);

    const run = async () => {
        setBusy(true);
        setError("");
        setResult(null);

        try {
            setResult(await scoreUser(input));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card>
            <h2>{t("User check")}</h2>
            <p>{t("Paste a VRChat user id or a profile link to see how it would be scored.")}</p>

            <Form onSubmit={(event) => {
                event.preventDefault();
                void run();
            }}>
                <Input
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="usr_… or https://vrchat.com/home/user/usr_…"
                    value={input}
                />
                <Primary disabled={busy || input.trim().length === 0} type="submit">
                    {busy ? t("Checking…") : t("Check")}
                </Primary>
            </Form>

            {error && <ErrorText>{error}</ErrorText>}

            {result && (
                <Report>
                    <Threat $score={result.threat}>{result.threat}</Threat>
                    <Rows>
                        <Row label={t("Name")} value={result.displayName}/>
                        <Row label={t("User ID")} value={result.id}/>
                        <Row label={t("Rank")} value={result.trust ?? t("Unknown")}/>
                        <Row label={t("Joined")} value={result.dateJoined ?? t("Unknown")}/>
                        <Row label={t("Platform")} value={result.platform ?? t("Unknown")}/>
                        <Row label={t("Avatar")}
                             value={result.avatarName ?? (result.isRobot ? t("Robot (default)") : t("Unknown"))}/>
                    </Rows>
                    <Reasons>
                        {result.reasons.length > 0
                            ? result.reasons.map((reason) => (
                                <li key={reason.text}>
                                    {t(reason.text, reason.detail ? {days: reason.detail} : undefined)}
                                    <Weight $up={reason.weight > 0}>
                                        {reason.weight > 0 ? `+${reason.weight}` : reason.weight}
                                    </Weight>
                                </li>
                            ))
                            : <li>{t("No signal matched.")}</li>}
                    </Reasons>
                </Report>
            )}
        </Card>
    );
}

const Page = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: 720px;
    overflow: auto;
`;

const Card = styled.section`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        font-size: 12px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Status = styled.p<{ $failed: boolean }>`
    font-family: var(--font-mono);
    font-size: 11px;
    color: ${({$failed}) => $failed ? "#f87171" : "#4ade80"};
`;

const Input = styled.input`
    flex: 1;
    min-width: 0;
    padding: 9px 11px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font: inherit;
    font-family: var(--font-mono);
    font-size: 12px;

    &:focus {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`;

const Primary = styled.button`
    padding: 8px 14px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: var(--accent-primary);
    color: #0b0714;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

const ErrorText = styled.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: #f87171;
`;

const Report = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`;

const Threat = styled.strong<{ $score: number }>`
    font-family: var(--font-mono);
    font-size: 26px;
    font-weight: 600;
    color: ${({$score}) => $score >= 70 ? "#f87171" : $score >= 40 ? "#fbbf24" : "#4ade80"};
`;

const Rows = styled.dl`
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 4px 12px;
    margin: 0;

    dt {
        font-size: 11px;
        color: var(--text-muted);
    }

    dd {
        margin: 0;
        overflow: hidden;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--text-secondary);
        text-overflow: ellipsis;
    }
`;

const Reasons = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin: 0;
    padding-left: 16px;
    font-size: 11px;
    color: var(--text-secondary);
`;

const Weight = styled.b<{ $up: boolean }>`
    margin-left: 6px;
    color: ${({$up}) => $up ? "#fca5a5" : "#86efac"};
`;
