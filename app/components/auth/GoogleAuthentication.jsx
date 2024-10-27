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
