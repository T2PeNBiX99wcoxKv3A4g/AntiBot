import {Native} from "@photino-net-utils/bridge";
import {readBlock} from "./data";
import {toReasons, type ThreatReason} from "./instance";

/** One account AntiBot called a bot; a user id appears only once. */
export interface BotEntry {
    userId: string;
    displayName: string;
    threat: number;
    reasons: ThreatReason[];
    avatarUrl?: string;
    trust?: string;
    platform?: string;
    dateJoined?: string;
    /** Unix milliseconds of the first and the most recent detection. */
    firstSeen: number;
    lastSeen: number;
    /** How many different instances the account was seen in. */
    sightings: number;
}

export interface BotExport {
    saved: boolean;
    count: number;
    path?: string;
}

export async function getBots(): Promise<BotEntry[]> {
    if (!Native.available) return [];

    return await fetchBots();
}

export function onBotsChanged(handler: (bots: BotEntry[]) => void): () => void {
    return Native.on((message) => {
        if (message.type !== "bots.changed") return;

        void fetchBots().then(handler, () => {
            // The host did not answer; the list on screen stays as it was.
        });
    });
}

/** Hides a row the user called a false positive; it stays hidden after a restart. */
export async function removeBot(userId: string): Promise<void> {
    if (!Native.available) return;

    await Native.request("bots.remove", {userId});
}

/** Writes the list to the Downloads folder and answers with the path. */
export async function exportBots(format: "json" | "csv"): Promise<BotExport> {
    if (!Native.available) return {saved: false, count: 0};

    return await Native.request<BotExport>("bots.export", {format});
}

async function fetchBots(): Promise<BotEntry[]> {
    const block = await readBlock("/bots");

    return block.rows.map((row) => ({
        userId: String(row.userId ?? ""),
        displayName: String(row.name ?? ""),
        threat: Number(row.threat ?? 0),
        reasons: toReasons(String(row.reasons ?? "")),
        avatarUrl: String(row.avatar ?? "") || undefined,
        trust: String(row.trust ?? "") || undefined,
        platform: String(row.platform ?? "") || undefined,
        dateJoined: String(row.dateJoined ?? "") || undefined,
        firstSeen: Number(row.firstSeen ?? 0),
        lastSeen: Number(row.lastSeen ?? 0),
        sightings: Number(row.sightings ?? 0),
    }));
}
