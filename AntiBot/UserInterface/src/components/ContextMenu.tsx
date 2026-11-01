import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import {setWhitelisted} from "../api/settings";

/** Inputs where pasting text makes no sense. */
const NON_TEXT_INPUTS = new Set([
    "button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "reset", "submit",
]);

interface MenuState {
    x: number;
    y: number;
    selection: string;
    editable: HTMLElement | null;
    userId: string | null;
    whitelisted: boolean;
}

function isTextControl(element: Element | null): element is HTMLElement {
    if (!element) return false;
    if (element instanceof HTMLTextAreaElement) return true;
    if (element instanceof HTMLInputElement) return !NON_TEXT_INPUTS.has(element.type);
    return element instanceof HTMLElement && element.isContentEditable;
}

function findEditable(element: Element | null): HTMLElement | null {
    for (let node: Element | null = element; node; node = node.parentElement)
        if (isTextControl(node)) return node;

    return null;
}

/** Writes the whole value through the native setter, so React sees it as a real change. */
function setValue(control: HTMLInputElement | HTMLTextAreaElement, value: string) {
    const prototype = control instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;

    Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(control, value);
}

/** Inserts text at the caret of an input, textarea or contenteditable element. */
function insertText(control: HTMLElement, text: string) {
    control.focus();

    if (control.isContentEditable) {
        document.execCommand("insertText", false, text);
        return;
    }

    const input = control as HTMLInputElement | HTMLTextAreaElement;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;

    setValue(input, input.value.slice(0, start) + text + input.value.slice(end));
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.setSelectionRange(start + text.length, start + text.length);
}

/**
 * The app's own right-click menu. The web view's built-in one is disabled, so this is the only one;
 * it only appears when there is something it can offer.
 */
export function ContextMenu() {
    const t = useTranslation();
    const [menu, setMenu] = useState<MenuState | null>(null);
    const [toast, setToast] = useState("");
    const toastTimer = useRef(0);

    const flash = (message: string) => {
        setToast(message);
        window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(""), 1800);
    };

    useEffect(() => {
        const onContextMenu = (event: MouseEvent) => {
            const target = event.target instanceof Element ? event.target : null;
            const selection = window.getSelection()?.toString().trim() ?? "";
            const row = target?.closest<HTMLElement>("[data-user-id]");
            const editable =
                findEditable(target) ??
                findEditable(document.activeElement instanceof Element ? document.activeElement : null);

            // Nothing to offer means no menu at all.
            if (!selection && !row && !editable) {
                setMenu(null);
                return;
            }

            event.preventDefault();
            setMenu({
                x: Math.max(8, Math.min(event.clientX, window.innerWidth - 240)),
                y: Math.max(8, Math.min(event.clientY, window.innerHeight - 260)),
                selection,
                editable,
                userId: row?.dataset.userId ?? null,
                whitelisted: row?.dataset.whitelisted === "true",
            });
        };

        document.addEventListener("contextmenu", onContextMenu);
        return () => document.removeEventListener("contextmenu", onContextMenu);
    }, []);

    useEffect(() => {
        if (!menu) return;

        const close = () => setMenu(null);
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenu(null);
        };

        window.addEventListener("click", close);
        window.addEventListener("scroll", close, true);
        window.addEventListener("resize", close);
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("click", close);
            window.removeEventListener("scroll", close, true);
            window.removeEventListener("resize", close);
            window.removeEventListener("keydown", onKey);
        };
    }, [menu]);

    useEffect(() => () => window.clearTimeout(toastTimer.current), []);

    const copy = async (value: string) => {
        setMenu(null);
        try {
            await navigator.clipboard.writeText(value);
            flash(t("Copied"));
        } catch {
            // The clipboard was refused; nothing sensible to show.
        }
    };

    const paste = async (editable: HTMLElement) => {
        setMenu(null);
        try {
            const text = await navigator.clipboard.readText();
            if (text) insertText(editable, text);
        } catch {
            // The clipboard was unavailable; leave the field untouched.
        }
    };

    const toggleWhitelist = async (userId: string, whitelisted: boolean) => {
        setMenu(null);
        try {
            await setWhitelisted(userId, whitelisted);
            window.dispatchEvent(new CustomEvent("antibot:whitelist", {detail: {userId, whitelisted}}));
            flash(whitelisted ? t("Added to whitelist") : t("Removed from whitelist"));
        } catch {
            // The host refused; the settings page can still change the list by hand.
        }
    };

    return (
        <>
            {menu && (
                <Menu style={{left: menu.x, top: menu.y}}>
                    {menu.selection && (
                        <Item onClick={() => void copy(menu.selection)} type="button">
                            {t("Copy")}
                        </Item>
                    )}
                    {menu.userId && (
                        <Item onClick={() => void copy(`https://vrchat.com/home/user/${menu.userId}`)} type="button">
                            {t("Copy VRChat profile link")}
                        </Item>
                    )}
                    {menu.userId && (
                        <Item onClick={() => void toggleWhitelist(menu.userId!, !menu.whitelisted)} type="button">
                            {menu.whitelisted ? t("Remove from whitelist") : t("Add to whitelist")}
                        </Item>
                    )}
                    {menu.editable && (
                        <Item onClick={() => void paste(menu.editable!)} type="button">
                            {t("Paste")}
                        </Item>
                    )}
                </Menu>
            )}
            {toast && <Toast>{toast}</Toast>}
        </>
    );
}

const Menu = styled.div`
    position: fixed;
    z-index: 2000;
    min-width: 210px;
    padding: 4px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-card);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
`;

const Item = styled.button`
    display: block;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 7px;
    background: none;
    color: var(--text-secondary);
    font: inherit;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        background: rgba(167, 139, 250, 0.16);
        color: var(--text-primary);
    }
`;

const Toast = styled.div`
    position: fixed;
    left: 50%;
    bottom: 24px;
    z-index: 2001;
    transform: translateX(-50%);
    padding: 8px 14px;
    border: 1px solid rgba(74, 222, 128, 0.3);
    border-radius: 999px;
    background: rgba(20, 83, 45, 0.95);
    color: #86efac;
    font-size: 11px;
    pointer-events: none;
`;
