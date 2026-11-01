import {type ReactNode, useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import {
    emptyInstance,
    getInstance,
    getUserBio,
    type InstanceSnapshot,
    type InstanceUser,
    onInstanceChanged,
} from "../api/instance";
import {desktopAvailable} from "../api/logs";
import {openUrl} from "../api/system";
import {AlertIcon, ExternalIcon, LockIcon, UsersIcon} from "../components/Icons";

/** Players in the current instance, reconstructed from VRChat's own log. */
export function InstancePage({signedIn, onSignIn}: { signedIn: boolean; onSignIn: () => void }) {
    const t = useTranslation();
    const [snapshot, setSnapshot] = useState<InstanceSnapshot>(emptyInstance);
    const [selectedId, setSelectedId] = useState<string | null>(null);
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
        const timer = window.setInterval(() => setNow(Date.now()), 5_000);
        return () => window.clearInterval(timer);
    }, []);

    const {
        running, world, users, worldName, capacity,
        worldId = "", worldThumbnail,
        instanceType = "", instanceRegion = "", instanceNumber = "", instanceDisplayName = "",
        instanceRestricted = false, instanceAgeGated = false,
    } = snapshot;

    const thumbnail = useWorldThumbnail(worldId, worldThumbnail);
    const selected = selectedId ? users.find((user) => user.userId === selectedId) ?? null : null;

    return (
        <Page>
            {!signedIn && (
                <Notice>
                    <NoticeText>
                        <strong>{t("Not signed in")}</strong>
                        <span>
                            {t("Only VRChat's local log is read. The player list and instance details can be wrong when more than one client runs, and status, platform and avatar names are unavailable.")}
                        </span>
                    </NoticeText>
                    <NoticeButton onClick={onSignIn} type="button">{t("Sign in")}</NoticeButton>
                </Notice>
            )}

            {!desktopAvailable ? (
                <EmptyState hint={t("The list is built by the desktop host.")} title={t("Desktop host required")}/>
            ) : !running ? (
                <EmptyState
                    hint={t("Players appear here as VRChat writes join and leave lines, or once an account is signed in.")}
                    title={t("VRChat is not running")}
                />
            ) : (
                <>
                    <Summary>
                        <World $src={thumbnail}>
                            <WorldText>
                                <Label>{t("World")}</Label>
                                <WorldName
                                    $link={worldId.length > 0}
                                    onClick={worldId
                                        ? () => void openUrl(`https://vrchat.com/home/world/${worldId}`)
                                        : undefined}
                                    title={worldId ? t("Open on vrchat.com") : undefined}
                                >
                                    {worldName || world || t("—")}
                                </WorldName>
                                <InstanceRow>
                                    <InstanceBadge>
                                        {instanceRegion && <RegionFlag region={instanceRegion} t={t}/>}
                                        {instanceRestricted && <LockIcon size={12}/>}
                                        {instanceAgeGated && <AgeGate>18+</AgeGate>}
                                        {instanceDisplayName || instanceTypeLabel(instanceType, t)} ⋅
                                        #{instanceNumber || t("—")}
                                    </InstanceBadge>
                                </InstanceRow>
                            </WorldText>
                        </World>

                        <Count>
                            <strong>{users.length}</strong>
                            {(capacity ?? 0) > 0 && <span>{t("/ {capacity} users", {capacity: capacity ?? 0})}</span>}
                        </Count>
                    </Summary>

                    <ListCard>
                        <ListHeader>
                            <span/>
                            <span>{t("User")}</span>
                            <span>{t("Trust")}</span>
                            <span>{t("Pronouns")}</span>
                            <span>{t("Status")}</span>
                            <span>{t("Platform")}</span>
                            <span title={t("Time in this instance")}>{t("Time")}</span>
                        </ListHeader>

                        <Rows>
                            {users.length === 0 ? (
                                <EmptyRow>{t("No players in this instance yet.")}</EmptyRow>
                            ) : users.map((user) => (
                                <UserRow key={user.userId} user={user} now={now}
                                     onSelect={(next) => setSelectedId(next.userId)}/>
                            ))}
                        </Rows>
                    </ListCard>
                </>
            )}

            {selected && <PlayerDialog user={selected} now={now} onClose={() => setSelectedId(null)}/>}
        </Page>
    );
}

/** How a row is tinted: the account itself, a friend, the whitelist, or a threat score. */
export type RowTone = "none" | "self" | "friend" | "white" | "threat";

export function UserRow({user, now, onSelect, showTime = true, timeLabel, dim = false, tone, badge, trailing}: {
    user: InstanceUser;
    now: number;
    onSelect: (user: InstanceUser) => void;
    showTime?: boolean;
    timeLabel?: string;
    dim?: boolean;
    tone?: RowTone;
    badge?: ReactNode;
    trailing?: ReactNode;
}) {
    const t = useTranslation();
    const icon = user.iconUrl ?? user.avatarUrl;
    const status = statusInfo(user.status);
    const threat = user.threat ?? 0;
    const loaded = user.profileLoaded ?? true;
    const resolved: RowTone = tone ?? (user.local
        ? "self"
        : user.whitelisted
            ? "white"
            : threat > 0
                ? "threat"
                : user.isFriend ? "friend" : "none");

    return (
        <Row $tone={resolved} $threat={threat} $showTime={showTime} $dim={dim} onClick={() => onSelect(user)}>
            <AvatarCell>
                {icon
                    ? <AvatarLarge $src={icon}/>
                    : loaded
                        ? <AvatarInitial>{user.name.slice(0, 1)}</AvatarInitial>
                        : <SkeletonCircle/>}
            </AvatarCell>
            <Name>
                <NameText>
                    <span title={[user.platform, user.dateJoined && t("joined VRChat {date}", {date: user.dateJoined})]
                        .filter(Boolean).join(" · ")}>
                        {user.name}
                    </span>
                    {threat > 0 && (
                        <ThreatBadge $score={threat}
                                      title={(user.threatReasons ?? []).map((reason) => t(reason)).join(" · ")}>
                            <AlertIcon size={10}/>
                            {threat}%
                        </ThreatBadge>
                    )}
                    {badge}
                    {user.isRobot && <Robot>{t("robot")}</Robot>}
                    {user.local && <You>{t("you")}</You>}
                </NameText>
            </Name>
            <TrustCell>
                {loaded
                    ? user.trust ? <Trust $trust={user.trust}>{user.trust}</Trust> : <Dash>{t("—")}</Dash>
                    : <SkeletonBar/>}
            </TrustCell>
            <PronounCell>
                {loaded
                    ? user.pronouns ? <Pronoun title={user.pronouns}>{user.pronouns}</Pronoun> : <Dash>{t("—")}</Dash>
                    : <SkeletonBar/>}
            </PronounCell>
            <StatusCell title={user.statusDescription || undefined}>
                {loaded
                    ? status
                        ? <><StatusDot $color={status.color}/><span>{user.statusDescription || t(status.labelKey)}</span></>
                        : <Dash>{t("—")}</Dash>
                    : <SkeletonBar/>}
            </StatusCell>
            <PlatformCell title={platformTitle(user.platform, t)}>
                {loaded ? platformLabel(user.platform, t) : <SkeletonBar/>}
            </PlatformCell>
            {showTime && <Time>{trailing ?? timeLabel ?? durationLabel(user.joinedAt, now, t)}</Time>}
        </Row>
    );
}

/** The player's profile: the same icon as the list, and the avatar name when it was resolved. */
export function PlayerDialog({user, now, onClose}: {
    user: InstanceUser;
    now: number;
    onClose: () => void;
}) {
    const t = useTranslation();
    const [bio, setBio] = useState(user.bio);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    useEffect(() => {
        if (user.bio || user.userId.length === 0) {
            setBio(user.bio);
            return;
        }

        let cancelled = false;

        void getUserBio(user.userId).then((next) => {
            if (!cancelled && next) setBio(next);
        }, () => {
            // The host failed to answer; the panel simply shows no bio.
        });

        return () => {
            cancelled = true;
        };
    }, [user.userId, user.bio]);

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
                        {user.isRobot && <Robot>{t("robot")}</Robot>}
                        {user.whitelisted && <Whitelisted>{t("whitelisted")}</Whitelisted>}
                        {user.local && <You>{t("you")}</You>}
                    </Badges>

                    <Fields>
                        <FieldRow>
                            <span>{t("Profile")}</span>
                            <ProfileLink
                                onClick={() => void openUrl(`https://vrchat.com/home/user/${user.userId}`)}
                                title={t("Open on vrchat.com")}
                                type="button"
                            >
                                <ExternalIcon size={12}/>
                                {t("Open on vrchat.com")}
                            </ProfileLink>
                        </FieldRow>
                        <StatusField status={status} text={user.statusDescription} t={t}/>
                        {(user.threat ?? 0) > 0 && (
                            <FieldRow>
                                <span>{t("Threat")}</span>
                                <ThreatLine>
                                    <ThreatBadge $score={user.threat!}>
                                        <AlertIcon size={10}/>
                                        {user.threat}%
                                    </ThreatBadge>
                                    <ThreatText>{(user.threatReasons ?? []).map((reason) => t(reason)).join(" · ")}</ThreatText>
                                </ThreatLine>
                            </FieldRow>
                        )}
                        <Field label={t("Pronouns")} value={user.pronouns || t("—")}/>
                        <Field label={t("Platform")} value={platformLabel(user.platform, t)}/>
                        {user.joinedAt && (
                            <Field label={t("In this instance")} value={durationLabel(user.joinedAt, now, t)}/>
                        )}
                        <Field
                            label={t("Avatar")}
                            value={avatarName(user, t)}
                        />
                        <Field
                            label={t("VRChat account since")}
                            value={user.dateJoined ? new Date(user.dateJoined).toLocaleDateString() : t("—")}
                        />
                        {bio && <Bio>{bio}</Bio>}
                    </Fields>
                </Details>

                <Close onClick={onClose} type="button">×</Close>
            </Dialog>
        </Overlay>
    );
}

/** The avatar name, or a translated loading/unknown state. */
function avatarName(user: InstanceUser, t: (key: string, params?: Record<string, string | number>) => string): string {
    if (user.avatarName) return user.avatarName;
    if (user.isRobot) return t("Robot (default)");
    if (!(user.avatarLoaded ?? false)) return t("Loading…");

    return t("Unknown");
}

function Field({label, value}: { label: string; value: string }) {
    return (
        <FieldRow>
            <span>{label}</span>
            <code title={value}>{value}</code>
        </FieldRow>
    );
}

/** The dot and the text together: the custom status when there is one, otherwise the default label. */
function StatusField({status, text, t}: {
    status: { labelKey: string; color: string } | null;
    text?: string;
    t: (key: string, params?: Record<string, string | number>) => string;
}) {
    const label = text || (status ? t(status.labelKey) : t("—"));

    return (
        <FieldRow>
            <span>{t("Status")}</span>
            <StatusValue title={label}>
                {status && <StatusDot $color={status.color}/>}
                <code>{label}</code>
            </StatusValue>
        </FieldRow>
    );
}

/** Remembers the last picture for a world, so a poll that briefly lost it does not blank the card. */
function useWorldThumbnail(worldId: string, thumbnail?: string): string {
    const cache = useRef({worldId: "", url: ""});

    if (thumbnail) {
        cache.current = {worldId, url: thumbnail};
    } else if (cache.current.worldId !== worldId) {
        cache.current = {worldId, url: ""};
    }

    return cache.current.url;
}

function statusInfo(status?: string): { labelKey: string; color: string } | null {
    switch (status) {
        case "active":
            return {labelKey: "Online", color: "#4ade80"};
        case "join me":
            return {labelKey: "Join Me", color: "#60a5fa"};
        case "ask me":
            return {labelKey: "Ask Me", color: "#fbbf24"};
        case "busy":
            return {labelKey: "Busy", color: "#f87171"};
        case "offline":
            return {labelKey: "Offline", color: "#94a3b8"};
        default:
            return status && status.length > 0 ? {labelKey: status, color: "#94a3b8"} : null;
    }
}

/** VRChat does not say whether a PC user is in VR; the tooltip explains the limitation. */
function platformTitle(platform: string | undefined,
    t: (key: string, params?: Record<string, string | number>) => string): string | undefined {
    return platform === "standalonewindows"
        ? t("PC includes both desktop and PCVR users; VRChat does not report which one.")
        : undefined;
}

function platformLabel(platform: string | undefined,
    t: (key: string, params?: Record<string, string | number>) => string): string {
    switch (platform) {
        case "standalonewindows":
            return t("PC/VR");
        case "android":
            return t("Quest");
        case "ios":
            return t("iOS");
        default:
            return platform && platform.length > 0 ? platform : t("—");
    }
}

/** How long the player has been in the instance, from the log's join time. */
function durationLabel(joinedAt: string, now: number,
    t: (key: string, params?: Record<string, string | number>) => string): string {
    if (!joinedAt) return t("—");

    const [hours, minutes, seconds] = joinedAt.split(":").map(Number);
    if ([hours, minutes, seconds].some(Number.isNaN)) return joinedAt;

    const start = new Date(now);
    start.setHours(hours, minutes, seconds, 0);
    if (start.getTime() > now) start.setDate(start.getDate() - 1);

    const total = Math.max(0, Math.floor((now - start.getTime()) / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);

    return h > 0 ? t("{hours}h {minutes}m", {hours: h, minutes: m}) : t("{minutes}m", {minutes: m});
}

/** The region as a small flag. Windows has no flag emoji, so the emoji only ever showed "JP". */
function RegionFlag({region, t}: {
    region: string;
    t: (key: string, params?: Record<string, string | number>) => string;
}) {
    switch (region.toLowerCase()) {
        case "jp":
            return (
                <Flag title={t("Japan")}>
                    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="#fff" height="20" width="30"/>
                        <circle cx="15" cy="10" fill="#bc002d" r="6"/>
                    </svg>
                </Flag>
            );

        case "us":
        case "use":
            return (
                <Flag title={t("United States")}>
                    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="#fff" height="20" width="30"/>
                        <path
                            d="M0 0h30v1.54H0zM0 3.08h30v1.54H0zM0 6.15h30v1.54H0zM0 9.23h30v1.54H0zM0 12.31h30v1.54H0zM0 15.38h30v1.54H0zM0 18.46h30V20H0z"
                            fill="#b22234"
                        />
                        <rect fill="#3c3b6e" height="10.77" width="12.6"/>
                    </svg>
                </Flag>
            );

        case "eu":
            return (
                <Flag title={t("Europe")}>
                    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="#003399" height="20" width="30"/>
                        {Array.from({length: 12}, (_, index) => {
                            const angle = (index / 12) * Math.PI * 2;
                            return (
                                <circle
                                    cx={15 + Math.cos(angle) * 4.6}
                                    cy={10 + Math.sin(angle) * 4.6}
                                    fill="#ffcc00"
                                    key={index}
                                    r="0.9"
                                />
                            );
                        })}
                    </svg>
                </Flag>
            );

        default:
            return <RegionText>{region.toUpperCase()}</RegionText>;
    }
}

function instanceTypeLabel(type: string | undefined,
    t: (key: string, params?: Record<string, string | number>) => string): string {
    switch (type) {
        case "public":
            return t("Public");
        case "friends":
            return t("Friends");
        case "friends+":
        case "hidden":
            return t("Friends+");
        case "invite":
        case "private":
            return t("Invite");
        case "invite+":
            return t("Invite+");
        case "group":
            return t("Group");
        default:
            if (type?.startsWith("group:")) {
                const access = type.slice(6);
                return access === "public" ? t("Group Public") : access === "plus" ? t("Group+") : t("Group Members");
            }
            return type && type.length > 0 ? type : t("Instance");
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

const Summary = styled.section`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 18px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const World = styled.div<{ $src?: string }>`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    overflow: hidden;

    /* The thumbnail is the card's backdrop: full on the left, fading out before the middle. */
    &::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: max(24%, 380px);
        background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
        background-position: center;
        background-size: cover;
        opacity: 0.75;
        mask-image: linear-gradient(90deg, #000 0%, #000 45%, transparent 100%);
        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 45%, transparent 100%);
    }

    /* Keeps the text readable over the picture. */
    &::after {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: max(40%, 560px);
        background: linear-gradient(90deg,
        rgba(8, 7, 15, 0.68) 0%,
        rgba(8, 7, 15, 0.3) 55%,
        rgba(8, 7, 15, 0) 100%);
    }
`;

const WorldText = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    padding: 14px 16px;
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

const Flag = styled.span`
    display: inline-flex;
    width: 15px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

const RegionText = styled.span`
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`;

const Count = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    align-self: center;
    gap: 7px;
    flex-shrink: 0;
    padding: 14px 18px;
    white-space: nowrap;
    font-family: var(--font-mono);

    strong {
        font-size: 22px;
        font-weight: 600;
        color: var(--accent-primary);
    }

    span {
        font-size: 12px;
        letter-spacing: 0.02em;
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

/** The shared column grid, so the instance list and the request list line up. */
export const userGridColumns = (showTime: boolean): string =>
    showTime
        ? "34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr minmax(64px, 0.5fr)"
        : "34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr";

const ListHeader = styled.div`
    display: grid;
    grid-template-columns: ${userGridColumns(true)};
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

function toneBackground(tone: RowTone, hover = false): string {
    switch (tone) {
        case "self":
            return hover ? "rgba(167, 139, 250, 0.16)" : "rgba(167, 139, 250, 0.09)";
        case "friend":
            return hover ? "rgba(255, 204, 0, 0.16)" : "rgba(255, 204, 0, 0.09)";
        case "white":
            return hover ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.10)";
        default:
            return hover ? "rgba(167, 139, 250, 0.06)" : "transparent";
    }
}

/** Low scores stay close to the normal row; only high scores get a strong pure-red wash. */
function threatBackground(score: number, hover = false): string {
    const t = Math.min(Math.max(score, 0), 100) / 100;
    const alpha = Math.pow(t, 1.8) * 0.7 + (hover ? 0.08 : 0);
    return `rgba(255, 0, 0, ${alpha.toFixed(3)})`;
}

function toneBorder(tone: RowTone, threat = 0): string {
    switch (tone) {
        case "self":
            return "var(--accent-primary)";
        case "friend":
            return "#ffcc00";
        case "white":
            return "rgba(255, 255, 255, 0.5)";
        case "threat":
            return `rgba(255, 0, 0, ${(0.1 + (Math.min(Math.max(threat, 0), 100) / 100) * 0.9).toFixed(3)})`;
        default:
            return "transparent";
    }
}

function threatColor(score: number): string {
    const clamped = Math.max(0, Math.min(100, score));
    const hue = 48 - (clamped / 100) * 48;
    return `hsl(${hue.toFixed(0)}, 92%, 62%)`;
}

function threatTint(score: number): string {
    const clamped = Math.max(0, Math.min(100, score));
    const hue = 48 - (clamped / 100) * 48;
    return `hsla(${hue.toFixed(0)}, 92%, 62%, 0.14)`;
}

const Row = styled.div<{ $tone: RowTone; $threat: number; $showTime: boolean; $dim?: boolean }>`
    display: grid;
    grid-template-columns: ${({$showTime}) => userGridColumns($showTime)};
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    opacity: ${({$dim}) => $dim ? 0.55 : 1};
    background: ${({$tone, $threat}) => $tone === "threat" ? threatBackground($threat) : toneBackground($tone)};
    border-left: 2px solid ${({$tone, $threat}) => toneBorder($tone, $threat)};
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: ${({$tone, $threat}) =>
            $tone === "threat" ? threatBackground($threat, true) : toneBackground($tone, true)};
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
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
`;

/** The row is still loading; a quiet pulse reads better than a row full of dashes. */
const pulse = keyframes`
    0%, 100% {
        opacity: 0.25;
    }
    50% {
        opacity: 0.65;
    }
`;

/** The placeholder while a profile (and with it the picture) has not arrived yet. */
const SkeletonCircle = styled.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--text-muted);
    animation: ${pulse} 1.4s ease-in-out infinite;
`;

/** A loaded profile without a picture still gets a stable, readable avatar. */
const AvatarInitial = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--bg-primary);
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
`;

const SkeletonBar = styled.span`
    display: block;
    width: 62%;
    height: 8px;
    border-radius: 999px;
    background: var(--text-muted);
    animation: ${pulse} 1.4s ease-in-out infinite;
`;

const TrustCell = styled.span`
    display: flex;
    align-items: center;
    min-width: 0;
`;

const PronounCell = styled.span`
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
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

const Pronoun = styled.span`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.12);
    color: #93c5fd;
    font-family: var(--font-mono);
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ThreatBadge = styled.span<{ $score: number }>`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$score}) => threatTint($score)};
    color: ${({$score}) => threatColor($score)};
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    white-space: nowrap;
`;

const ThreatLine = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;
`;

const ThreatText = styled.span`
    color: var(--text-secondary);
    font-size: 11px;
    line-height: 1.5;
`;

const Whitelisted = styled.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 9px;
`;

const StatusCell = styled.span`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    font-size: 11px;
    color: var(--text-secondary);
    white-space: nowrap;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const StatusDot = styled.span<{ $color: string }>`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color}) => $color};
    box-shadow: 0 0 6px ${({$color}) => $color};
`;

const StatusValue = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const PlatformCell = styled.span`
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-secondary);
    font-size: 11px;
`;

const Trust = styled.span<{ $trust: string }>`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: ${({$trust}) => trustBackground($trust)};
    color: ${({$trust}) => trustColor($trust)};
    font-family: var(--font-mono);
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
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
        case "Trusted User":
            return "#c4b5fd";
        case "Known User":
            return "#93c5fd";
        case "User":
            return "#86efac";
        case "New User":
            return "#fcd34d";
        case "Nuisance":
            return "#fb7185";
        default:
            return "#94a3b8";
    }
}

function trustBackground(trust: string) {
    switch (trust) {
        case "Trusted User":
            return "rgba(167, 139, 250, 0.16)";
        case "Known User":
            return "rgba(96, 165, 250, 0.16)";
        case "User":
            return "rgba(74, 222, 128, 0.14)";
        case "New User":
            return "rgba(250, 204, 21, 0.14)";
        case "Nuisance":
            return "rgba(251, 113, 133, 0.16)";
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
    width: 100%;
    max-width: 700px;
    max-height: 100%;
    overflow-y: auto;
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

const ProfileLink = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    padding: 4px 9px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 10.5px;
    cursor: pointer;

    svg {
        flex-shrink: 0;
    }

    &:hover {
        border-color: var(--border-color-hover);
        color: var(--accent-primary);
    }
`;

const Bio = styled.p`
    margin-top: 2px;
    padding: 8px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-secondary);
    font-size: 11px;
    line-height: 1.55;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    user-select: text;
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
