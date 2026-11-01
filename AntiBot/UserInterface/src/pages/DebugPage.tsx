import {useState} from "react";
import styled from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import {type DebugUserResult, returnHome, scoreUser} from "../api/debug";

/** Debug builds only: actions that are hard to trigger for real, such as going home. */
export function DebugPage() {
    const t = useTranslation();
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState("");
    const [failed, setFailed] = useState(false);

    const run = async () => {
        setBusy(true);
        setResult("");
        setFailed(false);

        try {
            const returned = await returnHome();
            setFailed(!returned);
            setResult(returned
                ? t("The home invite was sent.")
                : t("The home invite could not be sent. Check the connection and the sign-in."));
        } catch (err) {
            setFailed(true);
            setResult(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Page>
            <Card>
                <h2>{t("Debug tools")}</h2>
                <p>{t("Only a debug build shows this page.")}</p>

                <Actions>
                    <Primary disabled={busy} onClick={() => void run()} type="button">
                        {busy ? t("Working…") : t("Return home (test)")}
                    </Primary>
                </Actions>

                {result && <Result $failed={failed}>{result}</Result>}
            </Card>

            <UserCheck/>
        </Page>
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

            {error && <Result $failed>{error}</Result>}

            {result && (
                <Report>
                    <Threat $score={result.threat}>{result.threat}%</Threat>
                    <Rows>
                        <Row label={t("Name")} value={result.displayName}/>
                        <Row label={t("User ID")} value={result.id}/>
                        <Row label={t("Rank")} value={result.trust ?? t("Unknown")}/>
                        <Row label={t("Joined")} value={result.dateJoined ?? t("Unknown")}/>
                        <Row label={t("Platform")} value={result.platform ?? t("Unknown")}/>
                        <Row label={t("Avatar")} value={result.avatarName ?? (result.isRobot ? t("Robot (default)") : t("Unknown"))}/>
                    </Rows>
                    <Reasons>
                        {result.reasons.length > 0
                            ? result.reasons.map((reason) => <li key={reason}>{reason}</li>)
                            : <li>{t("No signal matched.")}</li>}
                    </Reasons>
                </Report>
            )}
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

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
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

const Result = styled.p<{ $failed?: boolean }>`
    font-family: var(--font-mono);
    font-size: 11px;
    color: ${({$failed}) => $failed ? "#f87171" : "#4ade80"};
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
