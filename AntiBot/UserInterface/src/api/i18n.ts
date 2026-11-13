import {useTranslation as useBridgeTranslation} from "@photino-net-utils/bridge";
import type {LocalizationKey} from "./i18n.generated";

/** The bridge translator with its keys narrowed to the generated union. */
export type Translate = (key: LocalizationKey, params?: Record<string, string | number>) => string;

/**
 * `useTranslation` for the app: the key has to exist in the embedded translation files, so a typo
 * fails the TypeScript build instead of showing the raw key in the interface.
 */
export function useTranslation(): Translate {
    return useBridgeTranslation();
}
