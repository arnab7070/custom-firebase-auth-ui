import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserCircle2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from '../firebaseConfig';
import { sendSignInLinkToEmail, RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [verificationId, setVerificationId] = useState(null);
    const [otp, setOtp] = useState('');

    const actionCodeSettings = {
        url: 'http://localhost:3000/welcome',
        handleCodeInApp: true,
    };

    const handleOTPVerification = async (e) => {
        e.preventDefault();

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            await signInWithCredential(auth, credential);
            console.log('OTP verified');
            toast({ title: "OTP Verified", description: "Sign-in successful!" });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast({ title: "Verification Error", description: error.message });
        }
    }



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

    const handlePhoneSubmit = async (event) => {
        event.preventDefault();
        setLoading1(true);

        if (!phone || phone.length < 10) {
            toast({ title: "Invalid phone number", description: "Enter a valid phone number." });
            setLoading1(false);
            return;
        }

        try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: "invisible" });
            const confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
            setVerificationId(confirmationResult.verificationId);
            toast({ title: "OTP Sent", description: "Enter the OTP to verify." });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: error.message });
            window.recaptchaVerifier.clear();
        } finally {
            setLoading1(false);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <UserCircle2 size={40} className="w-full mb-10" />
                    Login
                </CardTitle>
                <CardDescription>Please sign in using the magic link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button variant={loading ? "secondary" : "default"} type="submit" disabled={loading}>
                            {loading ? "Processing..." : "Send Magic Link"}
                        </Button>
                    </div>
                </form>

                <form onSubmit={handlePhoneSubmit}>
                    <div className="grid gap-4">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <div id="recaptcha-container"></div>
                        <Button id='sign-in-button' variant={loading1 ? "secondary" : "default"} type="submit" disabled={loading1}>
                            {loading1 ? "Processing..." : "Send OTP"}
                        </Button>
                    </div>
                </form>

                <div className='flex space-x-3'>
                <Input id="otp" placeholder="Enter your OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <Button onClick={handleOTPVerification}>
                        Verify
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
