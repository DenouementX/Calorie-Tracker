import Link from 'next/link'
import Layout from '../components/layout';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Meat from '../public/images/meat.png'
import Favicon from '../public/images/favicon.png'

export default function Home() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                     console.log(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [ user ]
    // );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <Layout>
            <div className='my-36 mx-72 border border-borderGray rounded-md shadow-lg shadow-gray bg-backgroundGray py-10 px-28 font-mono font-thin text-center text-textBlue'>
                <div className='relative'>
                    <Image className='absolute left-0 top-0 max-w-[16%]' src={Meat} alt="Food"/>
                    <p className='text-5xl underline underline-offset-8 pt-5'>Calorie Tracker</p>
                    <Image className='absolute right-0 top-0 max-w-[16%]' src={Favicon} alt="Food"/>
                </div>
                <p className='pt-12 pb-8 text-2xl'>Welcome to Calorie Tracker, a website that lets you manage your macro intake. To get started, click the button below to sign in via Google:</p>
                <div className='flex justify-center items-center'>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            </div>
        </Layout>
    );
}