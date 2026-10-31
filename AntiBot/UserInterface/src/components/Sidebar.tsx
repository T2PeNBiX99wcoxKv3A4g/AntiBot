import styled from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import type {LogStatus} from "../api/logs";
import type {Page} from "../pages";
import {BellIcon, LogIcon, ShieldIcon, SlidersIcon, UserIcon, UsersIcon} from "./Icons";

interface SidebarProps {
    page: Page;
    onNavigate: (page: Page) => void;
    status: LogStatus;
}

const items: { id: Page; label: string; icon: typeof LogIcon }[] = [
    {id: "logs", label: "Log viewer", icon: LogIcon},
    {id: "instance", label: "Instance", icon: UsersIcon},
    {id: "requests", label: "Friend requests", icon: BellIcon},
    {id: "operations", label: "Operations", icon: ShieldIcon},
    {id: "account", label: "Account", icon: UserIcon},
    {id: "settings", label: "Settings", icon: SlidersIcon},
];

export function Sidebar({page, onNavigate, status}: SidebarProps) {
    const t = useTranslation();

    return (
        <Aside>
            <Nav>
                {items.map(({id, label, icon: Icon}) => (
                    <Item key={id} $active={page === id} onClick={() => onNavigate(id)} type="button">
                        <Icon/>
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

    svg {
        color: ${({$active}) => $active ? "var(--accent-primary)" : "var(--text-muted)"};
    }

    &:hover {
        background: var(--bg-card-hover);
        border-color: var(--border-color);
        color: var(--text-primary);
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
    box-shadow: ${({$active}) => $active ? "0 0 8px var(--accent-primary)" : "none"};
`;
