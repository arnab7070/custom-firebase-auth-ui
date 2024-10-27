# README.md

## Overview

This application is a user authentication system built with Next.js and Firebase. It provides various authentication methods, including email link sign-in, phone number authentication, and social logins (Google, GitHub). This README will guide you through setting up the application, customizing the login component, and handling the user object.

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

Before you begin, ensure you have the following installed:

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

## Firebase Configuration

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

2. Enable the authentication methods you want to use (Email/Password, Phone, Google, GitHub) in the Firebase Console under the "Authentication" section.

3. Copy the Firebase configuration object from your project settings and replace the configuration in `app/firebaseConfig.js`:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
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

Open your browser and navigate to `http://localhost:3000`.

## Handling User Object

The user object is managed using the `useAuth` hook provided in the `context/authContext.js` file. You can access the user object and loading state as follows:

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

The user object contains various properties, including:

- `uid`: Unique identifier for the user.
- `email`: User's email address.
- `displayName`: User's display name (if available).
- `photoURL`: URL of the user's profile picture (if available).

## Customizing the Login Component

The login component is located in `app/components/auth/Login.jsx`. You can customize the login component by passing props to it. Here are the available props:

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

1. **Email Link Authentication**: Users can sign in using a magic link sent to their email.
2. **Phone Number Authentication**: Users can sign in using their phone number and receive an OTP.
3. **Google Authentication**: Users can sign in using their Google account.
4. **GitHub Authentication**: Users can sign in using their GitHub account.
5. **Anonymous Authentication**: Users can sign in anonymously without providing any credentials.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. For any issues or feature requests, please open an issue in the repository.

---

This README provides a comprehensive guide for users to set up and customize the authentication system in their own applications. If you have any questions or need further assistance, feel free to reach out!
