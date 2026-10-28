import styled from "styled-components";
import type {LogStatus} from "../api/logs";
import type {Page} from "../pages";
import {LogIcon, ShieldIcon, SlidersIcon} from "./Icons";

interface SidebarProps {
    page: Page;
    onNavigate: (page: Page) => void;
    status: LogStatus;
}

const items: { id: Page; label: string; icon: typeof LogIcon }[] = [
    {id: "logs", label: "Log viewer", icon: LogIcon},
    {id: "settings", label: "Settings", icon: SlidersIcon},
];

export function Sidebar({page, onNavigate, status}: SidebarProps) {
    return (
        <Aside>
            <Brand>
                <Mark><ShieldIcon/></Mark>
                <BrandText>
                    <strong>AntiBot</strong>
                    <span>VRChat guard</span>
                </BrandText>
            </Brand>

            <Nav>
                {items.map(({id, label, icon: Icon}) => (
                    <Item key={id} $active={page === id} onClick={() => onNavigate(id)} type="button">
                        <Icon/>
                        <span>{label}</span>
                    </Item>
                ))}
            </Nav>

            <StatusCard>
                <StatusLabel>VRChat</StatusLabel>
                <StatusValue $active={status.running}>
                    <Dot $active={status.running}/>
                    {status.running ? "running" : "not running"}
                </StatusValue>
            </StatusCard>
        </Aside>
    );
}

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 26px;
    width: 244px;
    flex-shrink: 0;
    padding: 22px 16px;
    background: rgba(9, 15, 25, 0.9);
    border-right: 1px solid var(--border-color);
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 8px;
`;

const Mark = styled.span`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 11px;
    color: #041016;
    background: var(--accent-gradient);
    box-shadow: var(--accent-glow);
`;

const BrandText = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.25;

    strong {
        font-size: 15px;
        letter-spacing: -0.02em;
    }

    span {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-muted);
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }
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
    background: ${({$active}) => $active ? "rgba(34, 211, 238, 0.08)" : "transparent"};
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
