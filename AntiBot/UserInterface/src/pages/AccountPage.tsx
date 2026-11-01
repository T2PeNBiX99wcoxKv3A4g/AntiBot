import {type FormEvent, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Native, useTranslation} from "@photino-net-utils/bridge";
import {
    type AccountSummary,
    type AuthSnapshot,
    type AuthStorage,
    type DeviceCode,
    cancelSignIn,
    getAuth,
    login,
    logout,
    onAuthChanged,
    pollDevice,
    removeAccount,
    saveStorage,
    signedOut,
    startDevice,
    switchAccount,
    unlock,
    verify,
} from "../api/auth";
import {EyeIcon, EyeOffIcon, KeyIcon, ShieldIcon, TrashIcon, UserIcon, UsersIcon} from "../components/Icons";

type Run = (action: () => Promise<AuthSnapshot>) => Promise<boolean>;

/** The VRChat account: the account list, sign-in, the second factor, and how each session is kept. */
export function AccountPage() {
    const [auth, setAuth] = useState<AuthSnapshot>(signedOut);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [adding, setAdding] = useState(false);
    const [browsing, setBrowsing] = useState(false);
    const [unlocking, setUnlocking] = useState<AccountSummary | null>(null);
    const [unlockError, setUnlockError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onAuthChanged((next) => {
            if (!cancelled) setAuth(next);
        });

        void getAuth().then((next) => {
            if (!cancelled) setAuth(next);
        }, () => {
            // The host failed to answer; the signed-out form already covers it.
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
            setUnlockError(err instanceof Error ? err.message : String(err));
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

    const cancelAdd = () => {
        setAdding(false);
        setError("");
        void cancelSignIn().then(setAuth, () => {});
    };

    let content;

    if (auth.state === "locked" && !browsing)
        content = <UnlockForm auth={auth} busy={busy} error={error} run={run}
                              onBrowse={hasAccounts ? () => setBrowsing(true) : undefined}/>;
    else if (auth.state === "twoFactor")
        content = <TwoFactorForm auth={auth} busy={busy} error={error} run={run}
                                onCancel={hasAccounts ? cancelAdd : undefined}/>;
    else if (showAdd)
        content = <LoginForm busy={busy} error={error} onCancel={hasAccounts ? cancelAdd : undefined}
                             onSignedIn={(next) => {
                                 setAuth(next);
                                 setAdding(false);
                             }} run={run}/>;
    else
        content = (
            <>
                {signedIn && <Profile auth={auth} busy={busy} error={error} run={run}/>}
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
            {content}
            {signedIn && <StorageChoice key={auth.user?.id} auth={auth} busy={busy} error={error} run={run}/>}
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
                    <h2>{t("Accounts")}</h2>
                    <p>
                        {signedIn
                            ? t("Switch to another account; only one is signed in at a time.")
                            : t("Pick an account to sign in with.")}
                    </p>
                </div>
            </CardHead>

            {accounts.length > 0 && (
                <List>
                    {accounts.map((account) => (
                        <AccountRow key={account.dir} $active={account.active}>
                            <AvatarSmall $src={account.avatar}>
                                {account.avatar ? null : account.name.slice(0, 1).toUpperCase()}
                            </AvatarSmall>
                            <RowText>
                                <strong>{account.name}</strong>
                                <span>{t(storageLabel(account.storage))}</span>
                            </RowText>
                            {account.active && signedIn
                                ? <ActiveTag>{t("Signed in")}</ActiveTag>
                                : (
                                    <RowActions>
                                        <SmallButton disabled={busy} onClick={() => onSwitch(account)}
                                                     type="button">
                                            {signedIn ? t("Switch") : t("Sign in")}
                                        </SmallButton>
                                        <IconButton aria-label={t("Remove account")} disabled={busy}
                                                    onClick={() => onRemove(account)} type="button">
                                            <TrashIcon size={14}/>
                                        </IconButton>
                                    </RowActions>
                                )}
                        </AccountRow>
                    ))}
                </List>
            )}

            <Actions>
                <Secondary disabled={busy} onClick={onAdd} type="button">{t("Add account")}</Secondary>
            </Actions>
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
                        <h2>{t("Unlock {name}", {name: account.name})}</h2>
                        <p>
                            {t("The session was encrypted with a key derived from your password. It is never stored, so it has to be typed again.")}
                        </p>
                    </div>
                </CardHead>

                <Form onSubmit={submit}>
                    <Field>
                        <Label htmlFor="switch-password">{t("Password")}</Label>
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
                            {busy ? t("Unlocking…") : t("Unlock")}
                        </Primary>
                        <Secondary disabled={busy} onClick={onCancel} type="button">{t("Cancel")}</Secondary>
                    </Actions>
                </Form>
            </StoragePanel>
        </StorageOverlay>
    );
}

function LoginForm({busy, error, run, onSignedIn, onCancel}: {
    busy: boolean;
    error: string;
    run: Run;
    onSignedIn: (auth: AuthSnapshot) => void;
    onCancel?: () => void;
}) {
    const t = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void run(() => login(username.trim(), password));
    };

    return (
        <AuthStage>
            <LoginCard>
                <LoginSide>
                    <LoginHead>
                        <Logo>
                            <UserIcon size={22}/>
                        </Logo>
                        <h1>{t("Sign in to VRChat")}</h1>
                        <p>{t("The password is used for this one request and is never stored.")}</p>
                    </LoginHead>

                    <Form onSubmit={submit}>
                        <Field>
                            <Label htmlFor="username">{t("Username or email")}</Label>
                            <UsernameInput onChange={setUsername} value={username}/>
                        </Field>

                        <Field>
                            <Label htmlFor="password">{t("Password")}</Label>
                            <PasswordInput
                                autoComplete="current-password"
                                id="password"
                                onChange={setPassword}
                                value={password}
                            />
                        </Field>

                        {error && <ErrorText>{error}</ErrorText>}

                        <Submit disabled={busy} type="submit">
                            {busy ? t("Signing in…") : t("Sign in")}
                        </Submit>
                        {onCancel && (
                            <SecondaryInline disabled={busy} onClick={onCancel} type="button">
                                {t("Cancel")}
                            </SecondaryInline>
                        )}
                    </Form>

                    <Note>
                        {t("Signing in is optional. Without it AntiBot only reads VRChat's local log, so the instance list can be inaccurate and player details are unavailable. The password is used for this one request and is never stored; the session is kept out of the settings folder.")}
                    </Note>
                </LoginSide>

                <QrSide>
                    <div>
                        <h2>{t("Or scan to sign in")}</h2>
                        <p>{t("Approve it in the VRChat app; the password never reaches AntiBot.")}</p>
                    </div>
                    <DeviceLogin onSignedIn={onSignedIn}/>
                </QrSide>
            </LoginCard>
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
                        <h2>{t("Two-factor authentication")}</h2>
                        <p>{t("VRChat wants a second factor before it hands over the session.")}</p>
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
                        {busy ? t("Verifying…") : t("Verify")}
                    </Submit>
                    {onCancel && (
                        <SecondaryInline disabled={busy} onClick={onCancel} type="button">
                            {t("Cancel")}
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
                        <h2>{hello ? t("Unlock with Windows Hello") : t("Unlock the saved session")}</h2>
                        <p>
                            {hello
                                ? t("The session is protected by Windows Hello. Confirm with your PIN, fingerprint or face.")
                                : t("The session was encrypted with a key derived from your password. It is never stored, so it has to be typed again.")}
                        </p>
                    </div>
                </CardHead>

                <Form onSubmit={submit}>
                    {!hello && (
                        <Field>
                            <Label htmlFor="unlock-password">{t("Password")}</Label>
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
                        {busy ? t("Unlocking…") : hello ? t("Unlock with Windows Hello") : t("Unlock")}
                    </Submit>
                    <SecondaryInline onClick={() => void run(async () => {
                        return await saveStorage("none");
                    })} type="button">
                        {t("Forget it")}
                    </SecondaryInline>
                    {onBrowse && (
                        <SecondaryInline disabled={busy} onClick={onBrowse} type="button">
                            {t("Accounts")}
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
                            <p>{user.statusDescription || (status ? t(status.labelKey) : t("Signed in to VRChat"))}</p>
                        </StatusLine>
                        {auth.expiresAt && (
                            <p>{t("Session expires {date}", {
                                date: new Date(auth.expiresAt).toLocaleDateString(),
                            })}</p>
                        )}
                    </Identity>
                    <SignOut disabled={busy} onClick={() => void run(logout)} type="button">
                        {t("Sign out")}
                    </SignOut>
                </ProfileRow>

                {error && <ErrorText>{error}</ErrorText>}
            </Card>
        </>
    );
}

/** The presence label and colour the site uses. */
function statusInfo(status?: string): { labelKey: string; color: string } | null {
    switch (status) {
        case "active":
            return {labelKey: "Online", color: "#4ade80"};
        case "join me":
            return {labelKey: "Join Me", color: "#60a5fa"};
        case "ask me":
            return {labelKey: "Ask Me", color: "#fbbf24"};
        case "busy":
            return {labelKey: "Busy", color: "#f87171"};
        case "offline":
            return {labelKey: "Offline", color: "#94a3b8"};
        default:
            return status && status.length > 0 ? {labelKey: status, color: "#94a3b8"} : null;
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
                aria-label={visible ? t("Hide the username") : t("Show the username")}
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
                aria-label={visible ? t("Hide password") : t("Show password")}
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

    const [open, setOpen] = useState(!saved && !auth.storageChosen);
    const [mode, setMode] = useState<AuthStorage>(saved ? auth.storage : "none");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [localError, setLocalError] = useState("");

    // If the host answers after mount with a stored choice, do not pop the panel.
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

    // A fresh login has no stored choice yet, so the default "Do not remember" must still be savable.
    const dirty = mode !== auth.storage || (mode === "password" && password.length > 0) || !auth.storageChosen;

    const save = () => {
        if (!signedIn) {
            setLocalError(t("Sign in first."));
            return;
        }

        // Opening the panel and saving without a change just closes it; there is no other way out.
        if (!dirty) {
            setOpen(false);
            return;
        }

        if (mode === "password") {
            if (password.length < 1) {
                setLocalError(t("Enter the password that unlocks the session."));
                return;
            }

            if (password !== confirm) {
                setLocalError(t("The passwords do not match."));
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
                    <SavedValue>{t("Currently: {storage}", {storage: t(storageLabel(auth.storage))})}</SavedValue>
                    <Secondary onClick={openPanel} type="button">{t("Change save method")}</Secondary>
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
                    <h2>{t("Keep the session between launches")}</h2>
                    <p>
                        {t("Only the VRChat session cookie is stored, never your password. Every mode except \"Do not remember\" encrypts it at rest; the difference is what unlocks it.")}
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
                        <strong>{t("Software key")}</strong>
                        <Tag>{t("obfuscation")}</Tag>
                        <Safety $tone="weak">{t("weak")}</Safety>
                        <Platforms>{t("Linux")}</Platforms>
                    </OptionHead>
                    <p>{t("AES-256-GCM with a key file next to the session; obfuscation only, not real protection.")}</p>
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
                            {systemName === "Windows DPAPI" ? t("Windows") :
                                systemName === "System keyring" ? t("Linux") : t("Windows · Linux")}
                        </Platforms>
                    </OptionHead>
                    <p>
                        {systemName === "Windows DPAPI"
                            ? t("Encrypted with Windows DPAPI for your account; unlocks automatically.")
                            : t("Held in the desktop keyring; unlocks with your login session.")}
                    </p>
                </Option>

                <Option
                    $active={mode === "tpm"}
                    $disabled={!tpmAvailable}
                    onClick={() => tpmAvailable && setMode("tpm")}
                    type="button"
                >
                    <OptionHead>
                        <strong>{t("TPM")}</strong>
                        <Tag>{t("no prompt")}</Tag>
                        <Safety $tone="good">{t("good")}</Safety>
                        <Platforms>{t("Windows · Linux")}</Platforms>
                    </OptionHead>
                    <p>{t("AES key wrapped by this machine's TPM; unlocks automatically.")}</p>
                </Option>

                <Option
                    $active={mode === "hello"}
                    $disabled={!helloAvailable}
                    onClick={() => helloAvailable && setMode("hello")}
                    type="button"
                >
                    <OptionHead>
                        <strong>{t("Windows Hello")}</strong>
                        <Tag>{t("PIN / biometrics")}</Tag>
                        <Safety $tone="strong">{t("strong")}</Safety>
                        <Platforms>{t("Windows")}</Platforms>
                    </OptionHead>
                    <p>{t("Windows Hello confirms it is you before unlocking.")}</p>
                </Option>

                <Option $active={mode === "password"} onClick={() => setMode("password")} type="button">
                    <OptionHead>
                        <strong>{t("Password")}</strong>
                        <Tag>{t("asks every launch")}</Tag>
                        <Safety $tone="strong">{t("strong")}</Safety>
                        <Platforms>{t("Windows · Linux")}</Platforms>
                    </OptionHead>
                    <p>{t("AES-256-GCM with a key derived from your password; asked each launch.")}</p>
                </Option>

                <Option $active={mode === "none"} onClick={() => setMode("none")} type="button">
                    <OptionHead>
                        <strong>{t("Do not remember")}</strong>
                        <Tag>{t("nothing on disk")}</Tag>
                        <Safety $tone="safest">{t("safest")}</Safety>
                        <Platforms>{t("Windows · Linux")}</Platforms>
                    </OptionHead>
                    <p>{t("Nothing is written; the next launch signs in again.")}</p>
                </Option>
            </Options>

            {mode === "password" && (
                <Field>
                    <Label htmlFor="storage-password">{t("Password for this session")}</Label>
                    <PasswordInput
                        autoComplete="current-password"
                        id="storage-password"
                        onChange={setPassword}
                        value={password}
                    />
                    <PasswordInput
                        autoComplete="current-password"
                        onChange={setConfirm}
                        placeholder={t("repeat the password")}
                        value={confirm}
                    />
                </Field>
            )}

            {(localError || error) && <ErrorText>{localError || error}</ErrorText>}

            <Actions>
                <Primary disabled={busy || !signedIn} onClick={save} type="button">
                    {busy ? t("Saving…") : t("Save")}
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
                    ? <Qr alt={t("Device sign-in")} src={device.qrDataUrl}/>
                    : <QrEmpty>{starting ? t("Preparing the code…") : t("The sign-in code is unavailable.")}</QrEmpty>}
            </QrFrame>

            {failed
                ? <QrStatus>
                    <span>{error || t("The code expired. Start again.")}</span>
                    <LinkButton onClick={() => void start()} type="button">{t("Try again")}</LinkButton>
                </QrStatus>
                : <QrStatus>{device ? t("Waiting for approval…") : t("Preparing the code…")}</QrStatus>}

            {device && (
                <LinkBox>
                    <a href={device.url} rel="noreferrer" target="_blank">{t("Open the link instead")}</a>
                </LinkBox>
            )}
        </QrPanel>
    );
}

function methodLabel(method: string) {
    switch (method) {
        case "totp":
            return "Authenticator";
        case "emailOtp":
            return "Email code";
        default:
            return "Recovery code";
    }
}

function methodHint(method: string) {
    switch (method) {
        case "totp":
            return "Code from your authenticator app";
        case "emailOtp":
            return "Code VRChat emailed you";
        default:
            return "One of your recovery codes";
    }
}

function storageLabel(storage: AuthStorage) {
    switch (storage) {
        case "password":
            return "password-encrypted";
        case "system":
            return "system-protected";
        case "tpm":
            return "TPM-protected";
        case "hello":
            return "Windows Hello";
        case "software":
            return "software key";
        default:
            return "not stored";
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

const LoginCard = styled.section`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 272px;
    width: 100%;
    max-width: 640px;
    margin: auto;
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

const AccountRow = styled.div<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border: 1px solid ${({$active}) => $active ? "var(--accent-primary)" : "var(--border-color)"};
    border-radius: var(--radius-sm);
    background: ${({$active}) => $active ? "rgba(167, 139, 250, 0.08)" : "var(--bg-primary)"};
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

const SmallButton = styled.button`
    padding: 5px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-primary);
    font: inherit;
    font-size: 11px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background: var(--bg-card-hover);
    }
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
