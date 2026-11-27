import {useEffect, useState} from "react";
import styled from "styled-components";
import type {LocalizationKey, Translate} from "@photino-net-utils/bridge";
import {useLocale, useTranslation} from "@photino-net-utils/bridge";
import {
    type CommunityBot,
    type CommunityList,
    getCommunity,
    onCommunityChanged,
    refreshCommunity,
} from "../api/community";
import {platformLabel} from "./InstancePage";

/** The shared list the background service downloads and the automatic actions also use. */
export function CommunityPage() {
    const t = useTranslation();
    const locale = useLocale();
    const [community, setCommunity] = useState<CommunityList | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onCommunityChanged((next) => {
            if (!cancelled) setCommunity(next);
        });

        void getCommunity().then((next) => {
            if (!cancelled) setCommunity(next);
        }, () => {
            // The host failed to answer; the empty state already covers it.
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const refresh = () => {
        setRefreshing(true);
        setNotice(null);

        void refreshCommunity().then(async () => {
            const next = await getCommunity();
            setCommunity(next);
            setNotice({ok: true, text: t("count_bot_s", {count: next.bots.length})});
        }, () => {
            setNotice({ok: false, text: t("error.community_list")});
        }).catch(() => {
            setNotice({ok: false, text: t("error.community_list")});
        }).finally(() => {
            setRefreshing(false);
            window.setTimeout(() => setNotice(null), 6000);
        });
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
                        <Hint>{t("community_list_is_downloaded_automatically_and_used_by_automatic_protection")}</Hint>
                    </div>
                    <HeadActions>
                        <Count>{community ? t("count_bot_s", {count: community.bots.length}) : ""}</Count>
                        <ActionButton disabled={refreshing} onClick={refresh} type="button">
                            {refreshing ? t("working") : t("download_community_list")}
                        </ActionButton>
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
                        <Empty>{refreshing ? t("working") : t("community_list_empty")}</Empty>
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
