// Community bot list submissions. The user attaches the JSON file exported by AntiBot; a maintainer
// applies `approved` to merge it. Closing an unapproved issue means it is not used, and approval is
// permanent even if the issue is closed later.
const marker = "antibot-community-bots";
const dataPath = "data/community-bots.json";
const branch = "master";
const maxSubmitted = 200;
const maxStored = 5000;
const maxFileBytes = 1_000_000;
const attachmentPattern =
    /https:\/\/(?:github\.com\/user-attachments\/assets|user-images\.githubusercontent\.com|private-user-images\.githubusercontent\.com)\/[^\s)\]"'<>]+/g;

let github;
let context;
let core;

module.exports = async (args) => {
    github = args.github;
    context = args.context;
    core = args.core;

    return run();
};

async function run() {
    const issue = context.payload.issue;
    if (!issue || issue.pull_request) return;

    const action = context.payload.action;
    const body = issue.body ?? "";
    const hasLabel = (name) => (issue.labels ?? [])
        .some((label) => (typeof label === "string" ? label : label.name) === name);
    const isCommunity = body.includes(marker) || hasLabel("community-bots") ||
        (issue.title ?? "").startsWith("[community]");

    if (!isCommunity) return;

    if (action === "opened" || action === "edited") {
        const parsed = await parseAttachments(body);
        if (!parsed.ok) {
            await comment(parsed.error);
            return;
        }

        await ensureLabel("community-bots", "5319e7", "A community bot list submission");
        await ensureLabel("approved", "0e8a16", "Merge the community bot list submission");
        await ensureLabel("merged", "1d76db", "The community bot list submission is merged");
        await addLabel("community-bots");
        await comment(
            `Received ${parsed.bots.length} bot(s) from the attached file. ` +
            "A maintainer adds `approved` to merge it. Closing the issue without approval means it is not used.");
        core.info(`Validated ${parsed.bots.length} bot(s) from issue #${issue.number}`);
        return;
    }

    if (action === "labeled" && context.payload.label?.name === "approved") {
        const parsed = await parseAttachments(body);
        if (!parsed.ok) {
            await comment(parsed.error);
            return;
        }

        await merge(parsed.bots, issue.number);
        await ensureLabel("merged", "1d76db", "The community bot list submission is merged");
        await addLabel("merged");
        await comment(
            `Merged ${parsed.bots.length} bot(s). They stay merged even if this issue is closed.`);
        core.info(`Merged ${parsed.bots.length} bot(s) from issue #${issue.number}`);
    }
}

async function parseAttachments(body) {
    const urls = [...new Set(body.match(attachmentPattern) ?? [])];
    if (urls.length === 0)
        return {
            ok: false,
            error: "Attach the JSON file exported by AntiBot to this issue, then save it. The workflow reads the attachment automatically.",
        };

    const byUser = new Map();
    let skipped = 0;
    const errors = [];

    for (const url of urls) {
        try {
            const text = await download(url);
            const data = JSON.parse(text);
            const rows = Array.isArray(data) ? data : data.bots;

            if (!Array.isArray(rows))
                throw new Error("the file has no bots array");

            for (const value of rows.slice(0, maxSubmitted)) {
                const bot = normalize(value);
                if (!bot) {
                    skipped++;
                    continue;
                }

                const previous = byUser.get(bot.u);
                if (!previous || bot.t >= previous.t) byUser.set(bot.u, bot);
            }
        } catch (error) {
            errors.push(String(error.message ?? error));
        }
    }

    if (byUser.size === 0)
        return {
            ok: false,
            error: `No valid bot rows were found in the attached file(s). ${errors.length > 0 ? `Errors: ${errors.join("; ")}` : ""}`.trim(),
        };

    return {ok: true, bots: [...byUser.values()], skipped};
}

async function download(url) {
    let response = await fetch(url, {
        redirect: "follow",
        headers: {"User-Agent": "AntiBot-community-workflow"},
    });

    // Some attachment URLs only answer when the workflow is authenticated.
    if (response.status === 401 || response.status === 403) {
        response = await fetch(url, {
            redirect: "follow",
            headers: {
                "User-Agent": "AntiBot-community-workflow",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });
    }

    if (!response.ok)
        throw new Error(`attachment answered HTTP ${response.status}`);

    const text = await response.text();
    if (text.length > maxFileBytes)
        throw new Error("the attached file is too large");

    return text;
}

function normalize(value) {
    if (!value || typeof value !== "object") return null;

    const rawUserId = value.u ?? value.userId;
    const userId = typeof rawUserId === "string" ? rawUserId.trim() : "";
    if (!/^usr_[A-Za-z0-9-]{8,64}$/.test(userId)) return null;

    const threat = Number(value.t ?? value.threat);
    if (!Number.isFinite(threat) || threat < 0 || threat > 1000) return null;

    const rawName = value.n ?? value.displayName;
    const name = typeof rawName === "string" ? rawName.trim().slice(0, 200) : "";
    const rawPlatform = value.p ?? value.platform;
    const platform = typeof rawPlatform === "string" ? rawPlatform.trim().slice(0, 50) : "";
    const firstSeen = dateOrUndefined(value.f ?? value.firstSeen);
    const lastSeen = dateOrUndefined(value.s ?? value.lastSeen) ?? firstSeen;
    const sightings = Number.isFinite(Number(value.c ?? value.sightings))
        ? Math.min(Math.max(Number(value.c ?? value.sightings), 1), 1000)
        : 1;
    const rawReasons = value.r ?? value.reasons;
    const reasons = Array.isArray(rawReasons)
        ? rawReasons
            .map((reason) => typeof reason === "string"
                ? reason
                : reason && typeof reason === "object" && typeof reason.text === "string"
                    ? reason.text
                    : "")
            .filter((reason) => reason.trim().length > 0)
            .map((reason) => reason.trim().slice(0, 100))
            .slice(0, 20)
        : [];

    return {
        u: userId,
        n: name || userId,
        t: Math.round(threat),
        r: [...new Set(reasons)],
        p: platform || undefined,
        f: firstSeen,
        s: lastSeen,
        c: Math.round(sightings),
    };
}

function dateOrUndefined(value) {
    if (typeof value !== "string") return undefined;

    const time = Date.parse(value);
    return Number.isNaN(time) ? undefined : new Date(time).toISOString();
}

async function merge(bots, issueNumber) {
    const {data, sha} = await readData();
    const now = new Date().toISOString();
    const byUser = new Map(
        (Array.isArray(data.bots) ? data.bots : [])
            .filter((bot) => bot && typeof bot.userId === "string")
            .map((bot) => [bot.userId, bot]));

    for (const bot of bots) {
        const existing = byUser.get(bot.u);

        if (existing) {
            existing.displayName = bot.n || existing.displayName;
            existing.threat = Math.max(Number(existing.threat) || 0, bot.t);
            existing.reasons = [...new Set([...(existing.reasons ?? []), ...bot.r])].slice(0, 40);
            existing.platform = bot.p || existing.platform;
            existing.firstSeen = earlier(existing.firstSeen, bot.f);
            existing.lastSeen = later(existing.lastSeen, bot.s);
            existing.sightings = Math.max(Number(existing.sightings) || 1, bot.c);
            existing.sources = [...new Set([...(existing.sources ?? []), issueNumber])];
            continue;
        }

        byUser.set(bot.u, {
            userId: bot.u,
            displayName: bot.n,
            threat: bot.t,
            reasons: bot.r,
            platform: bot.p,
            firstSeen: bot.f,
            lastSeen: bot.s,
            sightings: bot.c,
            sources: [issueNumber],
        });
    }

    data.version = 1;
    data.updatedAt = now;
    data.bots = [...byUser.values()]
        .sort((left, right) => timeOf(right.lastSeen) - timeOf(left.lastSeen))
        .slice(0, maxStored);

    await writeData(data, sha, `data(community): merge issue #${issueNumber}`);
}

async function readData() {
    const {owner, repo} = context.repo;
    const response = await github.rest.repos.getContent({owner, repo, path: dataPath, ref: branch});
    const file = response.data;

    if (Array.isArray(file) || typeof file.content !== "string")
        throw new Error(`${dataPath} is not a file`);

    return {
        data: JSON.parse(Buffer.from(file.content, "base64").toString("utf8")),
        sha: file.sha,
    };
}

async function writeData(data, sha, message) {
    const {owner, repo} = context.repo;
    await github.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: dataPath,
        branch,
        message,
        sha,
        content: Buffer.from(`${JSON.stringify(data, null, 2)}\n`).toString("base64"),
    });
}

async function comment(text) {
    const {owner, repo} = context.repo;
    await github.rest.issues.createComment({
        owner,
        repo,
        issue_number: context.payload.issue.number,
        body: text,
    });
}

async function ensureLabel(name, color, description) {
    const {owner, repo} = context.repo;

    try {
        await github.rest.issues.getLabel({owner, repo, name});
    } catch (error) {
        if (error.status !== 404) throw error;

        await github.rest.issues.createLabel({owner, repo, name, color, description})
            .catch(() => undefined);
    }
}

async function addLabel(name) {
    const {owner, repo} = context.repo;
    await github.rest.issues.addLabels({
        owner,
        repo,
        issue_number: context.payload.issue.number,
        labels: [name],
    }).catch(() => undefined);
}

function earlier(left, right) {
    if (!left) return right;
    if (!right) return left;
    return timeOf(left) <= timeOf(right) ? left : right;
}

function later(left, right) {
    if (!left) return right;
    if (!right) return left;
    return timeOf(left) >= timeOf(right) ? left : right;
}

function timeOf(value) {
    const time = value ? Date.parse(value) : 0;
    return Number.isNaN(time) ? 0 : time;
}
