import {type FormEvent, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Native} from "@photino-net-utils/bridge";
import {useTranslation} from "@photino-net-utils/bridge";
import type {LocalizationKey} from "@photino-net-utils/bridge";
import {
    type AccountSummary,
    type AuthSnapshot,
    type AuthStorage,
    cancelSignIn,
    type DeviceCode,
    forgetSavedPassword,
    getAuth,
    login,
    logout,
    onAuthChanged,
    pollDevice,
    removeAccount,
    type SavedAccount,
    saveStorage,
    signedOut,
    signInWithSavedPassword,
    startDevice,
    switchAccount,
    unlock,
    verify,
} from "../api/auth";
import {EyeIcon, EyeOffIcon, KeyIcon, ShieldIcon, TrashIcon, UserIcon, UsersIcon} from "../components/Icons";
import {Toggle} from "../components/Toggle";

type Run = (action: () => Promise<AuthSnapshot>) => Promise<boolean>;

/** The VRChat account: the account list, sign-in, the second factor, and how each session is kept. */
export function AccountPage({initial, ready = false, expired = false}: {
    initial?: AuthSnapshot;
    ready?: boolean;
    expired?: boolean;
}) {
    const t = useTranslation();
    const [auth, setAuth] = useState<AuthSnapshot>(initial ?? signedOut);
    const [loaded, setLoaded] = useState(ready);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [adding, setAdding] = useState(false);
    const [browsing, setBrowsing] = useState(false);
    const [unlocking, setUnlocking] = useState<AccountSummary | null>(null);
    const [unlockError, setUnlockError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onAuthChanged((next) => {
            if (cancelled) return;

            setAuth(next);
            setLoaded(true);
        });

        void getAuth().then((next) => {
            if (cancelled) return;

            setAuth(next);
            setLoaded(true);
        }, () => {
            // The host failed to answer; the signed-out form already covers it.
            if (!cancelled) setLoaded(true);
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    const signedIn = auth.state === "loggedIn";

    // Once an account is signed in, the add form has done its job.
    useEffect(() => {
        if (signedIn) setAdding(false);
    }, [signedIn]);

    const run: Run = async (action) => {
        setBusy(true);
        setError("");

        try {
            setAuth(await action());
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            return false;
        } finally {
            setBusy(false);
        }
    };

    const signInSaved = (account: SavedAccount) => run(() => signInWithSavedPassword(account.dir));

    const hasAccounts = auth.accounts.length > 0;
    const showAdd = adding || !signedIn && auth.state === "loggedOut" && !hasAccounts;

    // The sign-in steps are centred cards, so their page spans the whole content area.
    const centred = showAdd || auth.state === "twoFactor" || auth.state === "locked" && !browsing;

    const switchTo = async (account: AccountSummary) => {
        setError("");

        // A password-protected session is asked for here, so a cancelled switch changes nothing.
        if (account.storage === "password") {
            setUnlockError("");
            setUnlocking(account);
            return;
        }

        setBusy(true);

        try {
            const result = await switchAccount(account.dir);

            if (result.needsPassword) {
                setUnlockError("");
                setUnlocking(account);
                return;
            }

            // An expired session cannot be retried; show why once and go straight to the sign-in form.
            if (result.needsLogin) {
                setError(result.error ?? "");
                setAdding(true);
                return;
            }

            if (!result.ok || !result.auth) {
                setError(result.error ?? "");
                return;
            }

            setAuth(result.auth);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    const unlockAccount = async (account: AccountSummary, password: string) => {
        setUnlockError("");
        setBusy(true);

        try {
            setAuth(await unlock(password, account.dir));
            setUnlocking(null);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setUnlockError(message);

            // The backend drops a session VRChat rejected, so offer a fresh sign-in instead of
            // leaving the same expired password panel open. The reason stays on the sign-in form.
            const next = await getAuth().catch(() => null);
            if (next && !next.accounts.some((entry) => entry.dir === account.dir && entry.stored)) {
                setAuth(next);
                setUnlockError("");
                setUnlocking(null);
                setError(message);
                setAdding(true);
            }
        } finally {
            setBusy(false);
        }
    };

    const remove = async (account: AccountSummary) => {
        setError("");
        setBusy(true);

        try {
            setAuth(await removeAccount(account.dir));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    const forgetSaved = async (account: SavedAccount) => {
        setError("");
        setBusy(true);

        try {
            setAuth(await forgetSavedPassword(account.dir));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    const cancelAdd = () => {
        setAdding(false);
        setError("");
        void cancelSignIn().then(setAuth, () => {
        });
    };

    // Until the host answers, drawing the signed-out page would flash it over a signed-in account.
    if (!loaded)
        return <Page $wide/>;

    let content;

    if (auth.state === "locked" && !browsing)
        content = <UnlockForm auth={auth} busy={busy} error={error} run={run}
                              onBrowse={hasAccounts ? () => setBrowsing(true) : undefined}/>;
    else if (auth.state === "twoFactor")
        content = <TwoFactorForm auth={auth} busy={busy} error={error} run={run}
                                 onCancel={hasAccounts ? cancelAdd : undefined}/>;
    else if (showAdd)
        content = <LoginForm auth={auth} busy={busy} error={error} onCancel={hasAccounts ? cancelAdd : undefined}
                             onForgetSaved={(account) => void forgetSaved(account)}
                             onSignedIn={(next) => {
                                 setAuth(next);
                                 setAdding(false);
                             }}
                             onSignInSaved={(account) => void signInSaved(account)} run={run}/>;
    else
        content = (
            <>
                {signedIn && <Profile auth={auth} busy={busy} error={error} run={run}/>}
                {signedIn && <StorageChoice key={auth.user?.id} auth={auth} busy={busy} error={error} run={run}/>}
                <AccountList accounts={auth.accounts} busy={busy} onAdd={() => {
                    setError("");
                    setAdding(true);
                }} onRemove={(account) => void remove(account)} onSwitch={(account) => void switchTo(account)}
                             signedIn={signedIn}/>
                {error && <ErrorText>{error}</ErrorText>}
            </>
        );

    return (
        <Page $wide={centred}>
            {expired && (
                <SessionNotice role="alert">
                    <ShieldIcon size={16}/>
                    <span>{t("vr_chat_session_expired_sign_in_again")}</span>
                    <NoticeSignIn disabled={busy} onClick={() => {
                        setError("");
                        setAdding(true);
                    }} type="button">
                        {t("sign_in")}
                    </NoticeSignIn>
                </SessionNotice>
            )}
            {content}
            {unlocking && (
                <UnlockPanel account={unlocking} busy={busy} error={unlockError}
                             onCancel={() => {
                                 setUnlocking(null);
                                 setUnlockError("");
                             }}
                             onUnlock={(password) => void unlockAccount(unlocking, password)}/>
            )}
        </Page>
    );
}

/** The accounts AntiBot can switch to, with the one that is signed in marked. */
function AccountList({accounts, busy, signedIn, onAdd, onSwitch, onRemove}: {
    accounts: AccountSummary[];
    busy: boolean;
    signedIn: boolean;
    onAdd: () => void;
    onSwitch: (account: AccountSummary) => void;
    onRemove: (account: AccountSummary) => void;
}) {
    const t = useTranslation();

    return (
        <Card>
            <CardHead>
                <UsersIcon size={20}/>
                <div>
                    <h2>{t("accounts")}</h2>
                    <p>
                        {signedIn
                            ? t("switch_to_another_account_only_one_is_signed_in_at_a_time")
                            : t("pick_an_account_to_sign_in_with")}
                    </p>
                </div>
            </CardHead>

            {accounts.length > 0 && (
                <List>
                    {accounts.map((account) => {
                        const current = account.active && signedIn;

                        const open = () => {
                            if (!busy && !current)
                                onSwitch(account);
                        };

                        return (
                            <AccountRow
                                $active={account.active}
                                $clickable={!current}
                                aria-current={current ? "true" : undefined}
                                key={account.dir}
                                onClick={open}
                                onKeyDown={(event) => {
                                    if (event.key !== "Enter" && event.key !== " ")
                                        return;

                                    event.preventDefault();
                                    open();
                                }}
                                role={current ? undefined : "button"}
                                tabIndex={current ? undefined : 0}
                            >
                                <AvatarSmall $src={account.avatar}>
                                    {account.avatar ? null : account.name.slice(0, 1).toUpperCase()}
                                </AvatarSmall>
                                <RowText>
                                    <strong>{account.name}</strong>
                                    <span>{t(storageLabel(account.storage))}</span>
                                </RowText>
                                {current
                                    ? <ActiveTag>{t("signed_in")}</ActiveTag>
                                    : (
                                        <RowActions>
                                            <IconButton
                                                aria-label={t("remove_account")}
                                                disabled={busy}
                                                onClick={(event) => {
                                                    // The row itself switches accounts.
                                                    event.stopPropagation();
                                                    onRemove(account);
                                                }}
                                                type="button">
                                                <TrashIcon size={14}/>
                                            </IconButton>
                                        </RowActions>
                                    )}
                            </AccountRow>
                        );
                    })}
                </List>
            )}

            <Actions>
                <Secondary disabled={busy} onClick={onAdd} type="button">{t("add_account")}</Secondary>
            </Actions>
        </Card>
    );
}

/** Accounts with a password on this device; pressing a row signs in without typing anything. */
function SavedAccounts({accounts, busy, onSignIn, onForget}: {
    accounts: SavedAccount[];
    busy: boolean;
    onSignIn: (account: SavedAccount) => void;
    onForget: (account: SavedAccount) => void;
}) {
    const t = useTranslation();

    return (
        <Card>
            <CardHead>
                <KeyIcon size={20}/>
                <div>
                    <h2>{t("saved_accounts")}</h2>
                    <p>{t("press_an_account_to_sign_in_with_its_saved_password")}</p>
                </div>
            </CardHead>

            <List>
                {accounts.map((account) => (
                    <AccountRow
                        $active={false}
                        $clickable={!busy}
                        key={account.dir}
                        onClick={() => {
                            if (!busy) onSignIn(account);
                        }}
                        onKeyDown={(event) => {
                            if (busy || (event.key !== "Enter" && event.key !== " "))
                                return;

                            event.preventDefault();
                            onSignIn(account);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <AvatarSmall $src={account.avatar}>
                            {account.avatar ? null : account.name.slice(0, 1).toUpperCase()}
                        </AvatarSmall>
                        <RowText>
                            <strong>{account.name}</strong>
                            <span>{account.autoLogin ? t("signs_in_automatically") : t("manual_sign_in")}</span>
                        </RowText>
                        <RowActions>
                            <IconButton
                                aria-label={t("forget_saved_password")}
                                disabled={busy}
                                onClick={(event) => {
                                    // The row itself signs in.
                                    event.stopPropagation();
                                    onForget(account);
                                }}
                                title={t("forget_saved_password")}
                                type="button">
                                <TrashIcon size={14}/>
                            </IconButton>
                        </RowActions>
                    </AccountRow>
                ))}
            </List>
        </Card>
    );
}

/** Asks for the password of an account that was stored in password mode. */
function UnlockPanel({account, busy, error, onUnlock, onCancel}: {
    account: AccountSummary;
    busy: boolean;
    error: string;
    onUnlock: (password: string) => void;
    onCancel: () => void;
}) {
    const t = useTranslation();
    const [password, setPassword] = useState("");

    const submit = (event: FormEvent) => {
        event.preventDefault();
        onUnlock(password);
    };

    return (
        <StorageOverlay>
            <StoragePanel aria-modal="true" role="dialog">
                <CardHead>
                    <KeyIcon size={20}/>
                    <div>
                        <h2>{t("unlock_name", {name: account.name})}</h2>
                        <p>
                            {t("the_session_was_encrypted_with_a_key_derived_from_your_password_it_is_never_stored_so_it_has_to_be_typed_again")}
                        </p>
                    </div>
                </CardHead>

                <Form onSubmit={submit}>
                    <Field>
                        <Label htmlFor="switch-password">{t("password")}</Label>
                        <PasswordInput
                            autoComplete="current-password"
                            autoFocus
                            id="switch-password"
                            onChange={setPassword}
                            value={password}
                        />
                    </Field>

                    {error && <ErrorText>{error}</ErrorText>}

                    <Actions>
                        <Primary disabled={busy} type="submit">
                            {busy ? t("unlocking") : t("unlock")}
                        </Primary>
                        <Secondary disabled={busy} onClick={onCancel} type="button">{t("cancel")}</Secondary>
                    </Actions>
                </Form>
            </StoragePanel>
        </StorageOverlay>
    );
}

function LoginForm({auth, busy, error, run, onSignedIn, onSignInSaved, onForgetSaved, onCancel}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
    onSignedIn: (auth: AuthSnapshot) => void;
    onSignInSaved: (account: SavedAccount) => void;
    onForgetSaved: (account: SavedAccount) => void;
    onCancel?: () => void;
}) {
    const t = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [autoLogin, setAutoLogin] = useState(true);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void run(() => login(username.trim(), password, remember, remember && autoLogin));
    };

    return (
        <AuthStage>
            <LoginWrap>
                {auth.saved.length > 0 && (
                    <SavedAccounts accounts={auth.saved} busy={busy} onForget={onForgetSaved}
                                   onSignIn={onSignInSaved}/>
                )}

                <LoginCard>
                    <LoginSide>
                        <LoginHead>
                            <Logo>
                                <UserIcon size={22}/>
                            </Logo>
                            <h1>{t("sign_in_to_vr_chat")}</h1>
                            <p>{t("use_your_vr_chat_account_or_scan_the_code_instead")}</p>
                        </LoginHead>

                        <Form onSubmit={submit}>
                            <Field>
                                <Label htmlFor="username">{t("username_or_email")}</Label>
                                <UsernameInput onChange={setUsername} value={username}/>
                            </Field>

                            <Field>
                                <Label htmlFor="password">{t("password")}</Label>
                                <PasswordInput
                                    autoComplete="current-password"
                                    id="password"
                                    onChange={setPassword}
                                    value={password}
                                />
                            </Field>

                            <LoginOptions>
                                <Toggle
                                    checked={remember}
                                    hint={t("keeps_this_account_s_password_on_this_device_encrypted_by_the_os_or_the_tpm")}
                                    onChange={(value) => {
                                        setRemember(value);
                                        if (!value) setAutoLogin(false);
                                    }}
                                    title={t("remember_password")}
                                />

                                <Toggle
                                    checked={autoLogin}
                                    disabled={!remember}
                                    hint={t("signs_in_with_the_saved_password_when_the_session_expires_vr_chat_may_still_ask_for_a_two_factor_code")}
                                    onChange={setAutoLogin}
                                    title={t("sign_in_automatically")}
                                />
                            </LoginOptions>

                            {error && <ErrorText>{error}</ErrorText>}

                            <Submit disabled={busy} type="submit">
                                {busy ? t("signing_in") : t("sign_in")}
                            </Submit>
                            {onCancel && (
                                <SecondaryInline disabled={busy} onClick={onCancel} type="button">
                                    {t("cancel")}
                                </SecondaryInline>
                            )}
                        </Form>

                        <Note>
                            {t("signing_in_is_optional_without_it_anti_bot_only_reads_vr_chat_s_local_log_so_the_instance_list_can_be_inaccurate_and_player_details_are_unavailable")}
                        </Note>
                    </LoginSide>

                    <QrSide>
                        <div>
                            <h2>{t("or_scan_to_sign_in")}</h2>
                            <p>{t("approve_it_in_the_vr_chat_app_the_password_never_reaches_anti_bot")}</p>
                        </div>
                        <DeviceLogin onSignedIn={onSignedIn}/>
                    </QrSide>
                </LoginCard>
            </LoginWrap>
        </AuthStage>
    );
}

function TwoFactorForm({auth, busy, error, run, onCancel}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
    onCancel?: () => void;
}) {
    const t = useTranslation();
    const methods = auth.twoFactorMethods.length > 0 ? auth.twoFactorMethods : ["totp", "otp"];
    const [method, setMethod] = useState(methods[0]);
    const [code, setCode] = useState("");

    const submit = (event: FormEvent) => {
        event.preventDefault();

        // VRChat's recovery codes are eight digits; the API expects them in two groups of four.
        const raw = code.trim();
        const value = method === "otp" && /^\d{8}$/.test(raw)
            ? `${raw.slice(0, 4)}-${raw.slice(4)}`
            : raw;

        void run(() => verify(method, value));
    };

    return (
        <AuthStage>
            <NarrowCard>
                <CardHead>
                    <ShieldIcon size={20}/>
                    <div>
                        <h2>{t("two_factor_authentication")}</h2>
                        <p>{t("vr_chat_wants_a_second_factor_before_it_hands_over_the_session")}</p>
                    </div>
                </CardHead>

                <MethodRow>
                    {methods.map((id) => (
                        <Method key={id} $active={method === id} onClick={() => setMethod(id)} type="button">
                            {t(methodLabel(id))}
                        </Method>
                    ))}
                </MethodRow>

                <Form onSubmit={submit}>
                    <Field>
                        <Label htmlFor="code">{t(methodHint(method))}</Label>
                        <Input
                            autoComplete="one-time-code"
                            autoFocus
                            id="code"
                            inputMode="numeric"
                            onChange={(event) => setCode(event.target.value)}
                            placeholder={method === "emailOtp" ? "123456" : "123456"}
                            value={code}
                        />
                    </Field>

                    {error && <ErrorText>{error}</ErrorText>}

                    <Submit disabled={busy} type="submit">
                        {busy ? t("verifying") : t("verify")}
                    </Submit>
                    {onCancel && (
                        <SecondaryInline disabled={busy} onClick={onCancel} type="button">
                            {t("cancel")}
                        </SecondaryInline>
                    )}
                </Form>
            </NarrowCard>
        </AuthStage>
    );
}

function UnlockForm({auth, busy, error, run, onBrowse}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
    onBrowse?: () => void;
}) {
    const t = useTranslation();
    const [password, setPassword] = useState("");
    const hello = auth.storage === "hello";

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void run(() => unlock(hello ? "" : password));
    };

    return (
        <AuthStage>
            <NarrowCard>
                <CardHead>
                    <KeyIcon size={20}/>
                    <div>
                        <h2>{hello ? t("unlock_with_windows_hello") : t("unlock_the_saved_session")}</h2>
                        <p>
                            {hello
                                ? t("the_session_is_protected_by_windows_hello_confirm_with_your_pin_fingerprint_or_face")
                                : t("the_session_was_encrypted_with_a_key_derived_from_your_password_it_is_never_stored_so_it_has_to_be_typed_again")}
                        </p>
                    </div>
                </CardHead>

                <Form onSubmit={submit}>
                    {!hello && (
                        <Field>
                            <Label htmlFor="unlock-password">{t("password")}</Label>
                            <PasswordInput
                                autoComplete="current-password"
                                autoFocus
                                id="unlock-password"
                                onChange={setPassword}
                                value={password}
                            />
                        </Field>
                    )}

                    {error && <ErrorText>{error}</ErrorText>}

                    <Submit disabled={busy} type="submit">
                        {busy ? t("unlocking") : hello ? t("unlock_with_windows_hello") : t("unlock")}
                    </Submit>
                    <SecondaryInline onClick={() => void run(async () => {
                        return await saveStorage("none");
                    })} type="button">
                        {t("forget_it")}
                    </SecondaryInline>
                    {onBrowse && (
                        <SecondaryInline disabled={busy} onClick={onBrowse} type="button">
                            {t("accounts")}
                        </SecondaryInline>
                    )}
                </Form>
            </NarrowCard>
        </AuthStage>
    );
}

function Profile({auth, busy, error, run}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
}) {
    const t = useTranslation();
    const user = auth.user!;
    const status = statusInfo(user.status);

    return (
        <>
            <Card>
                <ProfileRow>
                    <Avatar $src={user.avatarUrl}/>
                    <Identity>
                        <h2>{user.displayName}</h2>
                        <StatusLine>
                            {status && <StatusDot $color={status.color}/>}
                            <p>{user.statusDescription || (status ? t(status.labelKey) : t("signed_in_to_vr_chat"))}</p>
                        </StatusLine>
                        {auth.expiresAt && (
                            <p>{t("session_expires_date", {
                                date: new Date(auth.expiresAt).toLocaleDateString(),
                            })}</p>
                        )}
                    </Identity>
                    <SignOut disabled={busy} onClick={() => void run(logout)} type="button">
                        {t("sign_out")}
                    </SignOut>
                </ProfileRow>

                {error && <ErrorText>{error}</ErrorText>}
            </Card>
        </>
    );
}

/** The presence label and colour the site uses. */
function statusInfo(status?: string): { labelKey: LocalizationKey; color: string } | null {
    switch (status) {
        case "active":
            return {labelKey: "online", color: "#4ade80"};
        case "join me":
            return {labelKey: "join_me", color: "#60a5fa"};
        case "ask me":
            return {labelKey: "ask_me", color: "#fbbf24"};
        case "busy":
            return {labelKey: "busy", color: "#f87171"};
        case "offline":
            return {labelKey: "offline", color: "#94a3b8"};
        default:
            return status && status.length > 0 ? {labelKey: status as LocalizationKey, color: "#94a3b8"} : null;
    }
}

/** The login name, masked like a password until the eye is used. */
function UsernameInput({value, onChange}: { value: string; onChange: (value: string) => void }) {
    const t = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
        <PasswordWrap>
            <Input
                autoComplete="username"
                id="username"
                onChange={(event) => onChange(event.target.value)}
                placeholder={t("username")}
                type={visible ? "text" : "password"}
                value={value}
            />
            <PasswordReveal
                aria-label={visible ? t("hide_the_username") : t("show_the_username")}
                onClick={() => setVisible((current) => !current)}
                type="button"
            >
                {visible ? <EyeOffIcon size={14}/> : <EyeIcon size={14}/>}
            </PasswordReveal>
        </PasswordWrap>
    );
}

/** A password field with its own reveal button, instead of relying on the web view's. */
function PasswordInput({id, value, onChange, placeholder = "••••••••", autoComplete, autoFocus}: {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    autoComplete?: string;
    autoFocus?: boolean;
}) {
    const t = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
        <PasswordWrap>
            <Input
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                id={id}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                type={visible ? "text" : "password"}
                value={value}
            />
            <PasswordReveal
                aria-label={visible ? t("hide_password") : t("show_password")}
                onClick={() => setVisible((current) => !current)}
                type="button"
            >
                {visible ? <EyeOffIcon size={14}/> : <EyeIcon size={14}/>}
            </PasswordReveal>
        </PasswordWrap>
    );
}

function StorageChoice({auth, busy, error, run}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
}) {
    const t = useTranslation();
    const systemAvailable = auth.systemStorage;
    const systemName = auth.systemStorageName || "System protection";
    const tpmAvailable = auth.tpmStorage;
    const helloAvailable = auth.helloStorage;
    const softwareAvailable = auth.softwareStorage;
    const saved = auth.storage !== "none";
    const signedIn = auth.state === "loggedIn";

    // The panel opens for a fresh account as soon as the account page appears; it must not be
    // suppressed by the automatic sign-in option.
    const [open, setOpen] = useState(!saved && !auth.storageChosen);
    const [mode, setMode] = useState<AuthStorage>(saved ? auth.storage : "none");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [localError, setLocalError] = useState("");

    // A save from somewhere else closes the stale panel instead of leaving it over the new state.
    useEffect(() => {
        if (saved || auth.storageChosen)
            setOpen(false);
    }, [saved, auth.storageChosen]);

    const openPanel = () => {
        setMode(saved ? auth.storage : "none");
        setPassword("");
        setConfirm("");
        setLocalError("");
        setOpen(true);
    };

    // A fresh login has no stored choice yet, so the default "do_not_remember" must still be savable.
    const dirty = mode !== auth.storage || (mode === "password" && password.length > 0) || !auth.storageChosen;

    const save = () => {
        if (!signedIn) {
            setLocalError(t("sign_in_first"));
            return;
        }

        // Opening the panel and saving without a change just closes it; there is no other way out.
        if (!dirty) {
            setOpen(false);
            return;
        }

        if (mode === "password") {
            if (password.length < 1) {
                setLocalError(t("enter_the_password_that_unlocks_the_session"));
                return;
            }

            if (password !== confirm) {
                setLocalError(t("the_passwords_do_not_match"));
                return;
            }
        }

        setLocalError("");
        void run(() => saveStorage(mode, mode === "password" ? password : undefined)).then((ok) => {
            if (!ok) return;

            setPassword("");
            setConfirm("");
            setOpen(false);
        });
    };

    if (!open) {
        return (
            <Card>
                <SavedRow>
                    <SavedValue>{t("currently_storage", {storage: t(storageLabel(auth.storage))})}</SavedValue>
                    <Secondary onClick={openPanel} type="button">{t("change_save_method")}</Secondary>
                </SavedRow>
            </Card>
        );
    }

    return (
        <StorageOverlay>
            <StoragePanel aria-modal="true" role="dialog">
                <CardHead>
                    <ShieldIcon size={20}/>
                    <div>
                        <h2>{t("keep_the_session_between_launches")}</h2>
                        <p>
                            {t("only_the_vr_chat_session_cookie_is_stored_never_your_password_every_mode_except_do_not_remember_encrypts_it_at_rest_the_difference_is_what_unlocks_it")}
                        </p>
                    </div>
                </CardHead>

                <Options>
                    <Option
                        $active={mode === "software"}
                        $disabled={!softwareAvailable}
                        onClick={() => softwareAvailable && setMode("software")}
                        type="button"
                    >
                        <OptionHead>
                            <strong>{t("software_key")}</strong>
                            <Tag>{t("obfuscation")}</Tag>
                            <Safety $tone="weak">{t("weak")}</Safety>
                            <Platforms>{t("linux")}</Platforms>
                        </OptionHead>
                        <p>{t("aes_256_gcm_with_a_key_file_next_to_the_session_obfuscation_only_not_real_protection")}</p>
                    </Option>

                    <Option
                        $active={mode === "system"}
                        $disabled={!systemAvailable}
                        onClick={() => systemAvailable && setMode("system")}
                        type="button"
                    >
                        <OptionHead>
                            <strong>{systemName}</strong>
                            <Tag>{t("encrypted")}</Tag>
                            <Safety $tone="fair">{t("fair")}</Safety>
                            <Platforms>
                                {systemName === "Windows DPAPI" ? t("windows") :
                                    systemName === "System keyring" ? t("linux") : t("windows_linux")}
                            </Platforms>
                        </OptionHead>
                        <p>
                            {systemName === "Windows DPAPI"
                                ? t("encrypted_with_windows_dpapi_for_your_account_unlocks_automatically")
                                : t("held_in_the_desktop_keyring_unlocks_with_your_login_session")}
                        </p>
                    </Option>

                    <Option
                        $active={mode === "tpm"}
                        $disabled={!tpmAvailable}
                        onClick={() => tpmAvailable && setMode("tpm")}
                        type="button"
                    >
                        <OptionHead>
                            <strong>{t("tpm")}</strong>
                            <Tag>{t("no_prompt")}</Tag>
                            <Safety $tone="good">{t("good")}</Safety>
                            <Platforms>{t("windows_linux")}</Platforms>
                        </OptionHead>
                        <p>{t("aes_key_wrapped_by_this_machine_s_tpm_unlocks_automatically")}</p>
                    </Option>

                    <Option
                        $active={mode === "hello"}
                        $disabled={!helloAvailable}
                        onClick={() => helloAvailable && setMode("hello")}
                        type="button"
                    >
                        <OptionHead>
                            <strong>{t("windows_hello")}</strong>
                            <Tag>{t("pin_biometrics")}</Tag>
                            <Safety $tone="strong">{t("strong")}</Safety>
                            <Platforms>{t("windows")}</Platforms>
                        </OptionHead>
                        <p>{t("windows_hello_confirms_it_is_you_before_unlocking")}</p>
                    </Option>

                    <Option $active={mode === "password"} onClick={() => setMode("password")} type="button">
                        <OptionHead>
                            <strong>{t("password")}</strong>
                            <Tag>{t("asks_every_launch")}</Tag>
                            <Safety $tone="strong">{t("strong")}</Safety>
                            <Platforms>{t("windows_linux")}</Platforms>
                        </OptionHead>
                        <p>{t("aes_256_gcm_with_a_key_derived_from_your_password_asked_each_launch")}</p>
                    </Option>

                    <Option $active={mode === "none"} onClick={() => setMode("none")} type="button">
                        <OptionHead>
                            <strong>{t("do_not_remember")}</strong>
                            <Tag>{t("nothing_on_disk")}</Tag>
                            <Safety $tone="safest">{t("safest")}</Safety>
                            <Platforms>{t("windows_linux")}</Platforms>
                        </OptionHead>
                        <p>{t("nothing_is_written_the_next_launch_signs_in_again")}</p>
                    </Option>
                </Options>

                {mode === "password" && (
                    <Field>
                        <Label htmlFor="storage-password">{t("password_for_this_session")}</Label>
                        <PasswordInput
                            autoComplete="current-password"
                            id="storage-password"
                            onChange={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            autoComplete="current-password"
                            onChange={setConfirm}
                            placeholder={t("repeat_the_password")}
                            value={confirm}
                        />
                    </Field>
                )}

                {(localError || error) && <ErrorText>{localError || error}</ErrorText>}

                <Actions>
                    <Primary disabled={busy || !signedIn} onClick={save} type="button">
                        {busy ? t("saving") : t("save")}
                    </Primary>
                </Actions>
            </StoragePanel>
        </StorageOverlay>
    );
}

function DeviceLogin({onSignedIn}: { onSignedIn: (auth: AuthSnapshot) => void }) {
    const t = useTranslation();
    const [device, setDevice] = useState<DeviceCode | null>(null);
    const [error, setError] = useState("");
    const [expired, setExpired] = useState(false);
    const [starting, setStarting] = useState(true);
    const inFlight = useRef(false);

    const start = useCallback(async () => {
        // The page can mount twice in a row, and two codes would only fight over the client.
        if (inFlight.current)
            return;

        inFlight.current = true;
        setError("");
        setExpired(false);
        setStarting(true);

        try {
            setDevice(await startDevice());
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            inFlight.current = false;
            setStarting(false);
        }
    }, []);

    // The code is shown next to the password form, so it is fetched as soon as the page opens.
    useEffect(() => {
        if (!Native.available) {
            setStarting(false);
            return;
        }

        void start();
    }, [start]);

    useEffect(() => {
        if (!device) return;

        let cancelled = false;
        let timer = 0;
        let interval = Math.max(device.interval, 2) * 1000;
        const deadline = Date.now() + Math.max(device.expiresIn, 60) * 1000;

        const tick = async () => {
            if (Date.now() > deadline) {
                setExpired(true);
                return;
            }

            try {
                const poll = await pollDevice(device.deviceCode);
                if (cancelled) return;

                if (poll.approved && poll.auth) {
                    onSignedIn(poll.auth);
                    return;
                }

                const reason = poll.reason ?? "pending";

                if (reason === "expired_token") {
                    setExpired(true);
                    return;
                }

                if (reason === "slow_down") {
                    interval += 5000;
                } else if (reason === "rate_limited") {
                    // VRChat is throttling the polls; wait longer instead of hammering it.
                    interval = Math.max(interval, 15_000);
                } else if (reason !== "pending" && reason !== "authorization_pending") {
                    setError(reason);
                    return;
                }

                timer = window.setTimeout(() => void tick(), interval);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : String(err));
            }
        };

        timer = window.setTimeout(() => void tick(), interval);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [device, onSignedIn]);

    const failed = !!error || expired;

    return (
        <QrPanel>
            <QrFrame $dim={!device || failed}>
                {device?.qrDataUrl
                    ? <Qr alt={t("device_sign_in")} src={device.qrDataUrl}/>
                    : <QrEmpty>{starting ? t("preparing_the_code") : t("the_sign_in_code_is_unavailable")}</QrEmpty>}
            </QrFrame>

            {failed
                ? <QrStatus>
                    <span>{error || t("the_code_expired_start_again")}</span>
                    <LinkButton onClick={() => void start()} type="button">{t("try_again")}</LinkButton>
                </QrStatus>
                : <QrStatus>{device ? t("waiting_for_approval") : t("preparing_the_code")}</QrStatus>}

            {device && (
                <LinkBox>
                    <a href={device.url} rel="noreferrer" target="_blank">{t("open_the_link_instead")}</a>
                </LinkBox>
            )}
        </QrPanel>
    );
}

function methodLabel(method: string) {
    switch (method) {
        case "totp":
            return "authenticator";
        case "emailOtp":
            return "email_code";
        default:
            return "recovery_code";
    }
}

function methodHint(method: string) {
    switch (method) {
        case "totp":
            return "code_from_your_authenticator_app";
        case "emailOtp":
            return "code_vr_chat_emailed_you";
        default:
            return "one_of_your_recovery_codes";
    }
}

function storageLabel(storage: AuthStorage): LocalizationKey {
    switch (storage) {
        case "password":
            return "password_encrypted";
        case "system":
            return "system_protected";
        case "tpm":
            return "tpm_protected";
        case "hello":
            return "windows_hello";
        case "software":
            return "software_key";
        default:
            return "not_stored";
    }
}

const Page = styled.div<{ $wide?: boolean }>`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: ${({$wide}) => ($wide ? "none" : "720px")};
    overflow: auto;
`;

/** Holds the sign-in forms in the middle of the page instead of stacking them at the top. */
const AuthStage = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    padding: 12px 0;
    overflow: auto;
`;

const Card = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`;

/** A single-column card for the steps after the password, such as the second factor. */
const NarrowCard = styled(Card)`
    width: 100%;
    max-width: 420px;
    margin: auto;
`;

/** Stacks the saved-account list above the sign-in card; the wrapper is what is centred. */
const LoginWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 640px;
    margin: auto;
`;

const LoginCard = styled.section`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 272px;
    width: 100%;
    max-width: 640px;
    margin: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    background: var(--bg-card);
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);

    @media (max-width: 860px) {
        grid-template-columns: minmax(0, 1fr);
        max-width: 380px;
    }
`;

const LoginSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 28px;
`;

const LoginHead = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 12px;
        line-height: 1.55;
        color: var(--text-secondary);
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
`;

const QrSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 30px 24px;
    border-left: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.015);

    h2 {
        font-size: 13px;
        font-weight: 600;
    }

    p {
        margin-top: 4px;
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }

    @media (max-width: 860px) {
        border-left: 0;
        border-top: 1px solid var(--border-color);
    }
`;

const QrPanel = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const QrFrame = styled.div<{ $dim: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 188px;
    aspect-ratio: 1;
    padding: 10px;
    border-radius: var(--radius-md);
    background: #fff;
    opacity: ${({$dim}) => ($dim ? 0.4 : 1)};
    transition: opacity 0.15s ease;
`;

const QrEmpty = styled.span`
    padding: 0 10px;
    color: #4b5563;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.5;
    text-align: center;
`;

const QrStatus = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    min-height: 16px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    text-align: center;
`;

const LinkButton = styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--accent-primary);
    font: inherit;
    font-size: 10px;
    text-decoration: underline;
    cursor: pointer;
`;

const CardHead = styled.div`
    display: flex;
    gap: 12px;

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

/** The two per-account sign-in options, between the password and the submit button. */
const LoginOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.015);
`;

const Label = styled.label`
    font-size: 11px;
    color: var(--text-secondary);
`;

const Input = styled.input`
    padding: 9px 11px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font: inherit;
    font-size: 13px;

    &:focus {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const buttonBase = styled.button<{ $primary?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    border: 1px solid ${({$primary}) => $primary ? "transparent" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$primary}) => $primary ? "var(--accent-primary)" : "transparent"};
    color: ${({$primary}) => $primary ? "#0b0714" : "var(--text-primary)"};
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background: ${({$primary}) => $primary ? "var(--accent-primary)" : "var(--bg-card-hover)"};
    }
`;

const Primary = styled(buttonBase).attrs({$primary: true})``;
const Secondary = styled(buttonBase).attrs({$primary: false})``;

/** The one call to action of a sign-in step, so it spans the form like a normal login page. */
const Submit = styled(Primary)`
    justify-content: center;
    padding: 10px 14px;
`;

/** Pushes the sign-out button to the far side of the profile card. */
const SignOut = styled(Secondary)`
    margin-left: auto;
`;

/** A secondary action under a full-width submit, kept narrow instead of spanning the form. */
const SecondaryInline = styled(Secondary)`
    align-self: center;
`;

const MethodRow = styled.div`
    display: flex;
    gap: 8px;
`;

const Method = styled.button<{ $active: boolean }>`
    padding: 6px 11px;
    border: 1px solid ${({$active}) => $active ? "var(--accent-primary)" : "var(--border-color)"};
    border-radius: 999px;
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.12)" : "transparent"};
    color: ${({$active}) => $active ? "var(--text-primary)" : "var(--text-secondary)"};
    font: inherit;
    font-size: 11px;
    cursor: pointer;
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: #f87171;
`;

/** The saved session stopped working; shown above the sign-in/account panels. */
const SessionNotice = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 10px 12px;
    border: 1px solid rgba(251, 191, 36, 0.32);
    border-radius: 10px;
    background: rgba(251, 191, 36, 0.08);
    color: #fbbf24;
    font-size: 12px;
    line-height: 1.4;

    svg {
        flex-shrink: 0;
    }
`;

/** The shortcut in the expiry notice, so the rejected session is never tried again. */
const NoticeSignIn = styled(buttonBase)`
    margin-left: auto;
    flex-shrink: 0;
    padding: 5px 10px;
    border-color: rgba(251, 191, 36, 0.45);
    color: #fbbf24;
    font-size: 11px;

    &:hover:not(:disabled) {
        background: rgba(251, 191, 36, 0.14);
    }
`;

const Note = styled.p`
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-muted);
`;

/** The collapsed state of the storage choice: only the current mode and a way to change it. */
const SavedRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`;

const SavedValue = styled.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`;

/** The storage choices are a modal page: it can only be left by saving. */
const StorageOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`;

const StoragePanel = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 620px;
    max-height: 100%;
    overflow-y: auto;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const ProfileRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Avatar = styled.div<{ $src?: string }>`
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const AccountRow = styled.div<{ $active: boolean; $clickable: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border: 1px solid ${({$active}) => $active ? "var(--accent-primary)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.08)" : "var(--bg-primary)"};
    cursor: ${({$clickable}) => $clickable ? "pointer" : "default"};

    ${({$clickable}) => $clickable && `
        &:hover {
            background: var(--bg-card-hover);
        }
    `}
    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`;

const AvatarSmall = styled.div<{ $src?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-card) center / cover no-repeat;
    background-image: ${({$src}) => $src ? `url("${$src}")` : "none"};
    box-shadow: inset 0 0 0 1px var(--border-color);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
`;

const RowText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;

    strong {
        overflow: hidden;
        font-size: 13px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-muted);
    }
`;

const RowActions = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
`;

const ActiveTag = styled.span`
    margin-left: auto;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`;

const Identity = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    h2 {
        font-size: 17px;
        font-weight: 600;
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
    }
`;

const StatusLine = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const StatusDot = styled.span<{ $color: string }>`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color}) => $color};
    box-shadow: 0 0 6px ${({$color}) => $color};
`;

const IconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`;

const PasswordWrap = styled.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`;

const PasswordReveal = styled(IconButton)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Option = styled.button<{ $active: boolean; $disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 14px;
    border: 1px solid ${({$active}) => $active ? "var(--accent-primary)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.08)" : "transparent"};
    color: var(--text-primary);
    font: inherit;
    text-align: left;
    cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
    opacity: ${({$disabled}) => $disabled ? 0.5 : 1};
    filter: ${({$disabled}) => $disabled ? "grayscale(1)" : "none"};

    p {
        font-size: 11px;
        line-height: 1.55;
        color: var(--text-secondary);
    }
`;

const OptionHead = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    strong {
        font-size: 12px;
        font-weight: 600;
    }
`;

const Tag = styled.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--bg-primary);
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`;

const Platforms = styled.span`
    margin-left: auto;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.12);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`;

const Safety = styled.span<{ $tone: "weak" | "fair" | "good" | "strong" | "safest" }>`
    padding: 2px 7px;
    border-radius: 999px;
    background: ${({$tone}) => safetyBackground($tone)};
    color: ${({$tone}) => safetyColor($tone)};
    font-family: var(--font-mono);
    font-size: 9px;
`;

function safetyColor(tone: string) {
    switch (tone) {
        case "weak":
            return "#f87171";
        case "fair":
            return "#fb923c";
        case "good":
            return "#fbbf24";
        case "strong":
            return "#4ade80";
        default:
            return "#60a5fa";
    }
}

function safetyBackground(tone: string) {
    switch (tone) {
        case "weak":
            return "rgba(248, 113, 113, 0.14)";
        case "fair":
            return "rgba(251, 146, 60, 0.14)";
        case "good":
            return "rgba(251, 191, 36, 0.14)";
        case "strong":
            return "rgba(74, 222, 128, 0.14)";
        default:
            return "rgba(96, 165, 250, 0.14)";
    }
}

const Qr = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const LinkBox = styled.div`
    max-width: 100%;
    overflow: hidden;

    a {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--accent-primary);
        word-break: break-all;
    }
`;
