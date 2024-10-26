import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { signInAnonymously } from "firebase/auth";
import { UserRoundX } from 'lucide-react';

const AnynomousAuthentication = () => {
    const [loading, setLoading] = useState(false);

    const handleAnonymousSignIn = async () => {
        setLoading(true);

        try {
            const result = await signInAnonymously(auth);
            toast({ 
                title: "Success", 
                description: `Signed in anonymously. ID: ${result.user.uid}` 
            });
        } catch (error) {
            console.error('Error signing in anonymously:', error);
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
            type="button"
            disabled={loading}
            onClick={handleAnonymousSignIn}
            className="w-full flex items-center justify-center"
        >
            {loading ? (
                "Signing in..."
            ) : (
                <>
                    <UserRoundX/>
                    Continue as Guest
                </>
            )}
        </Button>
    );
};

export default AnynomousAuthentication;