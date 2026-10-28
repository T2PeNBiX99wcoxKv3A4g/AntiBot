/** The app mark, drawn from the same geometry as `icon.svg`, so the UI never needs a bitmap. */
export function BrandMark({size = 20}: { size?: number }) {
    return (
        <svg aria-hidden="true" height={size} viewBox="0 0 256 256" width={size}>
            <defs>
                <linearGradient id="brand-mark" gradientUnits="userSpaceOnUse" x1="8" x2="248" y1="8" y2="248">
                    <stop offset="0" stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#a855f7"/>
                </linearGradient>
            </defs>
            <rect fill="url(#brand-mark)" height="240" rx="54" width="240" x="8" y="8"/>
            <circle cx="128" cy="98" fill="#f8fafc" r="40"/>
            <path d="M62 198c0-33.1 29.5-60 66-60s66 26.9 66 60z" fill="#f8fafc"/>
            <path d="M56 200 200 56" stroke="url(#brand-mark)" strokeLinecap="round" strokeWidth="18"/>
        </svg>
    );
}
