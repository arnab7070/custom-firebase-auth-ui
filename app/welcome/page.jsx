// app/welcome.jsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink, setPersistence, browserLocalPersistence } from 'firebase/auth';

export default function Welcome() {
    const router = useRouter();

    useEffect(() => {
        // Set persistence to local so the auth state persists across sessions
        setPersistence(auth, browserLocalPersistence);

        // Check if the user is already signed in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/');
            }
        });

        // Complete sign-in if the user clicked the magic link
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            signInWithEmailLink(auth, email, window.location.href)
                .then(() => {
                    localStorage.removeItem('emailForSignIn');
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Error signing in with link:', error);
                });
        }

        return () => unsubscribe();
    }, [router]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Signing you in...</p>
        </div>
    );
}
