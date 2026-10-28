import {useEffect, useState} from "react";
import styled from "styled-components";
import {Native} from "@photino-net-utils/bridge";
import {BrandMark} from "./Brand";

/** The interface draws the window title bar; the host hides the native one but keeps its frame. */
export function TitleBar() {
    const [maximized, setMaximized] = useState(false);

    useEffect(() => {
        if (!Native.available) return;

        return Native.on((message) => {
            if (message.type !== "window.state") return;

            const data = message.data as { maximized?: unknown };
            if (typeof data?.maximized === "boolean") setMaximized(data.maximized);
        });
    }, []);

    const send = (type: string) => Native.send({type});
    const toggleMaximize = () => send("window.toggleMaximize");

    return (
        <Bar>
            <Brand>
                <BrandMark size={19}/>
                <strong>AntiBot</strong>
            </Brand>

            <DragArea onDoubleClick={toggleMaximize} onMouseDown={() => send("window.drag")}/>

            <Controls>
                <ControlButton onClick={() => send("window.minimize")} title="Minimize" type="button">
                    <svg aria-hidden="true" viewBox="0 0 10 10"><path d="M2 5h6"/></svg>
                </ControlButton>

                <ControlButton
                    onClick={toggleMaximize}
                    title={maximized ? "Restore" : "Maximize"}
                    type="button"
                >
                    {maximized
                        ? <svg aria-hidden="true" viewBox="0 0 10 10">
                            <rect height="6" width="6" x="3" y="1"/>
                            <rect height="6" width="6" x="1" y="3"/>
                        </svg>
                        : <svg aria-hidden="true" viewBox="0 0 10 10"><rect height="6" width="6" x="2" y="2"/></svg>}
                </ControlButton>

                <CloseButton onClick={() => send("window.close")} title="Close" type="button">
                    <svg aria-hidden="true" viewBox="0 0 10 10"><path d="m2 2 6 6M8 2 2 8"/></svg>
                </CloseButton>
            </Controls>
        </Bar>
    );
}

const Bar = styled.header`
    display: flex;
    align-items: stretch;
    height: 38px;
    flex-shrink: 0;
    background: rgba(8, 7, 15, 0.96);
    border-bottom: 1px solid var(--border-color);
    user-select: none;
    -webkit-user-select: none;
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px 0 12px;
    flex-shrink: 0;
    color: var(--text-primary);

    strong {
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: -0.01em;
    }
`;

const DragArea = styled.div`
    flex: 1;
    min-width: 24px;
`;

const Controls = styled.div`
    display: flex;
    flex-shrink: 0;
`;

const ControlButton = styled.button`
    display: grid;
    place-items: center;
    width: 44px;
    height: 100%;
    border: 0;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background 100ms ease, color 100ms ease;

    svg {
        width: 10px;
        height: 10px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.2;
    }

    &:hover {
        background: rgba(167, 139, 250, 0.14);
        color: var(--text-primary);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: -2px;
    }
`;

const CloseButton = styled(ControlButton)`
    &:hover {
        background: #e81123;
        color: #fff;
    }
`;
