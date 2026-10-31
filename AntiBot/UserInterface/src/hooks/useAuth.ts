import {useEffect, useState} from "react";
import {type AuthSnapshot, getAuth, onAuthChanged, signedOut} from "../api/auth";

/** The host's session state, kept current as the account page signs in or out. */
export function useAuth(): AuthSnapshot {
    const [auth, setAuth] = useState<AuthSnapshot>(signedOut);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onAuthChanged((next) => {
            if (!cancelled) setAuth(next);
        });

        void getAuth().then((next) => {
            if (!cancelled) setAuth(next);
        }, () => {
            // The host failed to answer; the signed-out state already covers it.
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    return auth;
}
