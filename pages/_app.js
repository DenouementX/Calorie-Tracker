import '../styles/global.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
            <Component {...pageProps} />
        </GoogleOAuthProvider>
    )
}