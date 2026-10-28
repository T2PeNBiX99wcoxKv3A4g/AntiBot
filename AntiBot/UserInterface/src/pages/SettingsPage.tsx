import {useEffect, useState} from "react";
import styled from "styled-components";
import {desktopAvailable, openLogFolder} from "../api/logs";
import {getSettings, saveSettings} from "../api/settings";
import type {AppInfo} from "../api/system";
import {FolderIcon, InfoIcon} from "../components/Icons";

interface SettingsPageProps {
    info: AppInfo | null;
}

export function SettingsPage({info}: SettingsPageProps) {
    const [directory, setDirectory] = useState("");
    const [saved, setSaved] = useState("");
    const [defaultDirectory, setDefaultDirectory] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        void getSettings().then((settings) => {
            setDirectory(settings.logDirectory ?? "");
            setSaved(settings.logDirectory ?? "");
            setDefaultDirectory(settings.defaultLogDirectory ?? "");
        }, () => setError("Could not read the settings."));
    }, []);

    const trimmed = directory.trim();
    const changed = trimmed !== saved;

    const save = async () => {
        setError(null);
        setSaving(true);

        try {
            await saveSettings({logDirectory: trimmed});
            setDirectory(trimmed);
            setSaved(trimmed);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : String(reason));
        } finally {
            setSaving(false);
        }
    };

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
                    <span>configurable</span>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>VRChat log folder</Label>
                        <Row>
                            <Input
                                aria-label="VRChat log folder"
                                onChange={(event) => setDirectory(event.target.value)}
                                placeholder="VRChat's log folder"
                                spellCheck={false}
                                value={directory}
                            />
                            <Button disabled={!changed || trimmed.length === 0 || saving} onClick={save} type="button">
                                {saving ? "Saving…" : "Save"}
                            </Button>
                        </Row>
                        <Hint>
                            The newest log in this folder is followed while VRChat is running. Nothing is read
                            while it is closed.
                        </Hint>
                    </Field>

                    {error && <ErrorText>{error}</ErrorText>}

                    <Actions>
                        <Button disabled={!desktopAvailable} onClick={revealFolder} type="button">
                            <FolderIcon/>Open folder
                        </Button>
                        <Button
                            disabled={!defaultDirectory || trimmed === defaultDirectory}
                            onClick={() => setDirectory(defaultDirectory)}
                            type="button"
                        >
                            Use VRChat's folder
                        </Button>
                    </Actions>
                </Card>
            </Section>

            <Callout>
                <InfoIcon/>
                <div>
                    <strong>Only the live session is read.</strong>
                    <p>
                        VRChat writes its own log and AntiBot follows it with shared read access, so the file
                        is never locked. While VRChat is not running, no log is opened at all.
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

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Input = styled.input`
    flex: 1;
    min-width: 0;
    padding: 8px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-primary);
    font: inherit;
    font-family: var(--font-mono);
    font-size: 11px;

    &::placeholder {
        color: var(--text-muted);
    }

    &:focus {
        outline: none;
        border-color: var(--border-color-hover);
    }
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
    flex-wrap: wrap;
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
    white-space: nowrap;
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
