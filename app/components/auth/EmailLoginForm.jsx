import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { sendSignInLinkToEmail } from "firebase/auth";

const EmailLoginForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const actionCodeSettings = {
        url: 'http://localhost:3000/welcome',
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
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Button 
                    variant={loading ? "secondary" : "default"} 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Send Magic Link"}
                </Button>
            </div>
        </form>
    );
};

export default EmailLoginForm;