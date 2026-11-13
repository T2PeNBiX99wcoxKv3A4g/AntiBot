import {useEffect, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import {closeVrchat, type DebugUserResult, enableSafeMode, scoreUser, switchAvatar} from "../api/debug";
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
            setResult(closed ? t("vr_chat_closed") : t("vr_chat_did_not_close_is_it_running"));
        } catch (err) {
            setFailed(true);
            setResult(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card>
            <h2>{t("close_vr_chat")}</h2>
            <p>{t("asks_vr_chat_to_quit_normally_so_the_client_tells_the_instance_it_is_leaving")}</p>

            <Actions>
                <Primary disabled={busy} onClick={() => void run()} type="button">
                    {busy ? t("working") : t("close_vr_chat")}
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
                ? t("safe_mode_request_sent")
                : t("vr_chat_is_not_listening_for_osc_enable_it_in_the_action_menu"));
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
            <h2>{t("safe_mode_osc")}</h2>
            <p>{t("presses_vr_chat_s_panic_button_over_osc_which_replaces_every_non_friend_avatar_at_once")}</p>

            <Rows>
                <Row label={t("osc")}
                     value={osc?.listening
                         ? t("listening_on_port_port", {port: osc.port})
                         : t("not_listening")}/>
            </Rows>

            <Actions>
                <Primary disabled={busy} onClick={() => void run()} type="button">
                    {busy ? t("working") : t("safe_mode_osc")}
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
                ? t("avatar_changed")
                : state.already
                    ? t("already_wearing_that_avatar")
                    : !state.configured
                        ? t("set_the_avatar_id_in_the_settings_first")
                        : t("vr_chat_is_not_listening_for_osc_enable_it_in_the_action_menu"));
        } catch (err) {
            setFailed(true);
            setResult(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card>
            <h2>{t("switch_avatar_osc")}</h2>
            <p>{t("asks_vr_chat_to_wear_the_avatar_id_from_the_settings")}</p>

            <Actions>
                <Primary disabled={busy} onClick={() => void run()} type="button">
                    {busy ? t("working") : t("switch_avatar_osc")}
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
            <h2>{t("user_check")}</h2>
            <p>{t("paste_a_vr_chat_user_id_or_a_profile_link_to_see_how_it_would_be_scored")}</p>

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
                    {busy ? t("checking") : t("check")}
                </Primary>
            </Form>

            {error && <ErrorText>{error}</ErrorText>}

            {result && (
                <Report>
                    <Threat $score={result.threat}>{result.threat}</Threat>
                    <Rows>
                        <Row label={t("name")} value={result.displayName}/>
                        <Row label={t("user_id")} value={result.id}/>
                        <Row label={t("rank")} value={result.trust ?? t("unknown")}/>
                        <Row label={t("joined")} value={result.dateJoined ?? t("unknown")}/>
                        <Row label={t("platform")} value={result.platform ?? t("unknown")}/>
                        <Row label={t("avatar")}
                             value={result.avatarName ?? (result.isRobot ? t("robot_default") : t("unknown"))}/>
                    </Rows>
                    <Reasons>
                        {result.reasons.length > 0
                            ? result.reasons.map((reason) => (
                                <li key={reason.text}>
                                    {t(reason.text, reason.detail ? {
                                        days: reason.detail,
                                        years: Math.floor(Number(reason.detail) / 365)
                                    } : undefined)}
                                    <Weight $up={reason.weight > 0}>
                                        {reason.weight > 0 ? `+${reason.weight}` : reason.weight}
                                    </Weight>
                                </li>
                            ))
                            : <li>{t("no_signal_matched")}</li>}
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
