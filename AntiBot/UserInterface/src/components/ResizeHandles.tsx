import styled from "styled-components";
import {Native} from "@photino-net-utils/bridge";

type Direction = "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright";

const directions: Direction[] = ["top", "bottom", "left", "right", "topleft", "topright", "bottomleft", "bottomright"];

/** Invisible native resize grips for the web-drawn frame's edges. */
export function ResizeHandles() {
    return (
        <>
            {directions.map((direction) => (
                <Handle
                    $direction={direction}
                    key={direction}
                    onMouseDown={(event) => {
                        event.preventDefault();
                        Native.send({type: "window.resize", payload: {direction}});
                    }}
                />
            ))}
        </>
    );
}

const Handle = styled.div<{ $direction: Direction }>`
    position: fixed;
    z-index: 1000;

    ${({$direction}) => $direction === "top" && `
        top: 0;
        left: 8px;
        right: 8px;
        height: 5px;
        cursor: ns-resize;
    `}

    ${({$direction}) => $direction === "bottom" && `
        bottom: 0;
        left: 8px;
        right: 8px;
        height: 5px;
        cursor: ns-resize;
    `}

    ${({$direction}) => $direction === "left" && `
        top: 8px;
        bottom: 8px;
        left: 0;
        width: 5px;
        cursor: ew-resize;
    `}

    ${({$direction}) => $direction === "right" && `
        top: 8px;
        bottom: 8px;
        right: 0;
        width: 5px;
        cursor: ew-resize;
    `}

    ${({$direction}) => $direction === "topleft" && `
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
        cursor: nwse-resize;
    `}

    ${({$direction}) => $direction === "topright" && `
        top: 0;
        right: 0;
        width: 10px;
        height: 10px;
        cursor: nesw-resize;
    `}

    ${({$direction}) => $direction === "bottomleft" && `
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        cursor: nesw-resize;
    `}

    ${({$direction}) => $direction === "bottomright" && `
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        cursor: nwse-resize;
    `}
`;
