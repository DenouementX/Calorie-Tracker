import Layout from '../components/layout';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import Meat from '../public/images/meat.png';
import Favicon from '../public/images/favicon.png';
import { useRouter } from 'next/router';
import { formatDate } from '../lib/tracker.js';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';

export default function Home() {
    const router = useRouter();
    const { user, updateUser } = useContext(UserContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => TEMPNAME(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const TEMPNAME = (user) => {
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            updateUser(res.data.email);

            // Redirect user to today's trackers
            var today = new Date();
            var redirect = "tracker/" + formatDate(today);
            router.push(redirect);
        })
        .catch((err) => console.log(err));
    }

    return (
        <Layout>
            <div className='relative xl:my-36 lg:my-20 md:my-16 sm:my-12 xs:my-9 xl:mx-72 lg:mx-44 md:mx-20 sm:mx-3 xs:mx-3 border border-borderGray rounded-md shadow-lg shadow-gray bg-backgroundGray py-10 xl:px-28 lg:px-20 md:px-16 sm:px-10 xs:px-10 font-mono font-thin text-center text-textBlue'>
                <Image className='absolute left-10 top-8 md:w-24 sm:w-0 xs:w-0' src={Meat} alt="Food"/>
                <p className='text-5xl xs:text-4xl underline underline-offset-8 pt-5'>Calorie Tracker</p>
                <Image className='absolute right-10 top-8 md:w-24 sm:w-0 xs:w-0' src={Favicon} alt="Food"/>
                <p className='pt-12 pb-8 text-2xl'>Welcome to Calorie Tracker, a website that lets you manage your macro intake. To get started, click the button below to sign in via Google:</p>
                <div>
                    <button className='bg-white border transition ease-in-out delay-50 hover:scale-110 hover:bg-hoverBlue hover:border-hoverGoogle border-googleBorderGray rounded-full' onClick={login}>
                        <div className='py-2 px-4 flex flex-row justify-center'>
                            <svg className='h-6 pr-2' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                            <p className='text-black font-roboto tracking-wide font-normal'>Sign in with Google</p>
                        </div>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
