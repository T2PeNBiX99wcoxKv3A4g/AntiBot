import {useEffect, useRef, useState} from "react";
import {
    emptyStatus,
    getLogSnapshot,
    onLogLines,
    type LogBatch,
    type LogLine,
    type LogStatus,
} from "../api/logs";

/** How many lines the page keeps. Older ones are dropped; the log itself is untouched. */
const MAX_LINES = 3000;

export interface VrchatLog {
    status: LogStatus;
    lines: LogLine[];
    /** Drops what was received so far; the follower keeps reading the file. */
    clear: () => void;
}

/** Follows the live log: one snapshot on mount, then every line the host pushes. */
export function useVrchatLog(): VrchatLog {
    const [status, setStatus] = useState<LogStatus>(emptyStatus);
    const [lines, setLines] = useState<LogLine[]>([]);

    /** Ceiling set by "clear", so lines the host already buffered do not come back. */
    const clearedUpTo = useRef(0);

    /** Whether a live batch already arrived; its file is newer than the snapshot's. */
    const receivedBatch = useRef(false);

    useEffect(() => {
        let cancelled = false;

        // Subscribe first, so a line written between the snapshot request and its reply is not lost.
        const unsubscribe = onLogLines((batch) => {
            if (cancelled) return;

            receivedBatch.current = true;
            setStatus((current) => ({
                ...current,
                file: batch.file ?? null,
                modifiedAt: batch.modifiedAt ?? null,
            }));
            setLines((current) => appendBatch(current, batch, clearedUpTo.current));
        });

        void getLogSnapshot().then(
            (snapshot) => {
                if (cancelled) return;

                setStatus((current) => receivedBatch.current
                    ? {
                        ...current,
                        directory: snapshot.directory ?? current.directory,
                        exists: snapshot.exists ?? current.exists,
                    }
                    : {
                        directory: snapshot.directory ?? "",
                        exists: snapshot.exists ?? false,
                        file: snapshot.file ?? null,
                        modifiedAt: snapshot.modifiedAt ?? null,
                    });
                setLines((current) => mergeSnapshot(current, snapshot.lines, clearedUpTo.current));
            },
            () => {
                // The host is older than the page or failed to answer; the empty state already says so.
            },
        );

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const clear = () => {
        clearedUpTo.current = lines.at(-1)?.id ?? clearedUpTo.current;
        setLines([]);
    };

    return {status, lines, clear};
}

function appendBatch(current: LogLine[], batch: LogBatch, clearedUpTo: number): LogLine[] {
    const incoming = batch.lines.filter((line) => line.id > clearedUpTo);

    if (batch.reset) return incoming.slice(-MAX_LINES);

    const merged = [...current, ...incoming];
    return merged.length > MAX_LINES ? merged.slice(-MAX_LINES) : merged;
}

/** Combines the snapshot with anything already pushed, so no line is lost to the reply order. */
function mergeSnapshot(current: LogLine[], incoming: LogLine[], clearedUpTo: number): LogLine[] {
    const newest = current.at(-1)?.id ?? 0;

    const merged = [...current, ...incoming.filter((line) => line.id > newest && line.id > clearedUpTo)];
    return merged.length > MAX_LINES ? merged.slice(-MAX_LINES) : merged;
}
