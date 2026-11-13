import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useLocale} from "@photino-net-utils/bridge";
import {type Translate, useTranslation} from "@photino-net-utils/bridge";
import {
    clearFriendRequests,
    type FriendRequest,
    getFriendRequests,
    onFriendRequestsChanged,
    undoFriendRequest
} from "../api/friendRequests";
import type {InstanceUser} from "../api/instance";
import {PlayerDialog, userGridColumns, UserRow} from "./InstancePage";

/** Every friend request AntiBot has recorded, newest first, kept as history. */
export function RequestsPage({signedIn, onSignIn}: { signedIn: boolean; onSignIn: () => void }) {
    const t = useTranslation();
    const locale = useLocale();
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [selected, setSelected] = useState<InstanceUser | null>(null);
    const [confirming, setConfirming] = useState(false);
    const received = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onFriendRequestsChanged((next) => {
            if (cancelled) return;

            received.current = true;
            setRequests(next);
        });

        void getFriendRequests().then((next) => {
            if (!cancelled && !received.current) setRequests(next);
        }, () => {
            // The host failed to answer; the empty state already covers it.
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const pending = requests.filter((request) => request.active).length;

    const clear = () => {
        if (!confirming) {
            setConfirming(true);
            return;
        }

        setConfirming(false);
        void clearFriendRequests().then(() => setRequests([]), () => {
            // The host failed to answer; the next snapshot will show the real state.
        });
    };

    const undo = (request: FriendRequest) => {
        void undoFriendRequest(request.id);
    };

    return (
        <Page>
            {!signedIn && (
                <Notice>
                    <NoticeText>
                        <strong>{t("Not signed in")}</strong>
                        <span>{t("Sign in to record the friend requests VRChat receives.")}</span>
                    </NoticeText>
                    <NoticeButton onClick={onSignIn} type="button">{t("Sign in")}</NoticeButton>
                </Notice>
            )}

            <Card>
                <CardHead>
                    <div>
                        <h2>{t("Friend requests")}</h2>
                        <p>
                            {requests.length === 0
                                ? t("Every incoming request is recorded here with the sender's profile.")
                                : t("{count} recorded · {pending} still pending", {
                                    count: requests.length,
                                    pending,
                                })}
                        </p>
                    </div>
                    <CardActions>
                        <Legend>{t("Faded rows are no longer pending")}</Legend>
                        <ClearButton
                            $confirming={confirming}
                            disabled={requests.length === 0}
                            onBlur={() => setConfirming(false)}
                            onClick={clear}
                            type="button"
                        >
                            {confirming ? t("Confirm clear") : t("Clear history")}
                        </ClearButton>
                    </CardActions>
                </CardHead>

                <ListHeader>
                    <span/>
                    <span>{t("User")}</span>
                    <span>{t("Trust")}</span>
                    <span>{t("Pronouns")}</span>
                    <span>{t("Status")}</span>
                    <span>{t("Platform")}</span>
                    <span>{t("Received")}</span>
                </ListHeader>

                <Rows>
                    {requests.length === 0 ? (
                        <Empty>{t("No friend requests recorded yet.")}</Empty>
                    ) : groupByDay(requests, t, locale).map((group) => (
                        <section key={group.day}>
                            <Day>{group.day}</Day>
                            {group.items.map((request) => (
                                <UserRow
                                    badge={request.rejected ? <Rejected>{t("rejected")}</Rejected> : undefined}
                                    dim={!request.active}
                                    key={request.id}
                                    now={request.firstSeen}
                                    onSelect={setSelected}
                                    timeLabel={timeLabel(request.firstSeen, locale)}
                                    trailing={request.rejected ? (
                                        <UndoButton
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                undo(request);
                                            }}
                                            type="button"
                                        >
                                            {t("Undo")}
                                        </UndoButton>
                                    ) : undefined}
                                    user={request.user}
                                />
                            ))}
                        </section>
                    ))}
                </Rows>
            </Card>

            {selected && <PlayerDialog user={selected} now={Date.now()} onClose={() => setSelected(null)}/>}
        </Page>
    );
}

function groupByDay(requests: FriendRequest[],
                    t: Translate,
                    locale: string): { day: string; items: FriendRequest[] }[] {
    const groups = new Map<string, FriendRequest[]>();

    for (const request of requests) {
        const day = dayLabel(request.firstSeen, t, locale);
        const items = groups.get(day) ?? [];
        items.push(request);
        groups.set(day, items);
    }

    return [...groups].map(([day, items]) => ({day, items}));
}

function dayLabel(ms: number,
                  t: Translate,
                  locale: string): string {
    const date = new Date(ms);

    return date.toDateString() === new Date().toDateString()
        ? t("Today")
        : date.toLocaleDateString(locale, {year: "numeric", month: "short", day: "numeric"});
}

function timeLabel(ms: number, locale: string): string {
    return new Date(ms).toLocaleTimeString(locale, {hour: "2-digit", minute: "2-digit"});
}

const Page = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
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
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
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

const CardHead = styled.div`
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

const CardActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
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

const Legend = styled.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`;

const ListHeader = styled.div`
    display: grid;
    grid-template-columns: ${userGridColumns(true)};
    gap: 8px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    span {
        white-space: nowrap;
    }

    span:nth-last-child(2) {
        text-align: center;
    }

    span:last-child {
        text-align: right;
    }
`;

const Rows = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Day = styled.h3`
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 6px 16px;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

const Empty = styled.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;

const Rejected = styled.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(251, 113, 133, 0.14);
    color: #fb7185;
    font-family: var(--font-mono);
    font-size: 9px;
    white-space: nowrap;
`;

const UndoButton = styled.button`
    padding: 3px 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 9.5px;
    cursor: pointer;

    &:hover {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }
`;
