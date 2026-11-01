import {useEffect, useState} from "react";
import {type AuthSnapshot, getAuth, onAuthChanged, signedOut} from "../api/auth";

/** The host's session state, kept current as the account page signs in or out. */
export function useAuth(): { auth: AuthSnapshot; ready: boolean } {
    const [auth, setAuth] = useState<AuthSnapshot>(signedOut);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onAuthChanged((next) => {
            if (cancelled) return;

            setAuth(next);
            setReady(true);
        });

        void getAuth().then((next) => {
            if (cancelled) return;

            setAuth(next);
            setReady(true);
        }, () => {
            // The host failed to answer; the signed-out state already covers it.
            if (!cancelled) setReady(true);
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    return {auth, ready};
}
