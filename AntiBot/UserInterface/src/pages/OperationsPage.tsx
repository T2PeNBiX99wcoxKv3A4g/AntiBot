import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useLocale, useTranslation} from "@photino-net-utils/bridge";
import {type OperationEntry, clearOperations, getOperations, onOperationsChanged, undoOperation} from "../api/operations";
import {type InstanceUser, describeUser} from "../api/instance";
import {openUrl} from "../api/system";
import {ExternalIcon} from "../components/Icons";
import {PlayerDialog} from "./InstancePage";

/** Every automatic action AntiBot took, newest first. */
export function OperationsPage() {
    const t = useTranslation();
    const locale = useLocale();
    const [entries, setEntries] = useState<OperationEntry[]>([]);
    const [selected, setSelected] = useState<InstanceUser | null>(null);
    const [confirming, setConfirming] = useState(false);
    const [undoing, setUndoing] = useState<number | null>(null);
    const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
    const received = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onOperationsChanged((next) => {
            if (cancelled) return;

            received.current = true;
            setEntries(next);
        });

        void getOperations().then((next) => {
            if (!cancelled && !received.current) setEntries(next);
        }, () => {
            // The host failed to answer; the empty state already covers it.
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const clear = () => {
        if (!confirming) {
            setConfirming(true);
            return;
        }

        setConfirming(false);
        void clearOperations().then(() => setEntries([]), () => {
            // The host failed to answer; the next snapshot will show the real state.
        });
    };

    const openUser = (entry: OperationEntry) => {
        if (entry.userId.length === 0) return;

        void describeUser(entry.userId, entry.displayName).then(setSelected, () => {
            // The host failed to answer; the row still shows the stored name.
        });
    };

    const undo = (entry: OperationEntry) => {
        setUndoing(entry.id);

        void undoOperation(entry.id).then((result) => {
            setNotice({ok: result.ok, text: result.message});
        }, () => {
            setNotice({ok: false, text: t("The host did not answer.")});
        }).finally(() => {
            setUndoing(null);
            window.setTimeout(() => setNotice(null), 6000);
        });
    };

    return (
        <Page>
            <Card>
                <Head>
                    <div>
                        <h2>{t("Operation history")}</h2>
                        <p>{t("Every block, chat-box mute and avatar-interaction change, as it happened.")}</p>
                    </div>
                    <HeadActions>
                        <Count>{t("{count} action(s)", {count: entries.length})}</Count>
                        <ClearButton
                            $confirming={confirming}
                            disabled={entries.length === 0}
                            onBlur={() => setConfirming(false)}
                            onClick={clear}
                            type="button"
                        >
                            {confirming ? t("Confirm clear") : t("Clear history")}
                        </ClearButton>
                    </HeadActions>
                </Head>

                {notice && <Notice $ok={notice.ok}>{notice.text}</Notice>}

                <List>
                    {entries.length === 0 ? (
                        <Empty>{t("AntiBot has not taken an automatic action yet.")}</Empty>
                    ) : entries.map((entry) => (
                        <Item key={entry.id} onClick={() => openUser(entry)}>
                            <Avatar $src={entry.avatarUrl}/>
                            <Time>{formatTime(entry.at, locale)}</Time>
                            <Kind $kind={entry.kind}>{t(kindKey(entry.kind))}</Kind>
                            <Who>{entry.displayName || t("Unknown user")}</Who>
                            <Detail title={entry.detail}>{entry.detail}</Detail>
                            <Actions>
                                {canUndo(entry) && (
                                    <UndoButton
                                        disabled={undoing === entry.id}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            undo(entry);
                                        }}
                                        type="button"
                                    >
                                        {undoing === entry.id ? t("Undoing…") : t("Undo")}
                                    </UndoButton>
                                )}
                                <ProfileButton
                                    disabled={entry.userId.length === 0}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        void openUrl(`https://vrchat.com/home/user/${entry.userId}`);
                                    }}
                                    title={t("Open the VRChat profile")}
                                    type="button"
                                >
                                    <ExternalIcon size={11}/>
                                    {t("Profile")}
                                </ProfileButton>
                            </Actions>
                        </Item>
                    ))}
                </List>
            </Card>

            {selected && <PlayerDialog user={selected} now={Date.now()} onClose={() => setSelected(null)}/>}
        </Page>
    );
}

function formatTime(at: number, locale: string): string {
    return new Date(at).toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

/** The English label is also the translation key. */
function kindKey(kind: string): string {
    switch (kind) {
        case "block":
            return "Blocked";
        case "avatarInteractionOff":
            return "Avatar interactions off";
        case "chatBoxHidden":
            return "Chat box hidden";
        case "closeVrchat":
            return "Closed VRChat";
        case "safeMode":
            return "Safe Mode on";
        case "returnHome":
            return "Returned home";
        case "rejectRequest":
            return "Request rejected";
        case "undoReject":
            return "Rejection undone";
        case "unblock":
            return "Unblocked";
        case "avatarInteractionOn":
            return "Avatar interactions on";
        case "chatBoxShown":
            return "Chat box shown";
        default:
            return kind;
    }
}

function canUndo(entry: OperationEntry): boolean {
    if (entry.undone) return false;

    return entry.kind === "block" || entry.kind === "avatarInteractionOff" || entry.kind === "chatBoxHidden";
}

/** Undo/restore actions are good news; keep the automatic actions themselves red. */
function kindColor(kind: string): string {
    switch (kind) {
        case "unblock":
        case "avatarInteractionOn":
        case "chatBoxShown":
        case "undoReject":
            return "#4ade80";
        default:
            return "#fb7185";
    }
}

const Page = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`;

const Card = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const Head = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-color);

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        margin-top: 2px;
        font-size: 11px;
        color: var(--text-secondary);
    }
`;

const Count = styled.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`;

const HeadActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
`;

const ClearButton = styled.button<{ $confirming: boolean }>`
    padding: 5px 10px;
    border: 1px solid ${({$confirming}) => $confirming ? "rgba(251, 113, 133, 0.6)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$confirming}) => $confirming ? "rgba(251, 113, 133, 0.12)" : "transparent"};
    color: ${({$confirming}) => $confirming ? "#fb7185" : "var(--text-secondary)"};
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`;

const Notice = styled.div<{ $ok: boolean }>`
    margin: 10px 16px 0;
    padding: 8px 12px;
    border: 1px solid ${({$ok}) => $ok ? "rgba(74, 222, 128, 0.45)" : "rgba(251, 113, 133, 0.45)"};
    border-radius: var(--radius-sm);
    background: ${({$ok}) => $ok ? "rgba(74, 222, 128, 0.1)" : "rgba(251, 113, 133, 0.1)"};
    color: ${({$ok}) => $ok ? "#4ade80" : "#fb7185"};
    font-size: 11px;
`;

const List = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Item = styled.div`
    display: grid;
    grid-template-columns: 26px 160px 140px minmax(0, 150px) minmax(0, 1fr) 150px;
    gap: 12px;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`;

const Avatar = styled.span<{ $src?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: var(--text-muted);
    font-size: 10px;
    font-weight: 600;
`;

const Time = styled.span`
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
    white-space: nowrap;
`;

const Kind = styled.span<{ $kind: string }>`
    font-size: 10.5px;
    color: ${({$kind}) => kindColor($kind)};
    white-space: nowrap;
`;

const Who = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11.5px;
`;

const Detail = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 6px;
`;

const UndoButton = styled.button`
    padding: 3px 8px;
    border: 1px solid rgba(251, 113, 133, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 113, 133, 0.1);
    color: #fb7185;
    font: inherit;
    font-size: 9.5px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(251, 113, 133, 0.2);
    }
`;

const ProfileButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 3px 7px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 9.5px;
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

const Empty = styled.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;
