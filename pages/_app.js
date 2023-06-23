import '../styles/global.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserContext } from '../context/userContext';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
    const [user, setUser] = useState(""); // Global state for user

    function updateUser (email) {
        setUser(email);
    }

    return (
        <UserContext.Provider value={{user, updateUser}}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
                <Component {...pageProps} />
            </GoogleOAuthProvider>
        </UserContext.Provider>
    )
}