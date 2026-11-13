import {useEffect, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "../api/i18n";
import type {LocalizationKey} from "@photino-net-utils/bridge";
import {
    type BatchFinished,
    getBatchState,
    onBatchFinished,
    onBatchProgress,
    parseLinks,
    startBatch,
    stopBatch,
} from "../api/batch";
import type {InstanceUser} from "../api/instance";
import {AlertIcon, BatchIcon} from "../components/Icons";
import {PlayerDialog, userGridColumns, UserRow} from "./InstancePage";

/** Apply the configured moderation actions to a pasted list of VRChat links. */
export function BatchPage({signedIn, onSignIn}: { signedIn: boolean; onSignIn: () => void }) {
    const t = useTranslation();
    const [text, setText] = useState("");
    const [users, setUsers] = useState<InstanceUser[]>([]);
    const [invalid, setInvalid] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [parsing, setParsing] = useState(false);
    const [stopping, setStopping] = useState(false);
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(0);
    const [total, setTotal] = useState(0);
    const [failed, setFailed] = useState(0);
    const [actions, setActions] = useState<LocalizationKey[]>([]);
    const [finished, setFinished] = useState<BatchFinished | null>(null);
    const [selected, setSelected] = useState<InstanceUser | null>(null);
    const now = Date.now();

    useEffect(() => {
        let cancelled = false;

        void getBatchState().then((state) => {
            if (cancelled) return;

            setRunning(state.running);
            setDone(state.done);
            setTotal(state.total);
            setFailed(state.failed);
            setActions(state.actions ?? []);

            if (!state.running && state.total > 0)
                setFinished({
                    cancelled: state.cancelled,
                    done: state.done,
                    total: state.total,
                    failed: state.failed,
                    error: state.error,
                    outcomes: state.outcomes ?? [],
                });
        }, () => {
            // The host failed to answer; the page still works from the events.
        });

        const offProgress = onBatchProgress((progress) => {
            setRunning(progress.running);
            setDone(progress.done);
            setTotal(progress.total);
            setFailed(progress.failed);
        });

        const offFinished = onBatchFinished((result) => {
            setRunning(false);
            setStopping(false);
            setDone(result.done);
            setTotal(result.total);
            setFailed(result.failed);
            setFinished(result);
        });

        return () => {
            cancelled = true;
            offProgress();
            offFinished();
        };
    }, []);

    const parse = async () => {
        setParsing(true);
        setError("");
        setFinished(null);
        setUsers([]);
        setInvalid([]);
        setDone(0);
        setTotal(0);
        setFailed(0);
        setActions([]);

        try {
            const preview = await parseLinks(text);
            setUsers(preview.users);
            setInvalid(preview.invalid);

            if (preview.error)
                setError(preview.error);
            else if (preview.users.length === 0)
                setError(t("No valid user links were found."));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        } finally {
            setParsing(false);
        }
    };

    const run = async () => {
        setError("");
        setFinished(null);

        try {
            const start = await startBatch(users.map((user) => user.userId));

            if (!start.started) {
                setError(start.error ?? "");
                return;
            }

            setRunning(true);
            setDone(0);
            setTotal(start.total);
            setFailed(0);
            setActions(start.actions ?? []);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        }
    };

    const stop = async () => {
        setStopping(true);

        try {
            await stopBatch();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
            setStopping(false);
        }
    };

    const percent = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

    return (
        <Page>
            {!signedIn && (
                <Notice>
                    <NoticeText>
                        <strong>{t("Not signed in")}</strong>
                        <span>{t("Sign in first.")}</span>
                    </NoticeText>
                    <NoticeButton onClick={onSignIn} type="button">{t("Sign in")}</NoticeButton>
                </Notice>
            )}

            <Card>
                <CardHead>
                    <BatchIcon size={20}/>
                    <div>
                        <h2>{t("Batch actions")}</h2>
                        <p>{t("Apply the moderation actions enabled under Automatic protection to a list of VRChat users.")}</p>
                    </div>
                </CardHead>

                <TextArea
                    disabled={parsing || running}
                    onChange={(event) => {
                        setText(event.target.value);
                        setUsers([]);
                        setInvalid([]);
                        setFinished(null);
                        setError("");
                    }}
                    placeholder={"https://vrchat.com/home/user/usr_…\nusr_…"}
                    spellCheck={false}
                    value={text}
                />

                <Actions>
                    <Primary
                        disabled={parsing || running || text.trim().length === 0 || !signedIn}
                        onClick={() => void parse()}
                        type="button"
                    >
                        {parsing ? t("Parsing…") : t("Parse links")}
                    </Primary>
                    <Secondary
                        disabled={running || parsing || users.length === 0 || !signedIn}
                        onClick={() => void run()}
                        type="button"
                    >
                        {t("Batch block")}
                    </Secondary>
                    {running && (
                        <Secondary disabled={stopping} onClick={() => void stop()} type="button">
                            {t("Stop")}
                        </Secondary>
                    )}
                    <Hint>{t("Actions follow the switches under Automatic protection.")}</Hint>
                </Actions>

                {error && <ErrorText>{error}</ErrorText>}
            </Card>

            {invalid.length > 0 && (
                <Card>
                    <CardHead>
                        <AlertIcon size={18}/>
                        <div>
                            <h2>{t("Invalid lines")}</h2>
                            <p>{t("These lines did not contain a user link.")}</p>
                        </div>
                    </CardHead>
                    <InvalidList>
                        {invalid.map((line, index) => (
                            <li key={`${index}-${line}`} title={line}>{line}</li>
                        ))}
                    </InvalidList>
                </Card>
            )}

            {(running || total > 0) && (
                <Card>
                    <ProgressHead>
                        <span>{t("Progress")}</span>
                        <span>
                            {done} / {total}
                            {failed > 0 && ` · ${failed} ${t("Failed")}`}
                        </span>
                    </ProgressHead>
                    <Bar>
                        <Fill $percent={percent}/>
                    </Bar>
                    <ProgressMeta>
                        {actions.length > 0 && <span>{actions.map((action) => t(action)).join(" · ")}</span>}
                        {finished && !running && (
                            <span>
                                {finished.cancelled ? t("Stopped") : t("Done")}
                                {finished.error && ` · ${finished.error}`}
                            </span>
                        )}
                    </ProgressMeta>
                </Card>
            )}

            {users.length > 0 && (
                <ListCard>
                    <ListHeader>
                        <span/>
                        <span>{t("User")}</span>
                        <span>{t("Trust")}</span>
                        <span>{t("Pronouns")}</span>
                        <span>{t("Status")}</span>
                        <span>{t("Platform")}</span>
                    </ListHeader>

                    <Rows>
                        {users.map((user) => (
                            <UserRow key={user.userId} now={now} onSelect={setSelected} showTime={false} user={user}/>
                        ))}
                    </Rows>
                </ListCard>
            )}

            {selected && <PlayerDialog now={now} onClose={() => setSelected(null)} user={selected}/>}
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`;

const Card = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const CardHead = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        margin-top: 3px;
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 132px;
    padding: 10px 12px;
    resize: vertical;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.6;

    &:focus {
        outline: none;
        border-color: var(--border-color-focus);
    }

    &:disabled {
        opacity: 0.55;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
`;

const Hint = styled.span`
    font-size: 11px;
    color: var(--text-muted);
`;

const ErrorText = styled.p`
    font-size: 11px;
    line-height: 1.5;
    color: #f87171;
`;

const InvalidList = styled.ul`
    max-height: 130px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);

    li {
        overflow: hidden;
        padding: 3px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const ProgressHead = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`;

const Bar = styled.div`
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
`;

const Fill = styled.div<{ $percent: number }>`
    width: ${({$percent}) => `${$percent}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.7), var(--accent-primary));
    transition: width 220ms ease;
`;

const ProgressMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    font-size: 11px;
    color: var(--text-muted);
`;

const ListCard = styled.section`
    display: flex;
    flex-direction: column;
    max-height: 48vh;
    min-height: 140px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const ListHeader = styled.div`
    display: grid;
    grid-template-columns: ${userGridColumns(false)};
    gap: 8px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    span {
        white-space: nowrap;
    }
`;

const Rows = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`;

const NoticeText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    strong {
        font-size: 12px;
        color: #fbbf24;
    }

    span {
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`;

const NoticeButton = styled.button`
    flex-shrink: 0;
    padding: 7px 12px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font: inherit;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`;

const buttonBase = styled.button<{ $primary?: boolean }>`
    padding: 8px 14px;
    border: 1px solid ${({$primary}) => $primary ? "transparent" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$primary}) => $primary ? "var(--accent-primary)" : "transparent"};
    color: ${({$primary}) => $primary ? "#0b0714" : "var(--text-primary)"};
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background: ${({$primary}) => $primary ? "var(--accent-primary)" : "var(--bg-card-hover)"};
    }
`;

const Primary = styled(buttonBase).attrs({$primary: true})``;
const Secondary = styled(buttonBase).attrs({$primary: false})``;
