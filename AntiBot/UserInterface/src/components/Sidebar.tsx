import styled, {css, keyframes} from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import type {LogStatus} from "../api/logs";
import type {Page} from "../pages";
import {AlertIcon, BatchIcon, BellIcon, LogIcon, ShieldIcon, SlidersIcon, UserIcon, UsersIcon} from "./Icons";

interface SidebarProps {
    page: Page;
    onNavigate: (page: Page) => void;
    status: LogStatus;
    /** Only a debug build shows the debug page. */
    debug: boolean;
}

const items: { id: Page; label: string; icon: typeof LogIcon }[] = [
    {id: "logs", label: "Log viewer", icon: LogIcon},
    {id: "instance", label: "Instance", icon: UsersIcon},
    {id: "batch", label: "Batch actions", icon: BatchIcon},
    {id: "requests", label: "Friend requests", icon: BellIcon},
    {id: "operations", label: "Operations", icon: ShieldIcon},
    {id: "account", label: "Account", icon: UserIcon},
    {id: "settings", label: "Settings", icon: SlidersIcon},
];

const debugItem: { id: Page; label: string; icon: typeof LogIcon } =
    {id: "debug", label: "Debug", icon: AlertIcon};

/** The running dot breathes instead of sitting still, so the status is visible without reading it. */
const pulse = keyframes`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.45);
    }
    50% {
        box-shadow: 0 0 0 4px rgba(167, 139, 250, 0);
    }
`;

export function Sidebar({page, onNavigate, status, debug}: SidebarProps) {
    const t = useTranslation();
    const nav = debug ? [...items, debugItem] : items;

    return (
        <Aside>
            <Nav>
                {nav.map(({id, label, icon: Icon}) => (
                    <Item key={id} $active={page === id} onClick={() => onNavigate(id)} type="button">
                        <Icon size={18}/>
                        <span>{t(label)}</span>
                    </Item>
                ))}
            </Nav>

            <StatusCard>
                <StatusLabel>{t("VRChat")}</StatusLabel>
                <StatusValue $active={status.running}>
                    <Dot $active={status.running}/>
                    {status.running ? t("running") : t("not running")}
                </StatusValue>
            </StatusCard>
        </Aside>
    );
}

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 218px;
    flex-shrink: 0;
    padding: 16px 14px 18px;
    background: rgba(8, 7, 15, 0.9);
    border-right: 1px solid var(--border-color);
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Item = styled.button<{ $active: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.12)" : "transparent"};
    color: ${({$active}) => $active ? "var(--text-primary)" : "var(--text-secondary)"};
    font: inherit;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

    /* A small bar grows beside the active item instead of the row jumping into place. */

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 2px;
        height: 0;
        border-radius: 2px;
        background: var(--accent-primary);
        transform: translateY(-50%);
        transition: height 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    ${({$active}) => $active && css`
        &::before {
            height: 55%;
        }
    `}
    svg {
        color: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-muted)"};
        transition: color 120ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
        transform: scale(${({$active}) => $active ? 1.08 : 1});
    }

    &:hover {
        background: var(--bg-card-hover);
        border-color: var(--border-color);
        color: var(--text-primary);

        svg {
            transform: scale(1.08);
        }
    }

    &:active {
        transform: scale(0.99);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`;

const StatusCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: auto;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

const StatusLabel = styled.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`;

const StatusValue = styled.div<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: ${({$active}) => $active ? "var(--text-primary)" : "var(--text-muted)"};
`;

const Dot = styled.span<{ $active: boolean }>`
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-muted)"};
    animation: ${({$active}) => $active ? css`${pulse} 2s ease-in-out infinite` : "none"};
`;
