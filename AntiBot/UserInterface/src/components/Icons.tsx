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

export function ShieldIcon({size = 22}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5V6z"/>
            <path d="m8.8 12.2 2.2 2.2 4.2-4.4"/>
        </svg>
    );
}

export function OverviewIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <rect height="7" rx="1.5" width="7" x="3" y="3"/>
            <rect height="7" rx="1.5" width="7" x="14" y="3"/>
            <rect height="7" rx="1.5" width="7" x="3" y="14"/>
            <rect height="7" rx="1.5" width="7" x="14" y="14"/>
        </svg>
    );
}

export function PulseIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>
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

export function EyeOffIcon({size = 18}: IconProps) {
    return (
        <svg {...base(size)}>
            <path d="m3 3 18 18"/>
            <path d="M10.6 6.2A9.8 9.8 0 0 1 12 6c5 0 8.5 4 9.5 6-.4.8-1.1 2-2.3 3.1"/>
            <path d="M6.2 7.6C3.9 9.2 2.8 11 2.5 12c1 2 4.5 6 9.5 6 1.1 0 2.1-.2 3-.5"/>
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>
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
