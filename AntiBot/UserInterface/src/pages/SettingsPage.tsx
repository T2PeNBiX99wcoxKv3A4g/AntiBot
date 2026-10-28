import {useState} from "react";
import styled from "styled-components";
import {desktopAvailable, fileName, openLogFolder, type LogStatus} from "../api/logs";
import type {AppInfo} from "../api/system";
import {FolderIcon, InfoIcon} from "../components/Icons";

interface SettingsPageProps {
    status: LogStatus;
    info: AppInfo | null;
}

export function SettingsPage({status, info}: SettingsPageProps) {
    const [error, setError] = useState<string | null>(null);

    const revealFolder = async () => {
        setError(null);

        try {
            await openLogFolder();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        }
    };

    return (
        <Stack>
            <Section>
                <SectionHeader>
                    <h2>Log source</h2>
                    <span>read-only</span>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>VRChat log folder</Label>
                        <Value $mono>{status.directory || "unknown"}</Value>
                        <Hint>
                            {status.exists
                                ? "The newest output_log_*.txt in this folder is followed."
                                : "This folder does not exist yet; start VRChat once and it will be created."}
                        </Hint>
                    </Field>

                    <Field>
                        <Label>Following</Label>
                        <Value $mono>{fileName(status.file) ?? "waiting for VRChat"}</Value>
                        <Hint>
                            {status.file
                                ? `Last written ${formatTime(status.modifiedAt)}.`
                                : "Start VRChat and the log appears here without any configuration."}
                        </Hint>
                    </Field>

                    {error && <ErrorText>{error}</ErrorText>}

                    <Actions>
                        <Button disabled={!desktopAvailable || !status.exists} onClick={revealFolder} type="button">
                            <FolderIcon/>Open log folder
                        </Button>
                    </Actions>
                </Card>
            </Section>

            <Callout>
                <InfoIcon/>
                <div>
                    <strong>The log is only read.</strong>
                    <p>
                        AntiBot opens the file with shared read access, so VRChat keeps writing while the
                        viewer follows it. When a new session writes a new log, the viewer switches to that
                        file instead of staying on the old one.
                    </p>
                </div>
            </Callout>

            <Section>
                <SectionHeader>
                    <h2>Build</h2>
                    <span>app.info</span>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>Version</Label>
                        <Value $mono>{info ? `v${info.version} · ${info.platform}` : "browser preview"}</Value>
                        <Hint>Read from the executable the interface is running in.</Hint>
                    </Field>
                </Card>
            </Section>
        </Stack>
    );
}

function formatTime(value: string | null): string {
    if (!value) return "—";

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString(undefined, {hour12: false});
}

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 760px;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;

    h2 {
        font-size: 13px;
        font-weight: 600;
    }

    span {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-muted);
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

const Value = styled.span<{ $mono?: boolean }>`
    font-family: ${({$mono}) => $mono ? "var(--font-mono)" : "var(--font-sans)"};
    font-size: 12px;
    color: var(--text-primary);
    overflow-wrap: anywhere;
`;

const Hint = styled.span`
    font-size: 10px;
    line-height: 1.5;
    color: var(--text-muted);
`;

const Actions = styled.div`
    display: flex;
    gap: 8px;
`;

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-secondary);
    font: inherit;
    font-size: 11px;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const ErrorText = styled.span`
    color: var(--danger);
    font-size: 11px;
`;

const Callout = styled.div`
    display: flex;
    gap: 10px;
    padding: 16px;
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-secondary);

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    strong {
        display: block;
        margin-bottom: 3px;
        font-size: 12px;
        color: var(--text-primary);
    }

    p {
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-muted);
    }
`;
