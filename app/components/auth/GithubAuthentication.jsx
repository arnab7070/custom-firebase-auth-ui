import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import Image from 'next/image';
import GithubIcon from '../../assets/icons/github.svg'

const GithubAuthentication = () => {
    const [loading, setLoading] = useState(false);

    const handleGithubSignIn = async () => {
        setLoading(true);
        const provider = new GithubAuthProvider();
        // Add any additional scopes you need
        provider.addScope('read:user');
        provider.addScope('user:email');

        try {
            const result = await signInWithPopup(auth, provider);
            
            // Get GitHub access token for future API calls if needed
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            // Get user info
            const user = result.user;
            const githubUser = result.user.reloadUserInfo;

            // Store the token securely if needed
            if (token) {
                // You might want to store this in your backend instead
                sessionStorage.setItem('github_token', token);
            }

            toast({ 
                title: "Success", 
                description: `Signed in as ${user.displayName || user.email}` 
            });

        } catch (error) {
            console.error('Error signing in with GitHub:', error);
            
            // Handle specific error cases
            if (error.code === 'auth/account-exists-with-different-credential') {
                toast({ 
                    title: "Account Exists", 
                    description: "An account already exists with the same email address but different sign-in credentials. Try signing in using the original method." 
                });
            } else {
                toast({ 
                    title: "Error", 
                    description: error.message 
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            type="button"
            disabled={loading}
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-2"
        >
            {loading ? (
                "Signing in..."
            ) : (
                <>
                    <Image src={GithubIcon} alt="Github" className="h-6 w-6"></Image>
                    Continue with GitHub
                </>
            )}
        </Button>
    );
};

export default GithubAuthentication;