import styled from "styled-components";
import {useTranslation} from "../api/i18n";
import {AttributionBrowser} from "./AttributionBrowser";

/** The open-source notices, shown as a page over the settings rather than in the settings flow. */
export function AttributionPage({onClose}: { onClose: () => void }) {
    const t = useTranslation();

    return (
        <Overlay onClick={onClose}>
            <Panel onClick={(event) => event.stopPropagation()}>
                <Header>
                    <h2>{t("Open source attribution")}</h2>
                    <CloseButton onClick={onClose} title={t("Close")} type="button">×</CloseButton>
                </Header>

                <Hint>{t("Open source licenses for the libraries AntiBot uses.")}</Hint>
                <AttributionBrowser/>
            </Panel>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`;

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 1100px;
    height: min(80vh, 760px);
    max-height: 100%;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    h2 {
        font-size: 15px;
        font-weight: 600;
    }
`;

const CloseButton = styled.button`
    width: 26px;
    height: 26px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-muted);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`;

const Hint = styled.p`
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-muted);
`;
