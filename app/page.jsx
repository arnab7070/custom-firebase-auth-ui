'use client';
import { useAuth } from './context/authContext';
import Login from './components/auth/Login';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
    const { user, loading } = useAuth(); // Use the useAuth hook

    // Show loading state while the authentication check is in progress
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {
                user ? (
                    <div className="w-5/6 rounded-md bg-slate-950 p-4 text-white">
                        <ScrollArea className="whitespace-pre-wrap">
                            <pre className="p-4">{JSON.stringify(user, null, 2)}</pre>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                ) : (
                    <Login headerImage={'https://images.unsplash.com/photo-1580191947416-62d35a55e71d?q=80&w=2071&auto=format&fit=crop'} />
                )
            }
        </div>
    );
}
