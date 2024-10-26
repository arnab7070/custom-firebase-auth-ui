import React, { useState } from 'react';
import Image from 'next/image';
import { UserCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailLoginForm from './EmailLoginForm';
import PhoneLoginForm from './PhoneLoginForm';
import GoogleAuthentication from './GoogleAuthentication';
import AnynomousAuthentication from './AnynomousAuthentication';
import GithubAuthentication from './GithubAuthentication';
import SignUp from '../../assets/pictures/signup.svg';
import { Button } from "@/components/ui/button";
import { Tangerine, Almendra } from 'next/font/google'
 
const tangerine = Tangerine({
  weight: ['700'],
  subsets: ['latin']
})

const almendra = Almendra({
    weight: ['700'],
    subsets: ['latin']
})

const Login = ({
    showEmail = true,
    showPhone = true,
    showGoogle = true,
    showGithub = true,
    showAnonymous = true,
    title = "Login",
    description = "Please Sign In to Website",
    customStyles = {},
    headerImage = SignUp // Default image
}) => {
    const [showOtherMethods, setShowOtherMethods] = useState(false);

    const toggleMethods = () => {
        setShowOtherMethods(prev => !prev);
    };

    return (
        <Card className={`w-[400px] ${customStyles.card || ''}`}>
            <div className="relative h-[200px] rounded-t-lg overflow-hidden">
                <Image 
                    src={headerImage}
                    alt="Header Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <CardHeader className="relative text-center text-white p-6">
                    <UserCircle2 size={60} className={`w-full mb-4 ${customStyles.icon || ''}`} />
                    <CardTitle className={`${almendra.className} uppercase text-4xl font-bold  ${customStyles.title || ''}`}>
                        {title}
                    </CardTitle>
                    <CardDescription className={`${tangerine.className} text-white text-4xl font-semibold mt-2 ${customStyles.description || ''}`}>
                        {description}
                    </CardDescription>
                </CardHeader>
            </div>
            <CardContent className={`space-y-5 p-6 ${customStyles.content || ''}`}>
                {/* Show Email Login Form or Phone Login Form based on toggle state */}
                <div 
                    className={`transition-all duration-1000 ease-in-out ${showOtherMethods ? 'opacity-0 max-h-0' : 'opacity-100 max-h-[500px]'}`}
                >
                    {/* Email & Phone Login Forms */}
                    {!showOtherMethods && (
                        <>
                            {showEmail && <EmailLoginForm />}
                            <div className='text-center mt-4'>---OR---</div>
                            {showPhone && <PhoneLoginForm />}
                        </>
                    )}
                </div>

                

                {/* Additional login options with smooth transition */}
                <div
                    className={`transition-all duration-1000 ease-in-out overflow-hidden ${showOtherMethods ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'}`}
                >
                    {showOtherMethods && (
                        <div className="space-y-4 mt-4">
                            {showGoogle && <GoogleAuthentication showOneTapSignIn={false} />}
                            {showGithub && <GithubAuthentication />}
                            {showAnonymous && <AnynomousAuthentication />}
                        </div>
                    )}
                </div>

                {/* "Other Methods" button */}
                <Button
                    onClick={toggleMethods}
                    className="w-full mt-4"
                    variant="outline"
                >
                    {showOtherMethods ? 'Back to Login' : 'Other Methods'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default Login;
