/**
 * Everything about this project that is not text: where it lives, how it looks, and which pages the
 * documentation holds. Plain JavaScript, because the docs generator reads it with node.
 */
export const site = {
    name: "AntiBot",
    tagline: "Keep bots out of your VRChat instance.",
    icon: "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/AntiBot/master/icon.svg",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot",
    languages: ["en", "ja", "zh-CN", "zh-TW"],
    docs: [
        {slug: "Getting-Started", group: "setup"},
        {slug: "OSC", group: "setup"},
        {slug: "Avatar", group: "setup"},
        {slug: "Threat-Scoring", group: "reference"},
        {slug: "Automatic-Protection", group: "reference"},
    ],
    theme: {
        accent: "#a78bfa",
        accentStrong: "#8b5cf6",
        background: "#08070f",
        card: "rgba(22, 19, 38, 0.78)",
        topBar: "rgba(8, 7, 15, 0.82)",
        textPrimary: "#f5f3ff",
        textSecondary: "#a9a2c4",
        textMuted: "#6f6885",
        body: "#d8d3ea",
        border: "rgba(167, 139, 250, 0.12)",
        borderHover: "rgba(167, 139, 250, 0.4)",
    },
};
