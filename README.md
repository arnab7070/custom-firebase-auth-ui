Here's the updated `README.md` for your Firebase authentication package, now configured to allow users to set their own Firebase configuration.

```markdown
# Custom Firebase Auth UI

## Overview

This package provides a customizable user authentication system built with Next.js and Firebase. It includes multiple authentication methods such as email link sign-in, phone number authentication, Google, and GitHub logins. This guide explains how to set up the application, customize the login component, and handle the user object, with the flexibility for each user to configure their own Firebase project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Firebase Configuration](#firebase-configuration)
- [Running the Application](#running-the-application)
- [Handling User Object](#handling-user-object)
- [Customizing the Login Component](#customizing-the-login-component)
- [Available Authentication Methods](#available-authentication-methods)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or later)
- npm or yarn
- A Firebase project

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arnab7070/custom-firebase-auth-ui
   cd custom-firebase-auth-ui
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Demo: 
   [https://firebase-auth-ui.vercel.app](https://firebase-auth-ui.vercel.app)

## Firebase Configuration

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

2. Enable the authentication methods you want to use (Email/Password, Phone, Google, GitHub) in the Firebase Console under the **Authentication** section.

3. Configure Firebase in your application:

   Instead of hardcoding configuration, use the `initializeFirebase` function from this package to pass your own Firebase configuration when initializing the application. Replace the configuration code in your project with the following:

   ```javascript
   import { initializeFirebase } from 'your-package-name';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const { auth } = initializeFirebase(firebaseConfig);
   ```

## Running the Application

To start the development server, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

Navigate to `http://localhost:3000` to view the application.

## Handling User Object

The user object is managed using the `useAuth` hook provided in the `context/authContext.js` file. Access the user object and loading state as follows:

```javascript
import { useAuth } from "./context/authContext";

const YourComponent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <p>Welcome, {user.displayName || user.email}!</p>;
  }

  return <p>Please log in.</p>;
};
```

### User Object Properties

The user object contains the following properties:

- `uid`: Unique identifier for the user.
- `email`: User's email address.
- `displayName`: User's display name, if available.
- `photoURL`: URL of the user's profile picture, if available.

## Customizing the Login Component

The login component is located in `app/components/auth/Login.jsx`. Customize the login component by passing props to it. Here are the available props:

- `showEmail`: Boolean to show/hide email login form (default: true).
- `showPhone`: Boolean to show/hide phone login form (default: true).
- `showGoogle`: Boolean to show/hide Google login button (default: true). Additionally, `showOneTapSignIn` can be passed as a prop to GoogleAuthentication to enable or disable one-tap sign-in.
- `showGithub`: Boolean to show/hide GitHub login button (default: true).
- `showAnonymous`: Boolean to show/hide anonymous login button (default: true).
- `title`: Custom title for the login modal (default: "Login").
- `description`: Custom description for the login modal (default: "Please Sign In to Website").
- `headerImage`: Custom header image for the login modal.
- `size`: Size of the modal ("small", "medium", "large").
- `position`: Position of the modal ("center", "top-left", "top-right", "bottom-left", "bottom-right").
- `isOpen`: Boolean to control the visibility of the modal (default: false).
- `onClose`: Function to call when the modal is closed.

### Example Usage

```javascript
<Login
  showEmail={true}
  showPhone={false}
  showGoogle={true}
  title="Welcome Back!"
  description="Please log in to continue."
  isOpen={isLoginOpen}
  onClose={handleCloseLogin}
/>
```

## Available Authentication Methods

1. **Email Link Authentication**: Sign in using a magic link sent to the user's email.
2. **Phone Number Authentication**: Sign in using a phone number and OTP.
3. **Google Authentication**: Sign in with a Google account.
4. **GitHub Authentication**: Sign in with a GitHub account.
5. **Anonymous Authentication**: Sign in anonymously without credentials.

## Contributing

To contribute, please fork the repository and submit a pull request. For issues or feature requests, open an issue in the repository.

---

This README provides a comprehensive guide for setting up and customizing the authentication system. For questions or assistance, please reach out!