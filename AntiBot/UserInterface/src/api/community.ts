import {Native} from "@photino-net-utils/bridge";
import type {BotEntry} from "./bots";

/** The repository the community list and the submission form live in. */
const Repository = "T2PeNBiX99wcoxKv3A4g/AntiBot";
const Branch = "master";

/** The raw list every instance downloads; GitHub Pages would work too. */
export const communityListUrl =
    `https://raw.githubusercontent.com/${Repository}/${Branch}/data/community-bots.json`;

const issueUrl = `https://github.com/${Repository}/issues/new`;
const marker = "antibot-community-bots:v1";

/** A link longer than this is not reliable in every browser. */
export const MaxPrefilledUrl = 7000;

/** One row of the shared list, as the repository stores it. */
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

/** Downloads the shared list. It is advisory only; nothing here is acted on. */
export async function fetchCommunityList(): Promise<CommunityList> {
    const response = await fetch(`${communityListUrl}?t=${Date.now()}`, {cache: "no-store"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json() as { updatedAt?: unknown; bots?: unknown };
    if (!Array.isArray(data.bots)) throw new Error("invalid community list");

    const byId = new Map<string, CommunityBot>();

    for (const value of data.bots.slice(0, 5000)) {
        const bot = toCommunityBot(value);
        if (!bot) continue;

        const previous = byId.get(bot.userId);
        if (!previous || bot.threat >= previous.threat) byId.set(bot.userId, bot);
    }

    const bots = [...byId.values()].sort((left, right) => dateOf(right.lastSeen) - dateOf(left.lastSeen));

    return {updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : "", bots};
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

function toCommunityBot(value: unknown): CommunityBot | null {
    if (!value || typeof value !== "object") return null;

    const row = value as Record<string, unknown>;
    const userId = typeof row.userId === "string" ? row.userId : "";
    if (!/^usr_[A-Za-z0-9-]{8,64}$/.test(userId)) return null;

    return {
        userId,
        displayName: typeof row.displayName === "string" ? row.displayName : "",
        threat: typeof row.threat === "number" ? row.threat : 0,
        reasons: Array.isArray(row.reasons)
            ? row.reasons
                .map((reason) => typeof reason === "string"
                    ? reason
                    : reason && typeof reason === "object" && "text" in reason
                        ? String((reason as { text?: unknown }).text ?? "")
                        : "")
                .filter((reason) => reason.length > 0)
            : [],
        platform: typeof row.platform === "string" ? row.platform : undefined,
        trust: typeof row.trust === "string" ? row.trust : undefined,
        firstSeen: typeof row.firstSeen === "string" ? row.firstSeen : undefined,
        lastSeen: typeof row.lastSeen === "string" ? row.lastSeen : undefined,
        sightings: typeof row.sightings === "number" ? row.sightings : 1,
    };
}

function isoOf(milliseconds: number): string | undefined {
    return milliseconds > 0 ? new Date(milliseconds).toISOString() : undefined;
}

function dateOf(value: string | undefined): number {
    const time = value ? Date.parse(value) : 0;
    return Number.isNaN(time) ? 0 : time;
}
