import {type FormEvent, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {
    type AuthSnapshot,
    type AuthStorage,
    type DeviceCode,
    getAuth,
    login,
    logout,
    onAuthChanged,
    pollDevice,
    saveStorage,
    signedOut,
    startDevice,
    unlock,
    verify,
} from "../api/auth";
import {EyeIcon, EyeOffIcon, KeyIcon, QrIcon, ShieldIcon, UserIcon} from "../components/Icons";

type Run = (action: () => Promise<AuthSnapshot>) => Promise<void>;

/** The VRChat account: sign-in, the second factor, and how the session is kept. */
export function AccountPage() {
    const [auth, setAuth] = useState<AuthSnapshot>(signedOut);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

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

    const run: Run = async (action) => {
        setBusy(true);
        setError("");

        try {
            setAuth(await action());
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setBusy(false);
        }
    };

    let content;

    if (auth.state === "loggedIn" && auth.user)
        content = <Profile auth={auth} busy={busy} error={error} run={run}/>;
    else if (auth.state === "locked")
        content = <UnlockForm auth={auth} busy={busy} error={error} run={run}/>;
    else if (auth.state === "twoFactor")
        content = <TwoFactorForm auth={auth} busy={busy} error={error} run={run}/>;
    else
        content = <LoginForm busy={busy} error={error} run={run} onSignedIn={setAuth}/>;

    return (
        <Page>
            {content}
            <StorageChoice auth={auth} busy={busy} error={error} run={run}/>
        </Page>
    );
}

function LoginForm({busy, error, run, onSignedIn}: {
    busy: boolean;
    error: string;
    run: Run;
    onSignedIn: (auth: AuthSnapshot) => void;
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [device, setDevice] = useState(false);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void run(() => login(username.trim(), password));
    };

    return (
        <>
            <Card>
                <CardHead>
                    <UserIcon size={20}/>
                    <div>
                        <h2>Sign in to VRChat</h2>
                        <p>The password is used for this one request and is never stored.</p>
                    </div>
                </CardHead>

                <Form onSubmit={submit}>
                    <Field>
                        <Label htmlFor="username">Username or email</Label>
                        <UsernameInput onChange={setUsername} value={username}/>
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            autoComplete="current-password"
                            id="password"
                            onChange={setPassword}
                            value={password}
                        />
                    </Field>

                    {error && <ErrorText>{error}</ErrorText>}

                    <Actions>
                        <Primary disabled={busy} type="submit">
                            {busy ? "Signing in…" : "Sign in"}
                        </Primary>
                        <Secondary onClick={() => setDevice((open) => !open)} type="button">
                            <QrIcon size={15}/>
                            Use a device code
                        </Secondary>
                    </Actions>
                </Form>

                <Note>
                    VRChat's terms do not cover third-party clients. Signing in is your own decision; the
                    session is what an attacker would want, so it is kept out of the settings folder.
                </Note>
            </Card>

            {device && <DeviceLogin onSignedIn={onSignedIn}/>}
        </>
    );
}

function TwoFactorForm({auth, busy, error, run}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
}) {
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
        <>
            <Card>
                <CardHead>
                    <ShieldIcon size={20}/>
                    <div>
                        <h2>Two-factor authentication</h2>
                        <p>VRChat wants a second factor before it hands over the session.</p>
                    </div>
                </CardHead>

                <MethodRow>
                    {methods.map((id) => (
                        <Method key={id} $active={method === id} onClick={() => setMethod(id)} type="button">
                            {methodLabel(id)}
                        </Method>
                    ))}
                </MethodRow>

                <Form onSubmit={submit}>
                    <Field>
                        <Label htmlFor="code">{methodHint(method)}</Label>
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

                    <Actions>
                        <Primary disabled={busy} type="submit">
                            {busy ? "Verifying…" : "Verify"}
                        </Primary>
                    </Actions>
                </Form>
            </Card>
        </>
    );
}

function UnlockForm({auth, busy, error, run}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
}) {
    const [password, setPassword] = useState("");
    const hello = auth.storage === "hello";

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void run(() => unlock(hello ? "" : password));
    };

    return (
        <>
            <Card>
                <CardHead>
                    <KeyIcon size={20}/>
                    <div>
                        <h2>{hello ? "Unlock with Windows Hello" : "Unlock the saved session"}</h2>
                        <p>
                            {hello
                                ? "The session is protected by Windows Hello. Confirm with your PIN, fingerprint or face."
                                : "The session was encrypted with a key derived from your password. It is never stored, so it has to be typed again."}
                        </p>
                    </div>
                </CardHead>

                <Form onSubmit={submit}>
                    {!hello && (
                        <Field>
                            <Label htmlFor="unlock-password">Password</Label>
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

                    <Actions>
                        <Primary disabled={busy} type="submit">
                            {busy ? "Unlocking…" : hello ? "Unlock with Windows Hello" : "Unlock"}
                        </Primary>
                        <Secondary onClick={() => void run(async () => {
                            return await saveStorage("none");
                        })} type="button">
                            Forget it
                        </Secondary>
                    </Actions>
                </Form>
            </Card>
        </>
    );
}

function Profile({auth, busy, error, run}: {
    auth: AuthSnapshot;
    busy: boolean;
    error: string;
    run: Run;
}) {
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
                            <p>{user.statusDescription || status?.label || "Signed in to VRChat"}</p>
                        </StatusLine>
                        {auth.expiresAt && (
                            <p>Session expires {new Date(auth.expiresAt).toLocaleDateString()}</p>
                        )}
                    </Identity>
                    <Secondary disabled={busy} onClick={() => void run(logout)} type="button">
                        Sign out
                    </Secondary>
                </ProfileRow>

                {error && <ErrorText>{error}</ErrorText>}
            </Card>
        </>
    );
}

/** The presence label and colour the site uses. */
function statusInfo(status?: string): { label: string; color: string } | null {
    switch (status) {
        case "active":
            return {label: "Online", color: "#4ade80"};
        case "join me":
            return {label: "Join Me", color: "#60a5fa"};
        case "ask me":
            return {label: "Ask Me", color: "#fbbf24"};
        case "busy":
            return {label: "Busy", color: "#f87171"};
        case "offline":
            return {label: "Offline", color: "#94a3b8"};
        default:
            return status && status.length > 0 ? {label: status, color: "#94a3b8"} : null;
    }
}

/** The login name, masked like a password until the eye is used. */
function UsernameInput({value, onChange}: { value: string; onChange: (value: string) => void }) {
    const [visible, setVisible] = useState(false);

    return (
        <PasswordWrap>
            <Input
                autoComplete="username"
                id="username"
                onChange={(event) => onChange(event.target.value)}
                placeholder="username"
                type={visible ? "text" : "password"}
                value={value}
            />
            <PasswordReveal
                aria-label={visible ? "Hide the username" : "Show the username"}
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
                aria-label={visible ? "Hide password" : "Show password"}
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
    const systemAvailable = auth.systemStorage;
    const systemName = auth.systemStorageName || "System protection";
    const tpmAvailable = auth.tpmStorage;
    const helloAvailable = auth.helloStorage;
    const softwareAvailable = auth.softwareStorage;

    // What the account is actually using, or the best available mode when nothing is stored yet.
    const preferred: AuthStorage = auth.storage !== "none"
        ? auth.storage
        : helloAvailable
            ? "hello"
            : tpmAvailable
                ? "tpm"
                : systemAvailable
                    ? "system"
                    : softwareAvailable
                        ? "software"
                        : "password";

    const [mode, setMode] = useState<AuthStorage>(preferred);
    const lastPreferred = useRef(preferred);

    // The page mounts before the host answers, so the selection is corrected when the state arrives.
    useEffect(() => {
        if (preferred === lastPreferred.current) return;

        lastPreferred.current = preferred;
        setMode(preferred);
    }, [preferred]);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [localError, setLocalError] = useState("");

    const signedIn = auth.state === "loggedIn";

    const save = () => {
        if (!signedIn) {
            setLocalError("Sign in first.");
            return;
        }

        if (mode === "password") {
            if (password.length < 1) {
                setLocalError("Enter the password that unlocks the session.");
                return;
            }

            if (password !== confirm) {
                setLocalError("The passwords do not match.");
                return;
            }
        }

        setLocalError("");
        void run(() => saveStorage(mode, mode === "password" ? password : undefined));
    };

    return (
        <Card>
            <CardHead>
                <ShieldIcon size={20}/>
                <div>
                    <h2>Keep the session between launches</h2>
                    <p>
                        Only the VRChat session cookie is stored, never your password. Every mode except
                        "Do not remember" encrypts it at rest; the difference is what unlocks it.
                    </p>
                </div>
            </CardHead>

            <Options>
                <Option $active={mode === "none"} onClick={() => setMode("none")} type="button">
                    <OptionHead>
                        <strong>Do not remember</strong>
                        <Tag>nothing on disk</Tag>
                        <Platforms>Windows · Linux</Platforms>
                    </OptionHead>
                    <p>Nothing is written; the next launch signs in again.</p>
                </Option>

                <Option
                    $active={mode === "system"}
                    $disabled={!systemAvailable}
                    onClick={() => systemAvailable && setMode("system")}
                    type="button"
                >
                    <OptionHead>
                        <strong>{systemName}</strong>
                        <Tag>{systemAvailable ? "encrypted" : "unavailable"}</Tag>
                        <Platforms>
                            {systemName === "Windows DPAPI" ? "Windows" :
                                systemName === "System keyring" ? "Linux" : "Windows · Linux"}
                        </Platforms>
                    </OptionHead>
                    <p>
                        {systemAvailable
                            ? systemName === "Windows DPAPI"
                                ? "Encrypted with Windows DPAPI for your account; unlocks automatically."
                                : "Held in the desktop keyring; unlocks with your login session."
                            : "No DPAPI or keyring on this system."}
                    </p>
                </Option>

                <Option
                    $active={mode === "tpm"}
                    $disabled={!tpmAvailable}
                    onClick={() => tpmAvailable && setMode("tpm")}
                    type="button"
                >
                    <OptionHead>
                        <strong>TPM</strong>
                        <Tag>{tpmAvailable ? "no prompt" : "unavailable"}</Tag>
                        <Platforms>Windows · Linux</Platforms>
                    </OptionHead>
                    <p>
                        {tpmAvailable
                            ? "AES key wrapped by this machine's TPM; unlocks automatically."
                            : "No usable TPM on this machine."}
                    </p>
                </Option>

                <Option
                    $active={mode === "hello"}
                    $disabled={!helloAvailable}
                    onClick={() => helloAvailable && setMode("hello")}
                    type="button"
                >
                    <OptionHead>
                        <strong>Windows Hello</strong>
                        <Tag>{helloAvailable ? "PIN / biometrics" : "unavailable"}</Tag>
                        <Platforms>Windows</Platforms>
                    </OptionHead>
                    <p>
                        {helloAvailable
                            ? "Windows Hello confirms it is you before unlocking."
                            : "Only available on Windows."}
                    </p>
                </Option>

                <Option
                    $active={mode === "software"}
                    $disabled={!softwareAvailable}
                    onClick={() => softwareAvailable && setMode("software")}
                    type="button"
                >
                    <OptionHead>
                        <strong>Software key</strong>
                        <Tag>{softwareAvailable ? "obfuscation" : "unavailable"}</Tag>
                        <Platforms>Linux</Platforms>
                    </OptionHead>
                    <p>
                        {softwareAvailable
                            ? "AES-256-GCM with a key file next to the session; obfuscation only, not real protection."
                            : "Only offered on Linux."}
                    </p>
                </Option>

                <Option $active={mode === "password"} onClick={() => setMode("password")} type="button">
                    <OptionHead>
                        <strong>Password</strong>
                        <Tag>asks every launch</Tag>
                        <Platforms>Windows · Linux</Platforms>
                    </OptionHead>
                    <p>AES-256-GCM with a key derived from your password; asked each launch.</p>
                </Option>
            </Options>

            {mode === "password" && (
                <Field>
                    <Label htmlFor="storage-password">Password for this session</Label>
                    <PasswordInput
                        autoComplete="current-password"
                        id="storage-password"
                        onChange={setPassword}
                        value={password}
                    />
                    <PasswordInput
                        autoComplete="current-password"
                        onChange={setConfirm}
                        placeholder="repeat the password"
                        value={confirm}
                    />
                </Field>
            )}

            {(localError || error) && <ErrorText>{localError || error}</ErrorText>}

            <Actions>
                <Primary disabled={busy || !signedIn} onClick={save} type="button">
                    {busy ? "Saving…" : "Save"}
                </Primary>
                <Muted>
                    {signedIn ? `Currently: ${storageLabel(auth.storage)}` : "Sign in to change this."}
                </Muted>
            </Actions>
        </Card>
    );
}

function DeviceLogin({onSignedIn}: { onSignedIn: (auth: AuthSnapshot) => void }) {
    const [device, setDevice] = useState<DeviceCode | null>(null);
    const [error, setError] = useState("");
    const [expired, setExpired] = useState(false);

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

                if (poll.reason === "expired_token") {
                    setExpired(true);
                    return;
                }

                if (poll.reason === "slow_down") interval += 5000;
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

    const start = async () => {
        setError("");
        setExpired(false);

        try {
            setDevice(await startDevice());
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    if (!device)
        return (
            <Card>
                <CardHead>
                    <QrIcon size={20}/>
                    <div>
                        <h2>Device sign-in</h2>
                        <p>Approve the sign-in on your phone; the password never reaches AntiBot.</p>
                    </div>
                </CardHead>
                {error && <ErrorText>{error}</ErrorText>}
                <Actions>
                    <Secondary onClick={() => void start()} type="button">Start</Secondary>
                </Actions>
            </Card>
        );

    return (
        <Card>
            <CardHead>
                <QrIcon size={20}/>
                <div>
                    <h2>Approve this sign-in</h2>
                    <p>Scan the code, or open the link, and approve it in the VRChat app or site.</p>
                </div>
            </CardHead>

            <DeviceBody>
                {device.qrDataUrl
                    ? <Qr alt="Device sign-in QR code" src={device.qrDataUrl}/>
                    : <p>{device.url}</p>}
                <LinkBox>
                    <a href={device.url} rel="noreferrer" target="_blank">{device.url}</a>
                </LinkBox>
            </DeviceBody>

            {expired ? <ErrorText>The code expired. Start again.</ErrorText> : <Muted>Waiting for approval…</Muted>}
            {error && <ErrorText>{error}</ErrorText>}

            <Actions>
                <Secondary onClick={() => setDevice(null)} type="button">Cancel</Secondary>
                {expired && <Primary onClick={() => void start()} type="button">Try again</Primary>}
            </Actions>
        </Card>
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

const Page = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: 720px;
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

const Muted = styled.span`
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
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
    opacity: ${({$disabled}) => $disabled ? 0.55 : 1};

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

const DeviceBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const Qr = styled.img`
    width: 184px;
    height: 184px;
    border-radius: var(--radius-sm);
    background: #fff;
    padding: 8px;
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
