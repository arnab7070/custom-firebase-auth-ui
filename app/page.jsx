'use client'
import { useState, useEffect } from 'react';
import { useAuth } from './context/authContext'; // Make sure this path is correct
import Login from './components/auth/Login';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getAuth, signOut } from "firebase/auth";

export default function Home() {
    const { user, loading } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleOpenLogin = () => {
        setIsLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Close modal automatically after login
    useEffect(() => {
        if (user) {
            setIsLoginOpen(false);
        }
    }, [user]);

    // Loading state shown only in the return statement
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen py-10">
            {user ? (
                <div className="w-5/6 rounded-md bg-slate-950 p-4 text-white">
                    <ScrollArea className="whitespace-pre-wrap">
                        <pre className="p-4">{JSON.stringify(user, null, 2)}</pre>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <Button onClick={handleLogout} className="mt-4">Logout</Button>
                </div>
            ) : (
                <Button onClick={handleOpenLogin}>Login</Button>
            )}
            <Login 
                size='medium'
                position="center"
                headerImage={'https://images.unsplash.com/photo-1580191947416-62d35a55e71d?q=80&w=2071&auto=format&fit=crop'}
                isOpen={isLoginOpen}
                onClose={handleCloseLogin}
            />
        </div>
    );
}
