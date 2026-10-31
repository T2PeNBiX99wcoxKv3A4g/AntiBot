import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {type OperationEntry, getOperations, onOperationsChanged} from "../api/operations";

/** Every automatic action AntiBot took, newest first. */
export function OperationsPage() {
    const [entries, setEntries] = useState<OperationEntry[]>([]);
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

    return (
        <Page>
            <Card>
                <Head>
                    <div>
                        <h2>Operation history</h2>
                        <p>Every block, chat-box mute and automatic return home, as it happened.</p>
                    </div>
                    <Count>{entries.length} action(s)</Count>
                </Head>

                <List>
                    {entries.length === 0 ? (
                        <Empty>AntiBot has not taken an automatic action yet.</Empty>
                    ) : entries.map((entry) => (
                        <Item key={entry.id}>
                            <Time>{formatTime(entry.at)}</Time>
                            <Kind>{kindLabel(entry.kind)}</Kind>
                            <Who>{entry.displayName || entry.userId}</Who>
                            <Detail title={entry.detail}>{entry.detail}</Detail>
                        </Item>
                    ))}
                </List>
            </Card>
        </Page>
    );
}

function formatTime(at: number): string {
    return new Date(at).toLocaleString("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

function kindLabel(kind: string): string {
    switch (kind) {
        case "block":
            return "Blocked";
        case "avatarInteractionOff":
            return "Avatar interactions off";
        case "chatBoxHidden":
            return "Chat box hidden";
        case "returnHome":
            return "Returned home";
        case "rejectRequest":
            return "Request rejected";
        case "undoReject":
            return "Rejection undone";
        default:
            return kind;
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

const List = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Item = styled.div`
    display: grid;
    grid-template-columns: 170px 150px minmax(0, 160px) minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
        border-bottom: 0;
    }
`;

const Time = styled.span`
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
    white-space: nowrap;
`;

const Kind = styled.span`
    font-size: 10.5px;
    color: #fb7185;
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

const Empty = styled.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;
