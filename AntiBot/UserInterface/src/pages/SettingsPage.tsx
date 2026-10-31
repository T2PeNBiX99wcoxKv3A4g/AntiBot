import {useEffect, useState} from "react";
import styled from "styled-components";
import {desktopAvailable, openLogFolder} from "../api/logs";
import {getSettings, saveSettings} from "../api/settings";
import type {AppInfo} from "../api/system";
import {FolderIcon, TrashIcon} from "../components/Icons";

interface SettingsPageProps {
    info: AppInfo | null;
}

export function SettingsPage({info}: SettingsPageProps) {
    const [directory, setDirectory] = useState("");
    const [saved, setSaved] = useState("");
    const [defaultDirectory, setDefaultDirectory] = useState("");
    const [providers, setProviders] = useState<string[]>([]);
    const [savedProviders, setSavedProviders] = useState<string[]>([]);
    const [newProvider, setNewProvider] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        void getSettings().then((settings) => {
            const stored = settings.avatarApiProviders ?? [];
            setDirectory(settings.logDirectory ?? "");
            setSaved(settings.logDirectory ?? "");
            setDefaultDirectory(settings.defaultLogDirectory ?? "");
            setProviders(stored);
            setSavedProviders(stored);
        }, () => setError("Could not read the settings."));
    }, []);

    const trimmed = directory.trim();
    const changed = trimmed !== saved || providers.join("\n") !== savedProviders.join("\n");

    const save = async () => {
        setError(null);
        setSaving(true);

        try {
            const cleaned = providers.map((provider) => provider.trim()).filter((provider) => provider.length > 0);
            await saveSettings({logDirectory: trimmed, avatarApiProviders: cleaned});
            setDirectory(trimmed);
            setSaved(trimmed);
            setProviders(cleaned);
            setSavedProviders(cleaned);
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

    const addProvider = () => {
        const value = newProvider.trim();
        if (value.length === 0 || providers.includes(value)) return;

        setProviders([...providers, value]);
        setNewProvider("");
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
                        </Row>
                        <Hint>
                            The newest log in this folder is followed while VRChat is running. Nothing is read
                            while it is closed.
                        </Hint>
                    </Field>

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

            <Section>
                <SectionHeader>
                    <h2>Avatar name lookups</h2>
                    <span>same format as VRCX</span>
                </SectionHeader>

                <Card>
                    <Field>
                        <Label>API endpoints</Label>
                        <Hint>
                            Tried in order; the first name wins. Each is called as
                            <code> ?fileId=file_…</code> and must answer with JSON containing a
                            <code> name</code>.
                        </Hint>

                        <Providers>
                            {providers.length === 0 && <EmptyHint>No endpoint; avatar names stay unknown.</EmptyHint>}
                            {providers.map((provider, index) => (
                                <Row key={`${provider}-${index}`}>
                                    <Input
                                        aria-label="Avatar API endpoint"
                                        onChange={(event) => {
                                            const next = [...providers];
                                            next[index] = event.target.value;
                                            setProviders(next);
                                        }}
                                        spellCheck={false}
                                        value={provider}
                                    />
                                    <Button
                                        aria-label="Remove endpoint"
                                        onClick={() => setProviders(providers.filter((_, i) => i !== index))}
                                        type="button"
                                    >
                                        <TrashIcon/>
                                    </Button>
                                </Row>
                            ))}
                        </Providers>

                        <Row>
                            <Input
                                aria-label="New avatar API endpoint"
                                onChange={(event) => setNewProvider(event.target.value)}
                                placeholder="https://example.com/avatars"
                                spellCheck={false}
                                value={newProvider}
                            />
                            <Button disabled={newProvider.trim().length === 0} onClick={addProvider} type="button">
                                Add
                            </Button>
                        </Row>
                    </Field>

                    {error && <ErrorText>{error}</ErrorText>}

                    <Actions>
                        <Button disabled={!changed || trimmed.length === 0 || saving} onClick={save} type="button">
                            {saving ? "Saving…" : "Save"}
                        </Button>
                    </Actions>
                </Card>
            </Section>

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

const Providers = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const EmptyHint = styled.span`
    font-size: 11px;
    color: var(--text-muted);
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

    code {
        font-family: var(--font-mono);
    }
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
