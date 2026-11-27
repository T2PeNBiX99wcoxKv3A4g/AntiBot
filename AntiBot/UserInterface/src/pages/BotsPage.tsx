import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {type Translate, useLocale, useTranslation} from "@photino-net-utils/bridge";
import {type BotEntry, addTestBot, exportBots, getBots, onBotsChanged, removeBot} from "../api/bots";
import {
    buildSubmission,
    communityIssueUrl,
    openCommunityUrl,
    openDownloads,
    saveSubmission,
} from "../api/community";
import type {InstanceUser, ThreatReason} from "../api/instance";
import {TrashIcon} from "../components/Icons";
import {platformLabel, PlayerDialog} from "./InstancePage";

/** Every account AntiBot has called a bot, one row per user id. */
export function BotsPage({signedIn, debug}: { signedIn: boolean; debug: boolean }) {
    const t = useTranslation();
    const locale = useLocale();
    const [bots, setBots] = useState<BotEntry[]>([]);
    const [editing, setEditing] = useState(false);
    const [selected, setSelected] = useState<InstanceUser | null>(null);
    const [busy, setBusy] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [savedPath, setSavedPath] = useState("");
    const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
    const received = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onBotsChanged((next) => {
            if (cancelled) return;

            received.current = true;
            setBots(next);
        });

        void getBots().then((next) => {
            if (!cancelled && !received.current) setBots(next);
        }, () => {
            // The host failed to answer; the empty state already covers it.
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const runExport = (format: "json" | "csv") => {
        setBusy(true);
        setNotice(null);

        void exportBots(format).then((result) => {
            setNotice({
                ok: result.saved,
                text: result.saved
                    ? t("exported_count_bots_to_path", {count: result.count, path: result.path ?? ""})
                    : t("error.bots_export"),
            });
        }, (reason) => {
            setNotice({ok: false, text: reason instanceof Error ? reason.message : String(reason)});
        }).finally(() => {
            setBusy(false);
            window.setTimeout(() => setNotice(null), 6000);
        });
    };

    const remove = (bot: BotEntry) => {
        setBots((current) => current.filter((item) => item.userId !== bot.userId));

        void removeBot(bot.userId).then(() => undefined, () => {
            // The host refused; put the row back from the source of truth.
            void getBots().then(setBots, () => undefined);
        });
    };

    const add = () => {
        setNotice(null);

        void addTestBot().catch((reason) => {
            setNotice({ok: false, text: reason instanceof Error ? reason.message : String(reason)});
        });
    };

    const upload = () => {
        if (bots.length === 0) return;

        setUploading(true);
        setNotice(null);

        const {json} = buildSubmission(bots);

        void saveSubmission(json).then(async (file) => {
            if (!file.saved) throw new Error(t("community_upload_failed"));

            setSavedPath(file.path ?? "");
            await openCommunityUrl(communityIssueUrl());
        }).catch((reason) => {
            setNotice({ok: false, text: reason instanceof Error ? reason.message : t("community_upload_failed")});
        }).finally(() => {
            setUploading(false);
        });
    };

    return (
        <Page>
            <Card>
                <Head>
                    <div>
                        <h2>{t("bot_list")}</h2>
                        <p>{t("every_account_anti_bot_has_detected_as_a_bot_newest_first_and_repeats_are_merged")}</p>
                        {!signedIn && (
                            <Hint>
                                {t("bots_are_found_from_the_name_avatar_and_profile_while_signed_out_only_the_log_based_checks_run")}
                            </Hint>
                        )}
                    </div>
                    <HeadActions>
                        {debug && (
                            <DebugButton onClick={add} type="button">
                                {t("add_test_bot")}
                            </DebugButton>
                        )}
                        <UploadButton
                            disabled={bots.length === 0}
                            onClick={() => {
                                setSavedPath("");
                                setUploadOpen(true);
                            }}
                            title={bots.length === 0 ? t("no_bots_detected_yet") : t("upload_this_list")}
                            type="button"
                        >
                            {t("upload_this_list")}
                        </UploadButton>
                        <Count>{t("count_bot_s", {count: bots.length})}</Count>
                        <ActionButton
                            disabled={bots.length === 0 || busy}
                            onClick={() => runExport("json")}
                            type="button"
                        >
                            {t("export_as_json")}
                        </ActionButton>
                        <ActionButton
                            disabled={bots.length === 0 || busy}
                            onClick={() => runExport("csv")}
                            type="button"
                        >
                            {t("export_as_csv")}
                        </ActionButton>
                        <EditButton $editing={editing} onClick={() => setEditing((value) => !value)} type="button">
                            {editing ? t("done") : t("edit")}
                        </EditButton>
                    </HeadActions>
                </Head>

                {editing && (
                    <EditHint>{t("only_edit_mode_can_remove_a_bot_so_an_accidental_click_cannot_delete_it")}</EditHint>
                )}

                {notice && <Notice $ok={notice.ok}>{notice.text}</Notice>}

                <ListHeader $editing={editing}>
                    <span/>
                    <span>{t("user")}</span>
                    <span>{t("threat")}</span>
                    <span>{t("trust")}</span>
                    <span>{t("platform")}</span>
                    <span>{t("last_seen")}</span>
                    <span>{t("times_seen")}</span>
                    {editing && <span/>}
                </ListHeader>

                <List>
                    {bots.length === 0 ? (
                        <Empty>{t("no_bots_detected_yet")}</Empty>
                    ) : bots.map((bot) => (
                        <Item
                            $editing={editing}
                            data-user-id={bot.userId}
                            key={bot.userId}
                            onClick={() => {
                                if (!editing) setSelected(asUser(bot));
                            }}
                        >
                            <AvatarCell>
                                {bot.avatarUrl
                                    ? <Avatar $src={bot.avatarUrl}/>
                                    : <AvatarInitial>{bot.displayName.slice(0, 1)}</AvatarInitial>}
                            </AvatarCell>
                            <Name>
                                <NameText title={bot.dateJoined
                                    ? t("joined_vr_chat_date", {date: bot.dateJoined})
                                    : undefined}>
                                    {bot.displayName || t("unknown_user")}
                                </NameText>
                                <Reasons title={`${t("reasons")}: ${reasonTooltip(bot.reasons, t)}`}>
                                    {reasonSummary(bot.reasons, t)}
                                </Reasons>
                            </Name>
                            <Threat $score={bot.threat}>{bot.threat}</Threat>
                            <Cell>{bot.trust || "—"}</Cell>
                            <Cell>{platformLabel(bot.platform, t)}</Cell>
                            <Cell title={`${t("first_seen")}: ${formatTime(bot.firstSeen, locale)}`}>
                                {formatTime(bot.lastSeen, locale)}
                            </Cell>
                            <Cell>{bot.sightings}</Cell>
                            {editing && (
                                <RemoveButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        remove(bot);
                                    }}
                                    title={t("remove")}
                                    type="button"
                                >
                                    <TrashIcon size={12}/>
                                    {t("remove")}
                                </RemoveButton>
                            )}
                        </Item>
                    ))}
                </List>
            </Card>

            {selected && <PlayerDialog user={selected} now={Date.now()} onClose={() => setSelected(null)}/>}

            {uploadOpen && (
                <Overlay onClick={() => !uploading && setUploadOpen(false)}>
                    <Dialog onClick={(event) => event.stopPropagation()}>
                        <h2>{t("community_upload_title")}</h2>

                        {savedPath ? (
                            <>
                                <p>{t("community_upload_file_saved", {path: savedPath})}</p>
                                <p>{t("community_upload_withdraw")}</p>
                                <DialogActions>
                                    <ActionButton onClick={() => void openDownloads()} type="button">
                                        {t("community_upload_show_folder")}
                                    </ActionButton>
                                    <ActionButton onClick={() => void openCommunityUrl(communityIssueUrl())}
                                                  type="button">
                                        {t("open_github")}
                                    </ActionButton>
                                    <UploadButton
                                        onClick={() => {
                                            setUploadOpen(false);
                                            setSavedPath("");
                                        }}
                                        type="button"
                                    >
                                        {t("close")}
                                    </UploadButton>
                                </DialogActions>
                            </>
                        ) : (
                            <>
                                <p>{t("community_upload_explanation")}</p>
                                <p>{t("community_upload_withdraw")}</p>
                                <DialogActions>
                                    <ActionButton disabled={uploading}
                                                  onClick={() => setUploadOpen(false)}
                                                  type="button">
                                        {t("cancel")}
                                    </ActionButton>
                                    <UploadButton disabled={uploading} onClick={upload} type="button">
                                        {uploading ? t("working") : t("community_upload_save_and_open")}
                                    </UploadButton>
                                </DialogActions>
                            </>
                        )}
                    </Dialog>
                </Overlay>
            )}
        </Page>
    );
}

/** The bot list needs only the fields the player panel reads. */
function asUser(bot: BotEntry): InstanceUser {
    return {
        userId: bot.userId,
        name: bot.displayName,
        local: false,
        joinedAt: "",
        avatarUrl: bot.avatarUrl,
        iconUrl: bot.avatarUrl,
        trust: bot.trust,
        platform: bot.platform,
        dateJoined: bot.dateJoined,
        threat: bot.threat,
        threatReasons: bot.reasons,
        profileLoaded: true,
        avatarLoaded: true,
    };
}

function reasonTooltip(reasons: ThreatReason[], t: Translate): string {
    return reasons.map((reason) => `${reasonText(reason, t)} ${reason.weight > 0 ? "+" : ""}${reason.weight}`)
        .join(" · ");
}

function reasonSummary(reasons: ThreatReason[], t: Translate): string {
    return reasons.map((reason) => t(reason.text, reason.detail ? {
        days: reason.detail,
        years: Math.floor(Number(reason.detail) / 365),
    } : undefined)).join(" · ");
}

function reasonText(reason: ThreatReason, t: Translate): string {
    return t(reason.text, reason.detail ? {
        days: reason.detail,
        years: Math.floor(Number(reason.detail) / 365),
    } : undefined);
}

function formatTime(at: number, locale: string): string {
    return new Date(at).toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
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

const Hint = styled.p`
    margin-top: 5px !important;
    color: var(--text-muted) !important;
`;

const HeadActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`;

const Count = styled.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`;

const DebugButton = styled.button`
    padding: 5px 9px;
    border: 1px dashed rgba(251, 191, 36, 0.55);
    border-radius: var(--radius-sm);
    background: rgba(251, 191, 36, 0.1);
    color: #fbbf24;
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`;

const UploadButton = styled.button`
    padding: 5px 9px;
    border: 1px solid rgba(167, 139, 250, 0.55);
    border-radius: var(--radius-sm);
    background: rgba(167, 139, 250, 0.1);
    color: var(--accent-primary);
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: rgba(167, 139, 250, 0.2);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(5, 3, 10, 0.72);
`;

const Dialog = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(520px, 100%);
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        font-size: 11.5px;
        line-height: 1.55;
        color: var(--text-secondary);
    }
`;

const DialogActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
`;

const ActionButton = styled.button`
    padding: 5px 9px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
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

const EditButton = styled.button<{ $editing: boolean }>`
    padding: 5px 10px;
    border: 1px solid ${({$editing}) => $editing ? "rgba(251, 113, 133, 0.6)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$editing}) => $editing ? "rgba(251, 113, 133, 0.12)" : "transparent"};
    color: ${({$editing}) => $editing ? "#fb7185" : "var(--text-secondary)"};
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }
`;

const EditHint = styled.p`
    margin: 0;
    padding: 7px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 10px;
    color: #fb7185;
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

const ListHeader = styled.div<{ $editing: boolean }>`
    display: grid;
    grid-template-columns: ${({$editing}) => $editing
        ? "32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px 92px"
        : "32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px"};
    gap: 10px;
    align-items: center;
    padding: 7px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 9.5px;
    color: var(--text-muted);
`;

const List = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Item = styled.div<{ $editing: boolean }>`
    display: grid;
    grid-template-columns: ${({$editing}) => $editing
        ? "32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px 92px"
        : "32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px"};
    gap: 10px;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    cursor: ${({$editing}) => $editing ? "default" : "pointer"};

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: ${({$editing}) => $editing ? "transparent" : "rgba(167, 139, 250, 0.06)"};
    }
`;

const AvatarCell = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Avatar = styled.span<{ $src?: string }>`
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
`;

const AvatarInitial = styled(Avatar)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 600;
`;

const Name = styled.span`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`;

const NameText = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11.5px;
`;

const Reasons = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 9.5px;
    color: var(--text-muted);
`;

const Threat = styled.span<{ $score: number }>`
    justify-self: start;
    padding: 2px 7px;
    border-radius: 999px;
    background: ${({$score}) => $score >= 100 ? "rgba(251, 113, 133, 0.18)" : "rgba(251, 191, 36, 0.16)"};
    color: ${({$score}) => $score >= 100 ? "#fb7185" : "#fbbf24"};
    font-family: var(--font-mono);
    font-size: 9.5px;
    font-weight: 600;
`;

const Cell = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: var(--text-secondary);
`;

const RemoveButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 3px 7px;
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

const Empty = styled.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;
