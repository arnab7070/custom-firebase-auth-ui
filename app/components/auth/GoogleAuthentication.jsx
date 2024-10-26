// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import Script from 'next/script';
// import { toast } from "@/hooks/use-toast";
// import { auth } from '../../firebaseConfig';
// import { signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
// import GoogleIcon from '../../assets/icons/google.svg'
// import Image from 'next/image';

// const GoogleAuthentication = () => {
//     const [loading, setLoading] = useState(false);



//     const handleGoogleSignIn = async () => {
//         setLoading(true);
//         const provider = new GoogleAuthProvider();

//         try {
//             const result = await signInWithPopup(auth, provider);
//             toast({
//                 title: "Success",
//                 description: `Signed in as ${result.user.email}`
//             });
//         } catch (error) {
//             console.error('Error signing in with Google:', error);
//             toast({
//                 title: "Error",
//                 description: error.message
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOneTapResponse = async (response) => {
//         const { credential: googleIdToken } = response;
    
//         try {
//             // Create a Firebase credential with the Google ID token
//             const credential = GoogleAuthProvider.credential(googleIdToken);
            
//             // Sign in with Firebase using the Google credential
//             const result = await signInWithCredential(auth, credential);
            
//             // Successful sign-in with Firebase
//             toast({
//                 title: "Success",
//                 description: `Signed in as ${result.user.email}`,
//             });
//         } catch (error) {
//             console.error('Error with Firebase sign-in:', error);
//             toast({
//                 title: "Error",
//                 description: error.message,
//             });
//         }
//     };

//     return (
//         <>
//             <Script
//                 src="https://accounts.google.com/gsi/client"
//                 async
//                 defer
//                 onLoad={() => {
//                     window.google.accounts.id.initialize({
//                         client_id: "861589710795-l1a0k1ofh346qqlk5qm0fm9ur4rosoih.apps.googleusercontent.com",
//                         callback: handleOneTapResponse,
//                         auto_select: true,
//                         cancel_on_tap_outside: true,
//                     });
//                     window.google.accounts.id.prompt(); // Show the One Tap prompt
//                 }}
//             />
//             <Button
//                 variant="default"
//                 id="google"
//                 type="button"
//                 disabled={loading}
//                 onClick={handleGoogleSignIn}
//                 className="w-full flex items-center justify-center gap-2"
//             >
//                 {loading ? (
//                     "Signing in..."
//                 ) : (
//                     <>
//                         <Image src={GoogleIcon} alt="Google" className="h-6 w-6"></Image>
//                         Continue with Google
//                     </>
//                 )}
//             </Button>
//         </>
//     );
// }

// export default GoogleAuthentication;

import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import GoogleOneTapSignIn from './GoogleOneTapSignIn';

const GoogleAuthentication = ({showOneTapSignIn = true}) => {
    return (
        <div>
            <GoogleSignInButton />
            {showOneTapSignIn && <GoogleOneTapSignIn />}
        </div>
    );
};

export default GoogleAuthentication;
