import {Native} from "@photino-net-utils/bridge";
import type {BotEntry} from "./bots";
import {readBlock} from "./data";

/** The repository the submission form lives in. */
const Repository = "T2PeNBiX99wcoxKv3A4g/AntiBot";
const issueUrl = `https://github.com/${Repository}/issues/new`;
const marker = "antibot-community-bots:v1";

/** A link longer than this is not reliable in every browser. */
export const MaxPrefilledUrl = 7000;

/** One row of the community list, as the host serves it. */
export interface CommunityBot {
    userId: string;
    displayName: string;
    threat: number;
    reasons: string[];
    platform?: string;
    trust?: string;
    firstSeen?: string;
    lastSeen?: string;
    sightings: number;
}

export interface CommunityList {
    updatedAt: string;
    bots: CommunityBot[];
}

export interface CommunitySubmission {
    v: 1;
    id: string;
    at: string;
    bots: {
        u: string;
        n: string;
        t: number;
        r: string[];
        p?: string;
        f?: string;
        s?: string;
        c: number;
    }[];
}

/** Reads the list the background service downloaded; the page never calls GitHub itself. */
export async function getCommunity(): Promise<CommunityList> {
    if (!Native.available) return {updatedAt: "", bots: []};

    return await fetchCommunity();
}

/** The background service reports a new list with this ping. */
export function onCommunityChanged(handler: (list: CommunityList) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "community.changed") return;

        void fetchCommunity().then(handler, () => {
            // The host did not answer; the list on screen stays as it was.
        });
    });
}

/** Asks the host to download the list now instead of waiting for the next interval. */
export async function refreshCommunity(): Promise<void> {
    if (!Native.available) return;

    await Native.request("community.refresh");
}

/** Builds the compact payload the workflow reads, plus the issue body around it. */
export function buildSubmission(bots: BotEntry[]): { submission: CommunitySubmission; body: string } {
    const submission: CommunitySubmission = {
        v: 1,
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        at: new Date().toISOString(),
        bots: bots.slice(0, 200).map((bot) => ({
            u: bot.userId,
            n: bot.displayName,
            t: bot.threat,
            r: bot.reasons.map((reason) => reason.text),
            p: bot.platform,
            f: isoOf(bot.firstSeen),
            s: isoOf(bot.lastSeen),
            c: bot.sightings,
        })),
    };

    return {
        submission,
        body: [
            `<!-- ${marker} -->`,
            "```json",
            JSON.stringify(submission),
            "```",
            `<!-- /${marker} -->`,
            "",
            "Submitted by AntiBot. A workflow validates and merges this automatically.",
        ].join("\n"),
    };
}

/** The new-issue page; with a body GitHub uses it directly, otherwise it shows the template. */
export function communityIssueUrl(body?: string): string {
    const params = new URLSearchParams({title: "[community] Bot list submission"});

    if (body) {
        params.set("body", body);
    } else {
        params.set("template", "community-bots.md");
    }

    return `${issueUrl}?${params.toString()}`;
}

/** Opens the GitHub page through the host; a browser preview uses a normal tab. */
export async function openCommunityUrl(url: string): Promise<void> {
    if (!Native.available) {
        window.open(url, "_blank", "noreferrer");
        return;
    }

    await Native.request("community.open", {url});
}

/** Puts the issue body on the clipboard for the paste fallback. */
export async function copyCommunityBody(body: string): Promise<void> {
    await navigator.clipboard.writeText(body);
}

async function fetchCommunity(): Promise<CommunityList> {
    const block = await readBlock("/community");

    return {
        updatedAt: String(block.meta.updatedAt ?? ""),
        bots: block.rows.map((row) => ({
            userId: String(row.userId ?? ""),
            displayName: String(row.name ?? ""),
            threat: Number(row.threat ?? 0),
            reasons: String(row.reasons ?? "").split("\u001f").filter((reason) => reason.length > 0),
            platform: String(row.platform ?? "") || undefined,
            trust: String(row.trust ?? "") || undefined,
            firstSeen: String(row.firstSeen ?? "") || undefined,
            lastSeen: String(row.lastSeen ?? "") || undefined,
            sightings: Number(row.sightings ?? 0),
        })),
    };
}

function isoOf(milliseconds: number): string | undefined {
    return milliseconds > 0 ? new Date(milliseconds).toISOString() : undefined;
}
