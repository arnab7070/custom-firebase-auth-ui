import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '../../assets/icons/google.svg';
import Image from 'next/image';

const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            toast({
                title: "Success",
                description: `Signed in as ${result.user.email}`
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="default"
            id="google"
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2"
        >
            {loading ? (
                "Signing in..."
            ) : (
                <>
                    <Image src={GoogleIcon} alt="Google" className="h-6 w-6" />
                    Continue with Google
                </>
            )}
        </Button>
    );
};

export default GoogleSignInButton;
