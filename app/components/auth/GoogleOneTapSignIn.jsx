import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";

const GoogleOneTapSignIn = () => {
    const [isSdkLoaded, setIsSdkLoaded] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const handleOneTapResponse = async (response) => {
        const { credential: googleIdToken } = response;

        try {
            const credential = GoogleAuthProvider.credential(googleIdToken);
            const result = await signInWithCredential(auth, credential);
            toast({
                title: "Success",
                description: `Signed in as ${result.user.email}`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
            });
        }
    };

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isSdkLoaded && !isUserLoggedIn && window.google && window.google.accounts) {
            // Initialize One Tap when SDK has loaded, user is not logged in, and google.accounts is available
            window.google.accounts.id.initialize({
                client_id: "861589710795-l1a0k1ofh346qqlk5qm0fm9ur4rosoih.apps.googleusercontent.com",
                callback: handleOneTapResponse,
                auto_select: true,
                cancel_on_tap_outside: true,
            });
            window.google.accounts.id.prompt();
        }
    }, [isSdkLoaded, isUserLoggedIn]);

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                async
                defer
                onLoad={() => setIsSdkLoaded(true)}
                onError={() => toast({ title: 'Failed to Load', description: 'Failed to load Google Identity Services SDK' })}
            />
        </>
    );
};

export default GoogleOneTapSignIn;
