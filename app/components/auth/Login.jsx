import React, { useState, useEffect } from 'react';
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

/**
 * @typedef {'small' | 'medium' | 'large'} Size
 * @typedef {'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} Position
 */

/**
 * @param {Object} props
 * @param {boolean} [props.showEmail=true]
 * @param {boolean} [props.showPhone=true]
 * @param {boolean} [props.showGoogle=true]
 * @param {boolean} [props.showGithub=true]
 * @param {boolean} [props.showAnonymous=true]
 * @param {string} [props.title="Login"]
 * @param {string} [props.description="Please Sign In to Website"]
 * @param {Object} [props.customStyles={}]
 * @param {string|StaticImageData} [props.headerImage=SignUp]
 * @param {Size} [props.size="medium"]
 * @param {Position} [props.position="center"]
 * @param {boolean} [props.isOpen=false]
 * @param {() => void} [props.onClose]
 */
const Login = ({
    showEmail = true,
    showPhone = true,
    showGoogle = true,
    showGithub = true,
    showAnonymous = true,
    title = "Login",
    description = "Please Sign In to Website",
    customStyles = {},
    headerImage = SignUp,
    size = "medium",
    position = "center",
    isOpen = false,
    onClose
}) => {
    const [showOtherMethods, setShowOtherMethods] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const toggleMethods = () => {
        setShowOtherMethods(prev => !prev);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (onClose) onClose();
        }, 300); // Match this with the transition duration
    };

    const sizeClasses = {
        small: "w-[300px]",
        medium: "w-[400px]",
        large: "w-[500px]"
    };

    const positionClasses = {
        "center": "items-center justify-center",
        "top-left": "items-start justify-start",
        "top-right": "items-start justify-end",
        "bottom-left": "items-end justify-start",
        "bottom-right": "items-end justify-end"
    };

    if (!isOpen) return null;

    return (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-50 flex ${positionClasses[position]} p-4 z-50`}
            onClick={handleClose} // Close modal when clicking outside
        >
            <div 
                className={`transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside the modal
            >
                <Card className={`${sizeClasses[size]} ${customStyles.card || ''}`}>
                    <div className="relative h-[200px] rounded-t-lg overflow-hidden">
                        <Image 
                            src={headerImage}
                            alt="Header Image"
                            layout="fill"
                            priority={true}
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
                        <div 
                            className={`transition-all duration-1000 ease-in-out ${showOtherMethods ? 'opacity-0 max-h-0' : 'opacity-100 max-h-[500px]'}`}
                        >
                            {!showOtherMethods && (
                                <>
                                    {showEmail && <EmailLoginForm />}
                                    <div className='text-center mt-4'>---OR---</div>
                                    {showPhone && <PhoneLoginForm />}
                                </>
                            )}
                        </div>

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

                        <Button
                            onClick={toggleMethods}
                            className="w-full mt-4"
                            variant="outline"
                        >
                            {showOtherMethods ? 'Back to Login' : 'Other Methods'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
