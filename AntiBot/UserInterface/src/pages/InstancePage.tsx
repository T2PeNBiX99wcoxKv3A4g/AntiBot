import {type ReactNode, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {
    emptyInstance,
    getInstance,
    type InstanceSnapshot,
    type InstanceUser,
    onInstanceChanged,
} from "../api/instance";
import {desktopAvailable} from "../api/logs";
import {UsersIcon} from "../components/Icons";

/** Players in the current instance, reconstructed from VRChat's own log. */
export function InstancePage() {
    const [snapshot, setSnapshot] = useState<InstanceSnapshot>(emptyInstance);
    const received = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onInstanceChanged((next) => {
            if (cancelled) return;

            received.current = true;
            setSnapshot(next);
        });

        void getInstance().then((next) => {
            if (!cancelled && !received.current) setSnapshot(next);
        }, () => {
            // The host failed to answer; the empty state already covers it.
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const {running, world, instance, users, source, worldName, userCount, capacity} = snapshot;

    return (
        <Page>
            {!desktopAvailable ? (
                <EmptyState hint="The list is built by the desktop host." title="Desktop host required"/>
            ) : !running ? (
                <EmptyState
                    hint="Players appear here as VRChat writes join and leave lines, or once an account is signed in."
                    title="VRChat is not running"
                />
            ) : (
                <>
                    <Summary>
                        <World>
                            <Label>Instance</Label>
                            <h2>{worldName || world || "—"}</h2>
                            {instance && <InstanceId title={instance}>{instance}</InstanceId>}
                        </World>

                        <Meta>
                            <Source $api={source === "api"}>
                                {source === "api" ? "VRChat API" : "local log"}
                            </Source>
                            <Count>
                                <strong>{users.length}</strong>
                                <span>
                                    {userCount && userCount !== users.length
                                        ? `of ${userCount} players`
                                        : users.length === 1 ? "player" : "players"}
                                    {capacity ? ` · ${capacity} slots` : ""}
                                </span>
                            </Count>
                        </Meta>
                    </Summary>

                    <ListCard>
                        <ListHeader>
                            <span>Name</span>
                            <span>User ID</span>
                            <span>Joined</span>
                        </ListHeader>

                        <Rows>
                            {users.length === 0 ? (
                                <EmptyRow>No players in this instance yet.</EmptyRow>
                            ) : users.map((user) => <UserRow key={user.userId} user={user}/>)}
                        </Rows>
                    </ListCard>
                </>
            )}
        </Page>
    );
}

function UserRow({user}: { user: InstanceUser }) {
    return (
        <Row $local={user.local}>
            <Name>
                <span>{user.name}</span>
                {user.local && <You>you</You>}
            </Name>
            <Id title={user.userId}>{user.userId}</Id>
            <Time>{user.joinedAt || "—"}</Time>
        </Row>
    );
}

function EmptyState({title, hint, children}: { title: string; hint: string; children?: ReactNode }) {
    return (
        <EmptyBox>
            <UsersIcon size={28}/>
            <h2>{title}</h2>
            <p>{hint}</p>
            {children}
        </EmptyBox>
    );
}

const Page = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`;

const Summary = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 16px 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const World = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    h2 {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.01em;
    }
`;

const Label = styled.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

const InstanceId = styled.code`
    max-width: 760px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10px;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
`;

const Source = styled.span<{ $api: boolean }>`
    padding: 4px 9px;
    border: 1px solid ${({$api}) => $api ? "rgba(167, 139, 250, 0.45)" : "var(--border-color)"};
    border-radius: 999px;
    background: ${({$api}) => $api ? "rgba(167, 139, 250, 0.12)" : "transparent"};
    color: ${({$api}) => $api ? "var(--accent-primary)" : "var(--text-muted)"};
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

const Count = styled.div`
    display: flex;
    align-items: baseline;
    gap: 7px;
    flex-shrink: 0;
    font-family: var(--font-mono);

    strong {
        font-size: 22px;
        font-weight: 600;
        color: var(--accent-primary);
    }

    span {
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
    }
`;

const ListCard = styled.section`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const ListHeader = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) 74px;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

const Rows = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Row = styled.div<{ $local: boolean }>`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) 74px;
    gap: 12px;
    padding: 10px 16px;
    border-left: 2px solid ${({$local}) => $local ? "var(--accent-primary)" : "transparent"};
    border-bottom: 1px solid var(--border-color);

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`;

const Name = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    font-size: 12.5px;
    font-weight: 500;

    > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const You = styled.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.16);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`;

const Id = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
    user-select: text;
`;

const Time = styled.span`
    text-align: right;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`;

const EmptyRow = styled.div`
    padding: 32px;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
`;

const EmptyBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 30px;
    text-align: center;

    svg {
        color: var(--text-muted);
    }

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        max-width: 460px;
        font-size: 12px;
        line-height: 1.65;
        color: var(--text-muted);
    }
`;
