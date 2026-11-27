// Community bot list submissions. A maintainer applies `approved` to merge an issue and closing a
// merged issue withdraws the entries it contributed.
const marker = /<!-- antibot-community-bots:v1 -->([\s\S]*?)<!-- \/antibot-community-bots -->/;
const dataPath = "data/community-bots.json";
const branch = "master";
const maxSubmitted = 200;
const maxStored = 5000;

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
    const isCommunity = marker.test(body) || hasLabel("community-bots");

    if (!isCommunity) return;

    if (action === "opened" || action === "edited") {
        const parsed = parseSubmission(body);
        if (!parsed.ok) {
            await comment(`This submission could not be read: ${parsed.error}\n\nFix the JSON between the markers and save the issue.`);
            return;
        }

        await ensureLabel("community-bots", "5319e7", "A community bot list submission");
        await ensureLabel("approved", "0e8a16", "Merge the community bot list submission");
        await ensureLabel("merged", "1d76db", "The community bot list submission is merged");
        await addLabel("community-bots");
        await comment(
            `Received ${parsed.bots.length} bot(s). ${parsed.skipped > 0 ? `${parsed.skipped} invalid row(s) were skipped. ` : ""}` +
            "A maintainer will review this issue. Adding `approved` merges it; closing the issue withdraws its entries.");
        core.info(`Validated ${parsed.bots.length} bot(s) from issue #${issue.number}`);
        return;
    }

    if (action === "labeled" && context.payload.label?.name === "approved") {
        const parsed = parseSubmission(body);
        if (!parsed.ok) {
            await comment(`This submission could not be read: ${parsed.error}`);
            return;
        }

        await merge(parsed.bots, issue.number);
        await ensureLabel("merged", "1d76db", "The community bot list submission is merged");
        await addLabel("merged");
        await comment(
            `Merged ${parsed.bots.length} bot(s). Close this issue to withdraw the entries it contributed.`);
        core.info(`Merged ${parsed.bots.length} bot(s) from issue #${issue.number}`);
        return;
    }

    if (action === "closed" && hasLabel("merged")) {
        const removed = await withdraw(issue.number);
        await comment(`Withdrawn ${removed} entr${removed === 1 ? "y" : "ies"} submitted by this issue.`);
        core.info(`Withdrew ${removed} entr${removed === 1 ? "y" : "ies"} from issue #${issue.number}`);
    }
}

function parseSubmission(body) {
    const block = body.match(marker);
    if (!block) return {ok: false, error: "the submission markers are missing"};

    const json = block[1]
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    let submission;
    try {
        submission = JSON.parse(json);
    } catch {
        return {ok: false, error: "the JSON between the markers is not valid"};
    }

    if (!submission || submission.v !== 1 || !Array.isArray(submission.bots))
        return {ok: false, error: "expected a version 1 submission with a bots array"};

    if (submission.bots.length > maxSubmitted)
        return {ok: false, error: `at most ${maxSubmitted} bots can be submitted at once`};

    const byUser = new Map();
    let skipped = 0;

    for (const value of submission.bots) {
        const bot = normalize(value);
        if (!bot) {
            skipped++;
            continue;
        }

        const previous = byUser.get(bot.u);
        if (!previous || bot.t >= previous.t) byUser.set(bot.u, bot);
    }

    if (byUser.size === 0)
        return {ok: false, error: "none of the rows had a valid user id and threat"};

    return {ok: true, bots: [...byUser.values()], skipped};
}

function normalize(value) {
    if (!value || typeof value !== "object") return null;

    const userId = typeof value.u === "string" ? value.u.trim() : "";
    if (!/^usr_[A-Za-z0-9-]{8,64}$/.test(userId)) return null;

    const threat = Number(value.t);
    if (!Number.isFinite(threat) || threat < 0 || threat > 1000) return null;

    const name = typeof value.n === "string" ? value.n.trim().slice(0, 200) : "";
    const platform = typeof value.p === "string" ? value.p.trim().slice(0, 50) : "";
    const firstSeen = dateOrUndefined(value.f);
    const lastSeen = dateOrUndefined(value.s) ?? firstSeen;
    const sightings = Number.isFinite(Number(value.c)) ? Math.min(Math.max(Number(value.c), 1), 1000) : 1;
    const reasons = Array.isArray(value.r)
        ? value.r
            .filter((reason) => typeof reason === "string" && reason.trim().length > 0)
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

async function withdraw(issueNumber) {
    const {data, sha} = await readData();
    let removed = 0;

    data.bots = (Array.isArray(data.bots) ? data.bots : []).filter((bot) => {
        const sources = Array.isArray(bot.sources) ? bot.sources : [];

        // A row with no source predates this workflow; never remove it automatically.
        if (sources.length === 0) return true;

        const kept = sources.filter((source) => source !== issueNumber);
        if (kept.length === sources.length) return true;
        if (kept.length > 0) {
            bot.sources = kept;
            return true;
        }

        removed++;
        return false;
    });

    if (removed === 0) return 0;

    data.version = 1;
    data.updatedAt = new Date().toISOString();
    await writeData(data, sha, `data(community): withdraw issue #${issueNumber}`);
    return removed;
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
