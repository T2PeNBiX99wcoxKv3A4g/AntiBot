import {useEffect, useMemo, useRef, useState, type ReactNode} from "react";
import styled from "styled-components";
import {desktopAvailable, exportLog, type LogLine} from "../api/logs";
import {ArrowDownIcon, DownloadIcon, LogIcon, SearchIcon, TrashIcon, XIcon} from "../components/Icons";
import type {VrchatLog} from "../hooks/useVrchatLog";

const LEVELS = ["debug", "info", "warning", "error"] as const;

const LEVEL_LABELS: Record<string, string> = {
    debug: "Debug",
    info: "Info",
    warning: "Warning",
    error: "Error",
};

const LEVEL_TAGS: Record<string, string> = {
    debug: "DBG",
    info: "INF",
    warning: "WRN",
    error: "ERR",
};

const levelColor = (level: string): string =>
    level === "error" ? "#f87171"
        : level === "warning" ? "#fbbf24"
            : level === "info" ? "#22d3ee"
                : level === "debug" ? "#475569" : "transparent";

interface VisibleLine {
    line: LogLine;
    /** The line's own level, or the one it continues from for lines without a timestamp. */
    level: string;
}

export function LogViewerPage({log}: { log: VrchatLog }) {
    const {status, lines, clear} = log;
    const [query, setQuery] = useState("");
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const [follow, setFollow] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);
    const rowsRef = useRef<HTMLDivElement>(null);

    const visible = useMemo(() => filterLines(lines, query, hidden), [lines, query, hidden]);

    // Keep the newest line in view while following.
    useEffect(() => {
        if (!follow || !rowsRef.current) return;

        rowsRef.current.scrollTop = rowsRef.current.scrollHeight;
    }, [visible, follow]);

    useEffect(() => {
        if (!notice) return;

        const timer = window.setTimeout(() => setNotice(null), 5000);
        return () => window.clearTimeout(timer);
    }, [notice]);

    const toggleLevel = (level: string) => setHidden((current) => {
        const next = new Set(current);
        if (!next.delete(level)) next.add(level);
        return next;
    });

    const handleScroll = () => {
        const element = rowsRef.current;
        if (!element) return;

        const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 48;
        if (atBottom !== follow) setFollow(atBottom);
    };

    const exportLines = async () => {
        setNotice(null);
        setExporting(true);

        try {
            const result = await exportLog();
            if (result.saved) setNotice({text: `Exported ${result.lines} lines to ${result.path}.`});
        } catch (reason) {
            setNotice({text: reason instanceof Error ? reason.message : String(reason), error: true});
        } finally {
            setExporting(false);
        }
    };

    return (
        <Page>
            <Toolbar>
                <ToolbarRow>
                    <SearchBox>
                        <SearchIcon/>
                        <input
                            aria-label="Filter log lines"
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Filter lines…"
                            spellCheck={false}
                            type="search"
                            value={query}
                        />
                        {query && (
                            <ClearSearch aria-label="Clear the filter" onClick={() => setQuery("")} type="button">
                                <XIcon/>
                            </ClearSearch>
                        )}
                    </SearchBox>

                    <Grow/>

                    <ToolbarButton
                        $active={follow}
                        onClick={() => setFollow((value) => !value)}
                        title={follow ? "Stop scrolling as new lines arrive" : "Scroll to the newest line again"}
                        type="button"
                    >
                        <FollowDot $active={follow}/>{follow ? "Following" : "Paused"}
                    </ToolbarButton>

                    <ToolbarButton
                        disabled={lines.length === 0}
                        onClick={clear}
                        title="Clear the view; the log itself is untouched"
                        type="button"
                    >
                        <TrashIcon/>Clear
                    </ToolbarButton>

                    <ToolbarButton
                        disabled={lines.length === 0 || exporting}
                        onClick={exportLines}
                        title="Save every line read so far to a file"
                        type="button"
                    >
                        <DownloadIcon/>{exporting ? "Exporting…" : "Export"}
                    </ToolbarButton>
                </ToolbarRow>

                <Levels>
                    {LEVELS.map((level) => (
                        <LevelChip
                            $level={level}
                            $on={!hidden.has(level)}
                            key={level}
                            onClick={() => toggleLevel(level)}
                            title={`${hidden.has(level) ? "Show" : "Hide"} ${LEVEL_LABELS[level]} lines`}
                            type="button"
                        >
                            <i/>{LEVEL_LABELS[level]}
                        </LevelChip>
                    ))}
                </Levels>
            </Toolbar>

            {notice && (
                <Notice $error={notice.error}>
                    <span>{notice.text}</span>
                    <button aria-label="Dismiss" onClick={() => setNotice(null)} type="button"><XIcon/></button>
                </Notice>
            )}

            <Viewer>
                {!desktopAvailable ? (
                    <EmptyState
                        hint="The log is read through the desktop host. Start AntiBot instead of the browser preview."
                        title="Desktop host required"
                    />
                ) : lines.length === 0 ? (
                    !status.running ? (
                        <EmptyState
                            hint="Nothing is read while VRChat is closed. Its log appears here once it starts."
                            title="VRChat is not running"
                        />
                    ) : !status.exists ? (
                        <EmptyState
                            hint="The configured log folder cannot be found. Set VRChat's log folder in Settings."
                            title="Log folder not found"
                        />
                    ) : (
                        <EmptyState
                            hint="VRChat is starting; lines appear here as soon as it writes them."
                            title="Waiting for the log"
                        />
                    )
                ) : visible.length === 0 ? (
                    <EmptyState
                        hint={query.trim()
                            ? `No line contains “${query.trim()}”.`
                            : "Every line is hidden by the level filter."}
                        title="Nothing matches"
                    />
                ) : (
                    <Rows onScroll={handleScroll} ref={rowsRef}>
                        {visible.map(({line, level}) => line.level === "session" ? (
                            <SessionDivider key={line.id}>new session</SessionDivider>
                        ) : (
                            <Row $level={level} key={line.id}>
                                <Time>{line.time}</Time>
                                <Tag $level={level}>{line.level ? LEVEL_TAGS[level] ?? line.level : ""}</Tag>
                                <Message $level={level}>{highlight(line.message, query)}</Message>
                            </Row>
                        ))}
                    </Rows>
                )}

                {!follow && visible.length > 0 && (
                    <JumpButton onClick={() => setFollow(true)} type="button">
                        <ArrowDownIcon/>Jump to latest
                    </JumpButton>
                )}
            </Viewer>

            <StatusBar>
                <span>
                    {visible.length === lines.length
                        ? `${lines.length} lines`
                        : `${visible.length} of ${lines.length} lines`}
                </span>
                <span>{status.running ? "VRChat running" : "VRChat not running"}</span>
            </StatusBar>
        </Page>
    );
}

/** Applies the level and text filters, carrying a continuation line's level over from its parent. */
function filterLines(lines: LogLine[], query: string, hidden: Set<string>): VisibleLine[] {
    const needle = query.trim().toLowerCase();
    const visible: VisibleLine[] = [];
    let inherited = "";

    for (const line of lines) {
        if (line.level) inherited = line.level;

        const level = line.level || inherited;
        if (hidden.has(level)) continue;
        if (needle && !line.message.toLowerCase().includes(needle)) continue;

        visible.push({line, level});
    }

    return visible;
}

function highlight(text: string, query: string) {
    const needle = query.trim();
    if (!needle) return text;

    const parts = text.split(new RegExp(`(${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    const lower = needle.toLowerCase();

    return parts.map((part, index) => part.toLowerCase() === lower
        ? <mark key={index}>{part}</mark>
        : part);
}

function EmptyState({title, hint, children}: { title: string; hint: string; children?: ReactNode }) {
    return (
        <EmptyBox>
            <LogIcon size={28}/>
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
    gap: 10px;
    min-height: 0;
`;

const Toolbar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ToolbarRow = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

const Grow = styled.span`
    flex: 1;
`;

const SearchBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 180px;
    max-width: 360px;

    svg {
        position: absolute;
        left: 9px;
        color: var(--text-muted);
        pointer-events: none;
    }

    input {
        width: 100%;
        padding: 7px 28px 7px 30px;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        background: var(--bg-input);
        color: var(--text-primary);
        font: inherit;
        font-size: 12px;

        &::placeholder {
            color: var(--text-muted);
        }

        &:focus {
            outline: none;
            border-color: var(--border-color-hover);
        }

        &::-webkit-search-cancel-button {
            display: none;
        }
    }
`;

const ClearSearch = styled.button`
    position: absolute;
    right: 6px;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        color: var(--text-primary);
        background: var(--bg-card-hover);
    }
`;

const Levels = styled.div`
    display: flex;
    gap: 4px;
`;

const LevelChip = styled.button<{ $level: string; $on: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border: 1px solid ${({$on, $level}) => $on ? `${levelColor($level)}66` : "var(--border-color)"};
    border-radius: 999px;
    background: ${({$on, $level}) => $on ? `${levelColor($level)}14` : "transparent"};
    color: ${({$on}) => $on ? "var(--text-primary)" : "var(--text-muted)"};
    font: inherit;
    font-family: var(--font-mono);
    font-size: 10px;
    cursor: pointer;
    opacity: ${({$on}) => $on ? 1 : 0.45};
    text-decoration: ${({$on}) => $on ? "none" : "line-through"};

    i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${({$on, $level}) => $on ? levelColor($level) : "var(--text-muted)"};
    }

    &:hover {
        border-color: var(--border-color-hover);
    }
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border: 1px solid ${({$active}) => $active ? "var(--border-color-hover)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$active}) => $active ? "rgba(34, 211, 238, 0.08)" : "var(--bg-card)"};
    color: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-secondary)"};
    font: inherit;
    font-family: var(--font-mono);
    font-size: 10px;
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

const FollowDot = styled.span<{ $active: boolean }>`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-muted)"};
    box-shadow: ${({$active}) => $active ? "0 0 8px var(--accent-primary)" : "none"};
`;

const Notice = styled.div<{ $error?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 12px;
    border: 1px solid ${({$error}) => $error ? "rgba(248, 113, 113, 0.3)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$error}) => $error ? "rgba(248, 113, 113, 0.08)" : "var(--bg-card)"};
    color: ${({$error}) => $error ? "var(--danger)" : "var(--text-secondary)"};
    font-size: 11px;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
    }
`;

const Viewer = styled.section`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(6, 10, 17, 0.6);
`;

const Rows = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 6px 0 12px;
    font-family: var(--font-mono);
    font-size: 11.5px;
`;

const Row = styled.div<{ $level: string }>`
    display: grid;
    grid-template-columns: 62px 34px minmax(0, 1fr);
    gap: 10px;
    padding: 0 14px;
    border-left: 2px solid ${({$level}) => levelColor($level)};
    line-height: 1.7;
    content-visibility: auto;
    contain-intrinsic-size: auto 20px;

    &:hover {
        background: rgba(148, 163, 184, 0.06);
    }
`;

const Time = styled.span`
    color: var(--text-muted);
    white-space: nowrap;
`;

const SessionDivider = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    color: var(--text-muted);
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    &::before,
    &::after {
        content: "";
        height: 1px;
        flex: 1;
        background: var(--border-color);
    }

    &:hover {
        color: var(--text-secondary);
    }
`;

const Tag = styled.span<{ $level: string }>`
    color: ${({$level}) => levelColor($level)};
    font-size: 9px;
    letter-spacing: 0.04em;
    line-height: 1.95;
    opacity: 0.85;
`;

const Message = styled.span<{ $level: string }>`
    color: ${({$level}) => $level === "error" ? "#fecaca" : $level === "warning" ? "#fde68a" : "var(--text-secondary)"};
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    mark {
        border-radius: 2px;
        background: rgba(34, 211, 238, 0.25);
        color: var(--text-primary);
    }
`;

const JumpButton = styled.button`
    position: absolute;
    right: 18px;
    bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border: 1px solid var(--border-color-hover);
    border-radius: 999px;
    background: var(--bg-secondary);
    color: var(--accent-primary);
    font: inherit;
    font-size: 11px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);

    &:hover {
        background: var(--bg-card-hover);
    }
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

const StatusBar = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 2px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;
