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
            <div className='relative xl:my-36 lg:my-20 md:my-16 sm:my-12 xl:mx-72 lg:mx-44 md:mx-20 sm:mx-3 border border-borderGray rounded-md shadow-lg shadow-gray bg-backgroundGray py-10 xl:px-28 lg:px-20 md:px-16 sm:px-10 font-mono font-thin text-center text-textBlue'>
                    <Image className='absolute left-10 top-8 md:w-24 sm:w-0' src={Meat} alt="Food"/>
                    <p className='text-5xl underline underline-offset-8 pt-5'>Calorie Tracker</p>
                    <Image className='absolute right-10 top-8 md:w-24 sm:w-0' src={Favicon} alt="Food"/>

                <p className='pt-12 pb-8 text-2xl'>Welcome to Calorie Tracker, a website that lets you manage your macro intake. To get started, click the button below to sign in via Google:</p>
                <div className='flex justify-center items-center'>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            </div>
        </Layout>
    );
}


/**
{
    "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA1MTUwYTEzMjBiOTM5NWIwNTcxNjg3NzM3NjkyODUwOWJhYjQ0YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODc0MTI5MzQsImF1ZCI6IjEwODQ5NjY3NDAxMjYtMGxib3ExZnJzZ2lrcTJra2tjZ3VvdGEwbTUxZjYzOGsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU5NzE1NzgzNzU2MTgxMDIwNzAiLCJlbWFpbCI6Imxhd3JlbmNlbWFvMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMTA4NDk2Njc0MDEyNi0wbGJvcTFmcnNnaWtxMmtra2NndW90YTBtNTFmNjM4ay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJMYXdyZW5jZSBNYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0YzdqMkZadmEyd1VyUHZmdUVqUEJpdzI4N0N2LXpHbDc2ME5ubmNrWms9czk2LWMiLCJnaXZlbl9uYW1lIjoiTGF3cmVuY2UiLCJmYW1pbHlfbmFtZSI6Ik1hbyIsImlhdCI6MTY4NzQxMzIzNCwiZXhwIjoxNjg3NDE2ODM0LCJqdGkiOiJiODg0OWQwYTUwOTFhNzE0ODVhNTE1ODRkNWRiM2JiYzRkMjI3M2YxIn0.WyO596lScBKcyCmU1Lsi492YsDCqKSTGVjAKOTFFsgK79iPS3BRcaYORM1m6Te-ibxO4oDyzztFGW0rfbPH7K5jpthKFdAlUo7v1SsBzgV1VdQuJLsru8XQauaRdjHliGlmGN21-k3gpfkpUCAUlj_p8d8MvJ_aVPiucLdVQql8gKes3-c3py4MoFiv93srarO7xiq7CDFHSm1gDwcr7odPt2371nlh9nislRLZ0N8bRF9NuvrtPS9lSxP6kYpQ34Dfk0V0USVTGRMo9OrsGW9-iH-l92DlGoSNanq3l7Ih2cXXchIqnwWk-XfSfXyHd9rErOV232m2rqAw88_G0Rg",
    "clientId": "1084966740126-0lboq1frsgikq2kkkcguota0m51f638k.apps.googleusercontent.com",
    "select_by": "btn"
}
{
    "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA1MTUwYTEzMjBiOTM5NWIwNTcxNjg3NzM3NjkyODUwOWJhYjQ0YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODc0MTI5NjMsImF1ZCI6IjEwODQ5NjY3NDAxMjYtMGxib3ExZnJzZ2lrcTJra2tjZ3VvdGEwbTUxZjYzOGsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ5NzE5MDc1MTM2MjcxNDQyODIiLCJlbWFpbCI6InJlZGRpbm9uaW5qYXBpZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMTA4NDk2Njc0MDEyNi0wbGJvcTFmcnNnaWtxMmtra2NndW90YTBtNTFmNjM4ay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJMYXdyZW5jZSBNYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZGpoLWRCTDJoTHpKeHkwUW9pZElpbTdSbDUycUJCOVBpMVVjemhVQT1zOTYtYyIsImdpdmVuX25hbWUiOiJMYXdyZW5jZSIsImZhbWlseV9uYW1lIjoiTWFvIiwiaWF0IjoxNjg3NDEzMjYzLCJleHAiOjE2ODc0MTY4NjMsImp0aSI6IjIwMTI1OTRjOGFiYjNkYTE1MmQ0NDUzZDQ5MTVlM2I3NmI4ZjM4NGMifQ.Er1tqzKRnwOB0qlnKTvw8G1oBah2jN0YAHRc0fUciKI0ewnxFPdupaXGkLdYscP59D1g2pI-FpOlTQbGJLzDn-i38mdcMnZqZLkm5g37KX50keL8NvMJ4G4SfsySvZkdHKCYOV3ypcBUtGnEI0unaXRAGZ6qC_T0ludRMosGfOAGqzgmD_jxL3pyOTOHWN0MMPfQeK0acGNpxHe4irRM_4m2i-lmd1vTYOKsBL5RvuNFJOOAkHzUK2Pf2pHZb_AwE0DwoESmrhvrVUmslokKutjEZmiehBDW5B604KEvnBn9aQwH0tMRAbueSnwrJp2FTLG0w_URoeMq1yYjdYOamQ",
    "clientId": "1084966740126-0lboq1frsgikq2kkkcguota0m51f638k.apps.googleusercontent.com",
    "select_by": "btn"
}
{
    "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA1MTUwYTEzMjBiOTM5NWIwNTcxNjg3NzM3NjkyODUwOWJhYjQ0YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODc0MTMwMDAsImF1ZCI6IjEwODQ5NjY3NDAxMjYtMGxib3ExZnJzZ2lrcTJra2tjZ3VvdGEwbTUxZjYzOGsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU5NzE1NzgzNzU2MTgxMDIwNzAiLCJlbWFpbCI6Imxhd3JlbmNlbWFvMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMTA4NDk2Njc0MDEyNi0wbGJvcTFmcnNnaWtxMmtra2NndW90YTBtNTFmNjM4ay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJMYXdyZW5jZSBNYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0YzdqMkZadmEyd1VyUHZmdUVqUEJpdzI4N0N2LXpHbDc2ME5ubmNrWms9czk2LWMiLCJnaXZlbl9uYW1lIjoiTGF3cmVuY2UiLCJmYW1pbHlfbmFtZSI6Ik1hbyIsImlhdCI6MTY4NzQxMzMwMCwiZXhwIjoxNjg3NDE2OTAwLCJqdGkiOiI5MmQ3NmRmNzkwMGFjZjJjMjNlZjJkODA2ZjQxYmUxMjFjNDFjYTdjIn0.ej7G6jxE1C68Qy2CuC7F_jHdEH8Ug0SeWmHaqqJ-L4_WUkwpQJ-MJXm5PTJQQphdjkEx5vGIMq0DgOrPGe-TjR8XKU2MerFUZSLFMoN3lJvJbQ6L_ytgAy0R1rwaQsJmsnawA3VzRYeK1CWkS7W8M3Tru1o8Z1QcDYLFddTcCtOtV0zhWNc4f43Oi2luKuvkqwKJ5bPdUMGizQAvCwpOR3r-Lc1gs5xeEgJOzqv52M49MtOgNQnB30Pz37LOhFjMSqM6lEr9SFHguUbgw8LNPkXKw3giP5BBpJocVvZLNWG1ERx6Fv5MgsIM77rhBQD0Hiyo4GCUAVfcWARTEBwzeg",
    "clientId": "1084966740126-0lboq1frsgikq2kkkcguota0m51f638k.apps.googleusercontent.com",
    "select_by": "btn"
}
 */