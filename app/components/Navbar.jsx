'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Set true if user is logged in, false if not
        });

        // Clean up listener on component unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/'); // Redirects to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg text-white font-semibold">
                    MyApp
                </Link>
                <div className="space-x-4">
                    <Link href="/" className="text-white hover:text-gray-200">
                        Home
                    </Link>
                    {isLoggedIn ? (
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="outline">
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;