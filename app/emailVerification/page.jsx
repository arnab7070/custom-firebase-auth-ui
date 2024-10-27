'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useAuth } from '../context/authContext';
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';

const EmailVerification = () => {
    const [status, setStatus] = useState('waiting');
    const router = useRouter();
    const { setUser } = useAuth();

    useEffect(() => {
        const verifyEmailLink = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                setStatus('verifying');
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }

                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');
                    setUser(result.user);
                    setStatus('success');
                    setTimeout(() => router.push('/'), 2000);
                } catch (error) {
                    console.error("Error signing in with email link:", error);
                    setStatus('error');
                }
            } else {
                setStatus('waiting');
            }
        };

        verifyEmailLink();
    }, [router, setUser]);

    const renderContent = () => {
        switch (status) {
            case 'waiting':
                return (
                    <div className="flex flex-col items-center">
                        <Mail className="w-16 h-16 text-blue-500 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Waiting for Email Verification</h2>
                        <p className="text-gray-600">Please click the link in your email to continue.</p>
                    </div>
                );
            case 'verifying':
                return (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Verifying Your Email</h2>
                        <p className="text-gray-600">Please wait while we verify your email...</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="flex flex-col items-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Verification Successful</h2>
                        <p className="text-gray-600">Redirecting you to the homepage...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
                        <p className="text-gray-600">There was an error verifying your email. Please try again.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                {renderContent()}
            </div>
        </div>
    );
};

export default EmailVerification;