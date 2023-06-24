import Table from '../../components/table';
import { getAllTrackerIds, formatDate, getDisplayDate } from '../../lib/tracker';
import { useContext, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css';
import Layout from '../../components/layout';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Unauthorized from '../../components/unauthorized';

export default function Tracker({date}) {
    const dynamicRoute = useRouter().asPath;
    const [rows, setRows] = useState([])
    const [numRows, setNumRows] = useState(0);
    const [totalProtein, setTotalProtein] = useState(); 
    const [totalCalories, setTotalCalories] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const router = useRouter();
    const { user, updateUser } = useContext(UserContext);

    // Callback Functions
    const sendProteinToParent = (protein) => {
        setTotalProtein(protein);
    };
    const sendCaloriesToParent = (calories) => {
        setTotalCalories(calories);
    };
    const sendRowToParent = (row) => {
        var tempRows = rows.slice(); // https://stackoverflow.com/questions/25937369/react-component-not-re-rendering-on-state-change
        tempRows.push(row);
        setRows(tempRows);
    }

    const changeDate = (date) => {
        router.push(formatDate(date));
    }

    const signOut = () => {
        updateUser("");
        router.push("/");
    }

    useEffect(()=>{
        setNumRows(rows.length);
    }, [rows])

    // Resets State on Next.js Route Change
    // As outlined here: https://www.seancdavis.com/posts/resetting-state-on-nextjs-route-change/
    useEffect(()=>{
        // Reset state so react rerenders rows correctly
        setRows([]);
        setNumRows(0);

        var query = {
            user: user,
            date: date
        }
        axios.get('/api/macros', {params: query})
        .then(function (response) {
            // console.log(response);
            setRows(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [dynamicRoute])

    return (
        <Layout>
            <div className='relative my-20 xl:mx-72 lg:mx-44 md:mx-20 sm:mx-3 border border-borderGray rounded-md shadow-lg shadow-gray bg-backgroundGray p-10 font-mono font-thin text-center text-textBlue'>
                {user.length === 0 ? <Unauthorized router={router} />:
                    <div>
                        <div className=''>
                            <button className='absolute right-4 top-4 rounded-xl px-2 py-1 shadow-md shadow-gray bg-white border transition ease-in-out delay-50 hover:scale-110 hover:bg-hoverBlue hover:border-hoverGoogle border-googleBorderGray tracking-wide' onClick={signOut}>Sign Out</button>
                            <p>Currently signed in as: {user}</p>
                            <p className='text-5xl'>{getDisplayDate(date)}</p>
                            <button onClick={() => setShowCalendar(!showCalendar)}>
                                {showCalendar ? 
                                    <div className='flex'>
                                        <p>Close Calendar</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-textBlue">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                : 
                                    <div className='flex'>
                                        <p>Open Calendar</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-textBlue">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg>

                                    </div>
                                }
                            </button>
                            <div className="justify-center" style={{display: showCalendar ? "flex": "none"}}>
                                <Calendar onChange={changeDate} defaultValue={date} />
                            </div>
                            <div className='grid grid-cols-2 text-3xl'>
                                <div className='ml-20'>
                                    <p className='underline underline-offset-4'>Protein</p>
                                    <p>{totalProtein}</p>
                                </div>
                                <div className='mr-20'>
                                    <p className='underline underline-offset-4'>Calories</p>
                                    <p>{totalCalories}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Table rows={rows} sendRowToParent={sendRowToParent} sendProteinToParent={sendProteinToParent} sendCaloriesToParent={sendCaloriesToParent} numRows={numRows} date={date}></Table>
                        </div>
                    </div>
                }
            </div>
        </Layout>
    );
}

export async function getServerSidePaths() {
    // Return a list of possible value for id
    const paths = getAllTrackerIds();
    return {
      paths,
      fallback: false,
    };
}
  
export async function getServerSideProps({ params }) {
    var date = params.id;

    return {
        props: {
            date
        }
    };
}