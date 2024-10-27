import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { Mail, Wand2 } from 'lucide-react';
import { useAuth } from '../../context/authContext';

const EmailLoginForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth();
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        const verifyEmailLink = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                setVerifying(true);
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }

                try {
                    await setPersistence(auth, browserLocalPersistence);
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');
                    
                    setUser(result.user);
                    window.localStorage.setItem('user', JSON.stringify(result.user));
                    
                    // Clear the URL without reloading the page
                    window.history.replaceState(null, '', window.location.pathname);
                    router.push('/');
                } catch (error) {
                    console.error("Error signing in with email link:", error);
                    toast({ title: "Error signing in with link", description: error.message });
                } finally {
                    setVerifying(false);
                }
            }
        };

        verifyEmailLink();
    }, []);

    const actionCodeSettings = {
        url: `${window.location.origin}/emailVerification`,
        handleCodeInApp: true,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast({ title: "Invalid email", description: "Enter a valid email." });
            setLoading(false);
            return;
        }

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            localStorage.setItem('emailForSignIn', email);
            toast({ title: "Magic Link Sent", description: "Check your email to sign in." });
            router.push('/emailVerification');
        } catch (error) {
            toast({ title: "Error", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button
                    variant={loading ? "secondary" : "default"}
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center"
                >
                    {loading ? (
                        "Processing..."
                    ) : (
                        <>
                            <Wand2 className="mr-2" size={18} />
                            Send Magic Link
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default EmailLoginForm;
