/** Shared site facts for the doc generator, the static-page generator and the sitemap. */
export const SITE_URL = "https://t2penbix99wcoxkv3a4g.github.io/AntiBot";
export const REPOSITORY = "https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot";
export const RELEASES = `${REPOSITORY}/releases/latest`;

export const LANGUAGES = ["en", "ja", "zh-CN", "zh-TW"];

export const LANGUAGE_LABELS = {
    en: "English",
    ja: "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文"
};

export const OG_LOCALES = {
    en: "en_US",
    ja: "ja_JP",
    "zh-CN": "zh_CN",
    "zh-TW": "zh_TW"
};

export const DOC_PAGES = [
    {slug: "Getting-Started", group: "setup"},
    {slug: "OSC", group: "setup"},
    {slug: "Avatar", group: "setup"},
    {slug: "Threat-Scoring", group: "reference"},
    {slug: "Automatic-Protection", group: "reference"}
];

export const homePath = (language) => language === "en" ? "/" : `/${language}/`;
export const docsPath = (language, slug) =>
    language === "en" ? `/docs/${slug}/` : `/${language}/docs/${slug}/`;
export const absolute = (path) => `${SITE_URL}${path}`;
