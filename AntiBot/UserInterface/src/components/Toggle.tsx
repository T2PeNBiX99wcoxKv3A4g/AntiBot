import styled from "styled-components";

/** A checkbox with a title and a hint, shared by the settings page and the account page. */
export function Toggle({checked, onChange, title, hint, disabled = false, requires}: {
    checked: boolean;
    onChange: (value: boolean) => void;
    title: string;
    hint: string;
    disabled?: boolean;
    /** Shown next to the title when the action only works with something else turned on. */
    requires?: string;
}) {
    return (
        <ToggleItem>
            <ToggleLabel>
                <input
                    checked={checked}
                    disabled={disabled}
                    onChange={(event) => onChange(event.target.checked)}
                    type="checkbox"
                />
                <span>{title}</span>
                {requires && <Requirement>{requires}</Requirement>}
            </ToggleLabel>
            <ToggleHint>{hint}</ToggleHint>
        </ToggleItem>
    );
}

const ToggleItem = styled.label`
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
`;

const ToggleLabel = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    input {
        accent-color: var(--accent-primary);
    }
`;

const ToggleHint = styled.span`
    padding-left: 24px;
    font-size: 10.5px;
    color: var(--text-muted);
`;

/** Marks an action that only works when VRChat's OSC is enabled. */
const Requirement = styled.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.14);
    color: #93c5fd;
    font-family: var(--font-mono);
    font-size: 9px;
`;
