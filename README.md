Here’s a concise tutorial on how to use the `useAuth` context in any component of your application, as well as how to call your `Login` component with props.

---

# Using the `useAuth` Context and the `Login` Component

## Overview

This tutorial explains how to set up the `useAuth` context for user authentication and how to utilize the `Login` component in your Next.js application.

### Step 1: Setting Up the Auth Context

Before using the `useAuth` hook, ensure you have an `AuthProvider` set up to provide the authentication state throughout your application.

```javascript
// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Your firebase configuration
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
```

### Step 2: Wrapping Your Application with AuthProvider

Wrap your application with the `AuthProvider` so that any component can access the authentication state.

```javascript
// src/app/_app.js
import React from 'react';
import { AuthProvider } from '../context/AuthContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
```

### Step 3: Using `useAuth` in Any Component

You can now use the `useAuth` hook in any component to access the user and loading states. Here’s an example of using it in the `Home` component:

```javascript
// src/app/Home.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './components/auth/Login';

const Home = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {user ? (
                <h2>Welcome, {user.displayName}!</h2>
            ) : (
                <Login
                    title="Welcome Back!"
                    description="Please log in to access your account."
                    showEmail={true}
                    showPhone={true}
                    showGoogle={true}
                    showGithub={true}
                    showAnonymous={true}
                    customStyles={{
                        card: 'bg-gray-800',
                        icon: 'text-blue-500',
                        title: 'text-yellow-300',
                        description: 'text-red-400'
                    }}
                />
            )}
        </div>
    );
};

export default Home;
```

### Step 4: Calling the `Login` Component with Props

In the above example, you can see how to call the `Login` component and pass props to customize its behavior and appearance:

- **`title`**: The title displayed on the login card. Here, it’s set to `"Welcome Back!"`.
- **`description`**: The description that appears below the title. Set to `"Please log in to access your account."`.
- **`showEmail`**: A boolean that determines if the email login form is shown. Set to `true`.
- **`showPhone`**: A boolean that determines if the phone login form is shown. Set to `true`.
- **`showGoogle`**: A boolean to enable Google authentication. Set to `true`.
- **`showGithub`**: A boolean to enable GitHub authentication. Set to `true`.
- **`showAnonymous`**: A boolean to allow anonymous login. Set to `true`.
- **`customStyles`**: An object to apply custom styles for different parts of the card (e.g., card background color, icon color).

### Example of Customized `Login` Component

Here’s how the `Login` component can be customized:

```javascript
<Login
    title="Join Us!"
    description="Please log in to continue."
    showEmail={true}
    showPhone={false} // Hide phone login
    showGoogle={true}
    showGithub={false} // Hide GitHub login
    showAnonymous={true}
    customStyles={{
        card: 'bg-gray-900', // Darker card background
        icon: 'text-white', // White icon
        title: 'text-green-500', // Green title text
        description: 'text-gray-400' // Gray description text
    }}
/>
```

### Complete Example of Usage

Here’s a complete example of how to put everything together:

```javascript
// src/app/Home.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './components/auth/Login';

const Home = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {user ? (
                <h2>Welcome, {user.displayName}!</h2>
            ) : (
                <Login
                    title="Welcome Back!"
                    description="Please log in to access your account."
                    showEmail={true}
                    showPhone={false}
                    showGoogle={true}
                    showGithub={true}
                    showAnonymous={true}
                    customStyles={{
                        card: 'bg-gray-800',
                        icon: 'text-blue-500',
                        title: 'text-yellow-300',
                        description: 'text-red-400'
                    }}
                />
            )}
        </div>
    );
};

export default Home;
```

### Conclusion

With this guide, you can efficiently use the `useAuth` context in any component of your Next.js application to handle user authentication. The `Login` component is customizable and allows for multiple authentication methods. Feel free to adjust the props to match your design and functional needs.

If you have any further questions or need additional examples, feel free to ask!