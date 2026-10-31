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
import {openUrl} from "../api/system";
import {EyeIcon, EyeOffIcon, LockIcon, UsersIcon} from "../components/Icons";

/** Players in the current instance, reconstructed from VRChat's own log. */
export function InstancePage() {
    const [snapshot, setSnapshot] = useState<InstanceSnapshot>(emptyInstance);
    const [selected, setSelected] = useState<InstanceUser | null>(null);
    const [now, setNow] = useState(() => Date.now());
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

    // "In instance" is a duration, so it has to move as time passes.
    useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 30_000);
        return () => window.clearInterval(timer);
    }, []);

    const {
        running, world, users, worldName, userCount, capacity,
        worldId = "", worldThumbnail,
        instanceType = "", instanceRegion = "", instanceNumber = "", instanceDisplayName = "",
        instanceRestricted = false, instanceAgeGated = false,
    } = snapshot;

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
                            <WorldThumb $src={worldThumbnail}/>
                            <WorldText>
                                <Label>World</Label>
                                <WorldName
                                    $link={worldId.length > 0}
                                    onClick={worldId
                                        ? () => void openUrl(`https://vrchat.com/home/world/${worldId}`)
                                        : undefined}
                                    title={worldId ? "Open on vrchat.com" : undefined}
                                >
                                    {worldName || world || "—"}
                                </WorldName>
                                <InstanceRow>
                                    <InstanceBadge>
                                        {instanceDisplayName || instanceTypeLabel(instanceType)} ⋅ #{instanceNumber || "—"}
                                        {instanceRegion && <RegionFlag>{regionFlag(instanceRegion)}</RegionFlag>}
                                        {instanceRestricted && <LockIcon size={12}/>}
                                        {instanceAgeGated && <AgeGate>18+</AgeGate>}
                                    </InstanceBadge>
                                </InstanceRow>
                            </WorldText>
                        </World>

                        <Count>
                            <strong>{users.length}</strong>
                            <span>
                                {userCount && userCount !== users.length
                                    ? `of ${userCount} players`
                                    : users.length === 1 ? "player" : "players"}
                                {capacity ? ` · ${capacity} slots` : ""}
                            </span>
                        </Count>
                    </Summary>

                    <ListCard>
                        <ListHeader>
                            <span/>
                            <span>Name</span>
                            <span>Status</span>
                            <span>Platform</span>
                            <span>In instance</span>
                        </ListHeader>

                        <Rows>
                            {users.length === 0 ? (
                                <EmptyRow>No players in this instance yet.</EmptyRow>
                            ) : users.map((user) => (
                                <UserRow key={user.userId} user={user} now={now} onSelect={setSelected}/>
                            ))}
                        </Rows>
                    </ListCard>
                </>
            )}

            {selected && <PlayerDialog user={selected} now={now} onClose={() => setSelected(null)}/>}
        </Page>
    );
}

function UserRow({user, now, onSelect}: {
    user: InstanceUser;
    now: number;
    onSelect: (user: InstanceUser) => void;
}) {
    const icon = user.iconUrl ?? user.avatarUrl;
    const status = statusInfo(user.status);

    return (
        <Row $local={user.local} onClick={() => onSelect(user)}>
            <AvatarCell>
                {icon ? <AvatarLarge $src={icon}/> : <Dash>—</Dash>}
            </AvatarCell>
            <Name>
                <NameText>
                    <span title={[user.platform, user.dateJoined && `joined VRChat ${user.dateJoined}`]
                        .filter(Boolean).join(" · ")}>
                        {user.name}
                    </span>
                    {user.trust && <Trust $trust={user.trust}>{user.trust}</Trust>}
                    {user.isRobot && <Robot>robot</Robot>}
                    {user.local && <You>you</You>}
                </NameText>
            </Name>
            <StatusCell title={user.statusDescription || undefined}>
                {status
                    ? <><StatusDot $color={status.color}/><span>{user.statusDescription || status.label}</span></>
                    : <Dash>—</Dash>}
            </StatusCell>
            <PlatformCell>{platformLabel(user.platform)}</PlatformCell>
            <Time>{durationLabel(user.joinedAt, now)}</Time>
        </Row>
    );
}

/** The player's profile: the same icon as the list, and the avatar name when it was resolved. */
function PlayerDialog({user, now, onClose}: {
    user: InstanceUser;
    now: number;
    onClose: () => void;
}) {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const icon = user.iconUrl ?? user.avatarUrl;
    const status = statusInfo(user.status);

    return (
        <Overlay onClick={onClose}>
            <Dialog onClick={(event) => event.stopPropagation()}>
                <Portrait $src={icon}>
                    {!icon && user.name.slice(0, 1).toUpperCase()}
                </Portrait>

                <Details>
                    <h2>{user.name}</h2>
                    <Badges>
                        {user.trust && <Trust $trust={user.trust}>{user.trust}</Trust>}
                        {user.isRobot && <Robot>robot</Robot>}
                        {user.local && <You>you</You>}
                    </Badges>

                    <Fields>
                        <SecretField>
                            <span>User ID</span>
                            <SecretValue>
                                <code>{revealed ? user.userId : "••••••••••••••••"}</code>
                                <RevealButton
                                    aria-label={revealed ? "Hide user ID" : "Show user ID"}
                                    onClick={() => setRevealed((value) => !value)}
                                    type="button"
                                >
                                    {revealed ? <EyeOffIcon size={14}/> : <EyeIcon size={14}/>}
                                </RevealButton>
                            </SecretValue>
                        </SecretField>
                        <Field label="Status" value={status ? status.label : "—"}/>
                        <Field label="Status text" value={user.statusDescription || "—"}/>
                        <Field label="Platform" value={platformLabel(user.platform)}/>
                        <Field label="In this instance" value={durationLabel(user.joinedAt, now)}/>
                        <Field
                            label="Avatar"
                            value={user.avatarName ?? (user.isRobot ? "Robot (default)" : "Unknown")}
                        />
                        <Field
                            label="VRChat account since"
                            value={user.dateJoined ? new Date(user.dateJoined).toLocaleDateString() : "—"}
                        />
                    </Fields>
                </Details>

                <Close onClick={onClose} type="button">×</Close>
            </Dialog>
        </Overlay>
    );
}

function Field({label, value}: { label: string; value: string }) {
    return (
        <FieldRow>
            <span>{label}</span>
            <code title={value}>{value}</code>
        </FieldRow>
    );
}

function statusInfo(status?: string): { label: string; color: string } | null {
    switch (status) {
        case "active":
            return {label: "Online", color: "#4ade80"};
        case "join me":
            return {label: "Join Me", color: "#60a5fa"};
        case "ask me":
            return {label: "Ask Me", color: "#fbbf24"};
        case "busy":
            return {label: "Busy", color: "#f87171"};
        case "offline":
            return {label: "Offline", color: "#94a3b8"};
        default:
            return status && status.length > 0 ? {label: status, color: "#94a3b8"} : null;
    }
}

function platformLabel(platform?: string): string {
    switch (platform) {
        case "standalonewindows":
            return "PC";
        case "android":
            return "Android";
        case "ios":
            return "iOS";
        default:
            return platform && platform.length > 0 ? platform : "—";
    }
}

/** How long the player has been in the instance, from the log's join time. */
function durationLabel(joinedAt: string, now: number): string {
    if (!joinedAt) return "—";

    const [hours, minutes, seconds] = joinedAt.split(":").map(Number);
    if ([hours, minutes, seconds].some(Number.isNaN)) return joinedAt;

    const start = new Date(now);
    start.setHours(hours, minutes, seconds, 0);
    if (start.getTime() > now) start.setDate(start.getDate() - 1);

    const total = Math.max(0, Math.floor((now - start.getTime()) / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);

    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function regionFlag(region: string): string {
    switch (region.toLowerCase()) {
        case "jp":
            return "🇯🇵";
        case "us":
        case "use":
            return "🇺🇸";
        case "eu":
            return "🇪🇺";
        default:
            return region.toUpperCase();
    }
}

function instanceTypeLabel(type?: string): string {
    switch (type) {
        case "public":
            return "Public";
        case "friends":
            return "Friends";
        case "friends+":
        case "hidden":
            return "Friends+";
        case "invite":
        case "private":
            return "Invite";
        case "invite+":
            return "Invite+";
        case "group":
            return "Group";
        default:
            if (type?.startsWith("group:")) {
                const access = type.slice(6);
                return access === "public" ? "Group Public" : access === "plus" ? "Group+" : "Group Members";
            }
            return type && type.length > 0 ? type : "Instance";
    }
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
    align-items: center;
    gap: 12px;
    min-width: 0;
`;

const WorldThumb = styled.div<{ $src?: string }>`
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: var(--radius-sm);
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
`;

const WorldText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
`;

const WorldName = styled.h2<{ $link: boolean }>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
    cursor: ${({$link}) => $link ? "pointer" : "default"};

    &:hover {
        color: ${({$link}) => $link ? "var(--accent-primary)" : "inherit"};
    }
`;

const Label = styled.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

const InstanceRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
`;

const InstanceBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 8px;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background: transparent;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 10px;
`;

const AgeGate = styled.span`
    padding: 0 4px;
    border-radius: 3px;
    background: rgba(248, 113, 113, 0.16);
    color: #fca5a5;
    font-size: 9px;
`;

const RegionFlag = styled.span`
    font-size: 12px;
    line-height: 1;
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
    grid-template-columns: 40px minmax(0, 1fr) 108px 78px 96px;
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
    grid-template-columns: 40px minmax(0, 1fr) 108px 78px 96px;
    gap: 12px;
    align-items: center;
    padding: 8px 16px;
    border-left: 2px solid ${({$local}) => $local ? "var(--accent-primary)" : "transparent"};
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`;

const AvatarCell = styled.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const AvatarLarge = styled.span<{ $src?: string }>`
    width: 34px;
    height: 34px;
    border-radius: var(--radius-sm);
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
`;

const Dash = styled.span`
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`;

const Name = styled.span`
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    font-size: 12.5px;
    font-weight: 500;
`;

const NameText = styled.span`
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;

    > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const StatusCell = styled.span`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    font-size: 11px;
    color: var(--text-secondary);
    white-space: nowrap;
`;

const StatusDot = styled.span<{ $color: string }>`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color}) => $color};
    box-shadow: 0 0 6px ${({$color}) => $color};
`;

const PlatformCell = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-secondary);
    font-size: 11px;
`;

const Trust = styled.span<{ $trust: string }>`
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: ${({$trust}) => trustBackground($trust)};
    color: ${({$trust}) => trustColor($trust)};
    font-family: var(--font-mono);
    font-size: 9px;
`;

const You = styled.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.16);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`;

const Robot = styled.span`
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: rgba(248, 113, 113, 0.16);
    color: #fca5a5;
    font-family: var(--font-mono);
    font-size: 9px;
`;

/** VRChat's trust tags, in the colours the site uses for them. */
function trustColor(trust: string) {
    switch (trust) {
        case "Trusted":
            return "#c4b5fd";
        case "Known":
            return "#93c5fd";
        case "User":
            return "#86efac";
        case "New":
            return "#fcd34d";
        default:
            return "#94a3b8";
    }
}

function trustBackground(trust: string) {
    switch (trust) {
        case "Trusted":
            return "rgba(167, 139, 250, 0.16)";
        case "Known":
            return "rgba(96, 165, 250, 0.16)";
        case "User":
            return "rgba(74, 222, 128, 0.14)";
        case "New":
            return "rgba(250, 204, 21, 0.14)";
        default:
            return "rgba(148, 163, 184, 0.14)";
    }
}

const Time = styled.span`
    text-align: right;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`;

const Dialog = styled.div`
    position: relative;
    display: flex;
    gap: 22px;
    max-width: 560px;
    padding: 22px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const Portrait = styled.div<{ $src?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 220px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: ${({$src}) => $src ? "transparent" : "var(--text-muted)"};
    font-size: 44px;
    font-weight: 600;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;

    h2 {
        font-size: 17px;
        font-weight: 600;
    }
`;

const Badges = styled.div`
    display: flex;
    gap: 6px;
`;

const Fields = styled.dl`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    span {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-secondary);
        font-family: var(--font-mono);
        font-size: 11px;
        user-select: text;
    }
`;

const SecretField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    span {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-muted);
    }
`;

const SecretValue = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-secondary);
        font-family: var(--font-mono);
        font-size: 11px;
        user-select: text;
    }
`;

const RevealButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`;

const Close = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-muted);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
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
