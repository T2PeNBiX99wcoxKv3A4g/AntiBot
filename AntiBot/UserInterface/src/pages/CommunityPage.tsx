import {useEffect, useState} from "react";
import styled from "styled-components";
import type {LocalizationKey, Translate} from "@photino-net-utils/bridge";
import {useLocale, useTranslation} from "@photino-net-utils/bridge";
import {type BotEntry, getBots, onBotsChanged} from "../api/bots";
import {
    buildSubmission,
    type CommunityBot,
    type CommunityList,
    communityIssueUrl,
    copyCommunityBody,
    fetchCommunityList,
    MaxPrefilledUrl,
    openCommunityUrl,
} from "../api/community";
import {platformLabel} from "./InstancePage";

/** The shared list submitted through GitHub; local detection stays authoritative. */
export function CommunityPage() {
    const t = useTranslation();
    const locale = useLocale();
    const [localBots, setLocalBots] = useState<BotEntry[]>([]);
    const [community, setCommunity] = useState<CommunityList | null>(null);
    const [downloading, setDownloading] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

    useEffect(() => {
        let cancelled = false;

        void getBots().then((next) => {
            if (!cancelled) setLocalBots(next);
        }, () => undefined);

        const unsubscribe = onBotsChanged((next) => {
            if (!cancelled) setLocalBots(next);
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const download = () => {
        setDownloading(true);
        setNotice(null);

        void fetchCommunityList().then((list) => {
            setCommunity(list);
            setNotice({ok: true, text: t("count_bot_s", {count: list.bots.length})});
        }, () => {
            setNotice({ok: false, text: t("error.community_list")});
        }).finally(() => {
            setDownloading(false);
            window.setTimeout(() => setNotice(null), 6000);
        });
    };

    const upload = () => {
        if (localBots.length === 0) return;

        setUploading(true);
        setNotice(null);

        const {body} = buildSubmission(localBots);
        const url = communityIssueUrl(body);

        if (url.length <= MaxPrefilledUrl) {
            void openCommunityUrl(url).then(() => setUploadOpen(false), (reason) => {
                setUploading(false);
                setNotice({ok: false, text: reason instanceof Error ? reason.message : t("community_upload_failed")});
            }).finally(() => setUploading(false));
            return;
        }

        void copyCommunityBody(body).then(async () => {
            await openCommunityUrl(communityIssueUrl());
            setUploadOpen(false);
            setNotice({ok: true, text: t("community_upload_too_large")});
        }).catch(() => {
            setNotice({ok: false, text: t("community_upload_failed")});
        }).finally(() => setUploading(false));
    };

    const updated = community?.updatedAt
        ? t("community_list_updated", {date: formatDate(community.updatedAt, locale)})
        : undefined;

    return (
        <Page>
            <Card>
                <Head>
                    <div>
                        <h2>{t("community_list")}</h2>
                        <p>{t("community_list_description")}</p>
                    </div>
                    <HeadActions>
                        <Count>{community ? t("count_bot_s", {count: community.bots.length}) : ""}</Count>
                        <ActionButton disabled={downloading} onClick={download} type="button">
                            {downloading ? t("working") : t("download_community_list")}
                        </ActionButton>
                        <UploadButton
                            disabled={localBots.length === 0}
                            onClick={() => setUploadOpen(true)}
                            type="button"
                        >
                            {t("upload_this_list")}
                        </UploadButton>
                    </HeadActions>
                </Head>

                {updated && <Updated>{updated}</Updated>}
                {notice && <Notice $ok={notice.ok}>{notice.text}</Notice>}

                <ListHeader>
                    <span/>
                    <span>{t("user")}</span>
                    <span>{t("threat")}</span>
                    <span>{t("trust")}</span>
                    <span>{t("platform")}</span>
                    <span>{t("last_seen")}</span>
                    <span>{t("times_seen")}</span>
                </ListHeader>

                <List>
                    {!community || community.bots.length === 0 ? (
                        <Empty>{downloading ? t("working") : t("community_list_empty")}</Empty>
                    ) : community.bots.map((bot) => (
                        <Item key={bot.userId}>
                            <AvatarCell>
                                <AvatarInitial>{bot.displayName.slice(0, 1)}</AvatarInitial>
                            </AvatarCell>
                            <Name>
                                <NameText title={bot.userId}>{bot.displayName || bot.userId}</NameText>
                                <Reasons>{reasons(bot, t)}</Reasons>
                            </Name>
                            <Threat $score={bot.threat}>{bot.threat}</Threat>
                            <Cell>{bot.trust || "—"}</Cell>
                            <Cell>{platformLabel(bot.platform, t)}</Cell>
                            <Cell title={formatDate(bot.firstSeen, locale)}>{formatDate(bot.lastSeen, locale)}</Cell>
                            <Cell>{bot.sightings}</Cell>
                        </Item>
                    ))}
                </List>
            </Card>

            {uploadOpen && (
                <Overlay onClick={() => !uploading && setUploadOpen(false)}>
                    <Dialog onClick={(event) => event.stopPropagation()}>
                        <h2>{t("community_upload_title")}</h2>
                        <p>{t("community_upload_explanation")}</p>
                        <p>{t("community_upload_withdraw")}</p>
                        <DialogActions>
                            <ActionButton disabled={uploading} onClick={() => setUploadOpen(false)} type="button">
                                {t("cancel")}
                            </ActionButton>
                            <UploadButton disabled={uploading} onClick={upload} type="button">
                                {uploading ? t("working") : t("open_github")}
                            </UploadButton>
                        </DialogActions>
                    </Dialog>
                </Overlay>
            )}
        </Page>
    );
}

function reasons(bot: CommunityBot, t: Translate): string {
    return bot.reasons.map((reason) => t(reason as LocalizationKey)).join(" · ");
}

function formatDate(value: string | undefined, locale: string): string {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString(locale, {
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

const HeadActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`;

const Count = styled.span`
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`;

const Updated = styled.p`
    margin: 0;
    padding: 7px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 10px;
    color: var(--text-muted);
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

const UploadButton = styled(ActionButton)`
    border-color: rgba(167, 139, 250, 0.55);
    color: var(--accent-primary);
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

const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px;
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

const Item = styled.div`
    display: grid;
    grid-template-columns: 32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px;
    gap: 10px;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
        border-bottom: 0;
    }
`;

const AvatarCell = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AvatarInitial = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--bg-primary);
    box-shadow: inset 0 0 0 1px var(--border-color);
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

const Empty = styled.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
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
