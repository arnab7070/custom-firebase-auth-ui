// components/auth/PhoneLoginForm.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from '../../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from "firebase/auth";

const PhoneLoginForm = () => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationId, setVerificationId] = useState(null);
    const [otp, setOtp] = useState('');

    const handlePhoneSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!phone || phone.length < 10) {
            toast({ title: "Invalid phone number", description: "Enter a valid phone number." });
            setLoading(false);
            return;
        }

        try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: "invisible" });
            const confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
            setVerificationId(confirmationResult.verificationId);
            toast({ title: "OTP Sent", description: "Enter the OTP to verify." });
        } catch (error) {
            toast({ title: "Error", description: error.message });
            window.recaptchaVerifier.clear();
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerification = async (e) => {
        e.preventDefault();

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            await signInWithCredential(auth, credential);
            toast({ title: "OTP Verified", description: "Sign-in successful!" });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast({ title: "Verification Error", description: error.message });
        }
    };

    return (
        <div>
            <form onSubmit={handlePhoneSubmit}>
                <div className="grid gap-2 m-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div id="recaptcha-container"></div>
                    <Button
                        id='sign-in-button'
                        variant={loading ? "secondary" : "default"}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Processing..." :  "Send OTP"}
                    </Button>
                </div>
            </form>
            {
                verificationId ? <div className='flex space-x-3'>
                    <Input
                        id="otp"
                        placeholder="Enter your OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button onClick={handleOTPVerification}>
                        Verify
                    </Button>
                </div> : <div></div>
            }

        </div>
    );
};

export default PhoneLoginForm;