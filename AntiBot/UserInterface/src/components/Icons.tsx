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

export function UsersIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <circle cx="9" cy="8" r="3.2"/>
            <path d="M3 19c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6"/>
            <path d="M15.8 5.2a3.2 3.2 0 0 1 0 5.9M17.4 13.8c2.1.6 3.6 2.3 3.6 4.4"/>
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

export function UserIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <circle cx="12" cy="8" r="3.6"/>
            <path d="M4.5 20c0-3.9 3.4-6.6 7.5-6.6s7.5 2.7 7.5 6.6"/>
        </svg>
    );
}

export function ShieldIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.6-7 9.8-4.1-2.2-7-5.5-7-9.8V5.8z"/>
            <path d="m9.2 12.1 2 2 3.6-3.8"/>
        </svg>
    );
}

export function KeyIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <circle cx="8" cy="8" r="3.4"/>
            <path d="m10.6 10.6 8 8M15.5 15.5l2-2M18 18l2-2"/>
        </svg>
    );
}

export function QrIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/>
            <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/>
        </svg>
    );
}

export function EyeIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z"/>
            <circle cx="12" cy="12" r="2.6"/>
        </svg>
    );
}

export function EyeOffIcon({size = 16}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M4 4l16 16"/>
            <path
                d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.1 0 9.5 7 9.5 7a16 16 0 0 1-3 3.6M6.2 7.3A16.6 16.6 0 0 0 2.5 12s3.4 7 9.5 7a10.4 10.4 0 0 0 4-.8"/>
        </svg>
    );
}

export function LockIcon({size = 14}: IconProps) {
    return (
        <svg {...base(size)}>
            <rect x="5" y="10" width="14" height="10" rx="2"/>
            <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
        </svg>
    );
}

export function ExternalIcon({size = 14}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M14 4h6v6"/>
            <path d="M20 4l-9 9"/>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        </svg>
    );
}

export function BellIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z"/>
            <path d="M10 19a2 2 0 0 0 4 0"/>
        </svg>
    );
}
