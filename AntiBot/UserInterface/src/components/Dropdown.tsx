import {type CSSProperties, type RefObject, useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";

export interface DropdownOption {
    value: string;
    label: string;
}

const menuUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const menuDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

/** The menu surface, so every dropdown has the same radius, colours and animation. */
const Menu = styled.div<{ $up?: boolean }>`
    position: absolute;
    ${({$up}) => $up ? "bottom: calc(100% + 6px);" : "top: calc(100% + 5px);"}
    left: 0;
    min-width: 200px;
    max-height: 260px;
    overflow-y: auto;
    padding: 5px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-card);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
    transform-origin: ${({$up}) => $up ? "bottom" : "top"};
    animation: ${({$up}) => $up ? menuUp : menuDown} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Item = styled.button<{ $active?: boolean }>`
    display: block;
    width: 100%;
    overflow: hidden;
    padding: 7px 9px;
    border: none;
    border-radius: 6px;
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.16)" : "transparent"};
    color: ${({$active}) => $active ? "var(--text-primary)" : "var(--text-secondary)"};
    font: inherit;
    font-size: 11px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(167, 139, 250, 0.12);
        color: var(--text-primary);
    }
`;

const Root = styled.div`
    position: relative;
    display: inline-flex;
`;

const Trigger = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-input);
    color: var(--text-primary);
    font: inherit;
    font-size: 12px;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
    }

    &:focus-visible {
        outline: none;
        border-color: var(--border-color-focus);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Caret = styled.span<{ $open: boolean }>`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transform: rotate(${({$open}) => $open ? "180deg" : "0"});
    transition: transform 0.18s ease;
`;

/** Keeps an open menu inside the window by capping it to the space the anchor has. */
function useMenuFit(open: boolean, up: boolean | undefined, anchor: RefObject<HTMLElement | null>): CSSProperties {
    const [style, setStyle] = useState<CSSProperties>({});

    useEffect(() => {
        if (!open) return;

        const measure = () => {
            const rect = anchor.current?.getBoundingClientRect();
            if (!rect) return;

            const space = up ? rect.top : window.innerHeight - rect.bottom;
            setStyle({maxHeight: Math.max(120, Math.floor(space - 10))});
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [open, up, anchor]);

    return style;
}

interface DropdownProps {
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    up?: boolean;
    disabled?: boolean;
    title?: string;
}

/** A custom dropdown, because the native select is laid out differently on every platform. */
export function Dropdown({value, options, onChange, up, disabled, title}: DropdownProps) {
    const [open, setOpen] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const menuStyle = useMenuFit(open, up, root);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event: MouseEvent) => {
            if (!root.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const selected = options.find((option) => option.value === value)?.label ?? value;

    return (
        <Root ref={root}>
            <Trigger
                aria-expanded={open}
                aria-haspopup="listbox"
                disabled={disabled}
                onClick={() => setOpen((previous) => !previous)}
                title={title}
                type="button"
            >
                <Label>{selected}</Label>
                <Caret $open={open}>▾</Caret>
            </Trigger>

            {open && (
                <Menu $up={up} role="listbox" style={menuStyle}>
                    {options.map((option) => (
                        <Item
                            $active={option.value === value}
                            aria-selected={option.value === value}
                            key={option.value}
                            onClick={() => {
                                setOpen(false);
                                onChange(option.value);
                            }}
                            role="option"
                            type="button"
                        >
                            {option.label}
                        </Item>
                    ))}
                </Menu>
            )}
        </Root>
    );
}
