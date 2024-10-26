// app/page.jsx
'use client'
import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {
                user ?
                    <div className="w-5/6 rounded-md bg-slate-950 p-4 text-white">
                        <ScrollArea className="whitespace-pre-wrap">
                            <pre className="p-4">{JSON.stringify(user, null, 2)}</pre>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                    :
                    <Login />
            }
        </div>
    );
}
