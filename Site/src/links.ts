/** A docs link that opens the generated static page in a build and the SPA route in dev. */
export const docsHref = (slug: string) =>
    import.meta.env.DEV ? `#/docs/${slug}` : `docs/${slug}/`;

/** The home link, which is the SPA in dev and the built page in a release. */
export const homeHref = () => import.meta.env.DEV ? "#/" : "./";
