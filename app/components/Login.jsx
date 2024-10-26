// components/Login.jsx
'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserCircle2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from '../firebaseConfig';
import { sendSignInLinkToEmail } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const actionCodeSettings = {
        url: 'http://localhost:3000/welcome', // Redirects to Welcome page after sign-in
        handleCodeInApp: true,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast({
                title: "Invalid email format",
                description: "Please enter a valid email address.",
            });
            setLoading(false);
            return;
        }

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            localStorage.setItem('emailForSignIn', email);
            toast({
                title: "Magic Link Sent Successfully",
                description: "Check your email to sign in.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error sending link",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <UserCircle2 size={40} className="flex-col justify-center items-center w-full mb-10" />
                    Login
                </CardTitle>
                <CardDescription>Please sign in using the magic link</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant={loading ? "secondary" : "default"} type="submit" disabled={loading}>
                            {loading ? "Processing..." : "Send Magic Link"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
