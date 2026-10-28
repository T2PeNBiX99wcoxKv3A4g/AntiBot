interface IconProps {
    size?: number;
}

const base = (size: number) => ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
});

export function UserBlockIcon({size = 22}: IconProps) {
    return (
        <svg {...base(size)}>
            <circle cx="12" cy="8" r="3.6"/>
            <path d="M5 20c0-3.9 3.1-6.7 7-6.7s7 2.8 7 6.7"/>
            <path d="M4 20 20 4"/>
        </svg>
    );
}

export function LogIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
            <path d="M14 3v5h5M8.5 13h7M8.5 17h4"/>
        </svg>
    );
}

export function SlidersIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M4 7h16M4 17h16"/>
            <circle cx="9" cy="7" r="2"/>
            <circle cx="15" cy="17" r="2"/>
        </svg>
    );
}

export function SearchIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <circle cx="11" cy="11" r="6.5"/>
            <path d="m16 16 4.5 4.5"/>
        </svg>
    );
}

export function XIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M6 6l12 12M18 6 6 18"/>
        </svg>
    );
}

export function TrashIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M4 7h16M9 7V5h6v2M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/>
        </svg>
    );
}

export function FolderIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
    );
}

export function ArrowDownIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M12 5v14M6 13l6 6 6-6"/>
        </svg>
    );
}

export function DownloadIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M12 3v11M8 10l4 4 4-4"/>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
        </svg>
    );
}

export function InfoIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 11v5M12 8h.01"/>
        </svg>
    );
}
