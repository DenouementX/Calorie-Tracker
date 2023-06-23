import Table from '../../components/table';
import { getAllTrackerIds, formatDate } from '../../lib/tracker';
import { useContext, useState } from "react";
import { PrismaClient } from '@prisma/client';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css';
import Layout from '../../components/layout';
import { UserContext } from '../../context/userContext';

export default function Tracker({date, rows}) {
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

    const changeDate = (date) => {
        router.push(formatDate(date));
    }

    function getDate(date) {
        var hyphens = []
        for (let i = 0; i < date.length; i++) {
            if (date[i] === ("-")) {
                hyphens.push(i);
            }
        }
        var day = date.substring(hyphens[1] + 1);
        var month = date.substring(hyphens[0] + 1, hyphens[1]);
        var year = date.substring(0, hyphens[0]);
        const months = ["", "January","February","March","April","May","June","July","August","September","October","November","December"];
        return months[month] + " " + day + ", " + year;
    }

    return (
        <Layout>
            <div className='my-20 xl:mx-72 lg:mx-44 md:mx-20 sm:mx-3 border border-borderGray rounded-md shadow-lg shadow-gray bg-backgroundGray p-10 font-mono font-thin text-center text-textBlue'>
                {user.length === 0 ? <h1 className='text-3xl'>You are not signed in : (</h1> :
                    <div>
                        <div className=''>
                            <p>Currently signed in as: {user}</p>
                            <p className='text-5xl'>{getDate(date)}</p>
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
                            <Table rows={rows} sendProteinToParent={sendProteinToParent} sendCaloriesToParent={sendCaloriesToParent} date={date}></Table>
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

    const prisma = new PrismaClient();
    const rows = await prisma.macros.findMany({
        where: {
            date: date
        }
    });

    return {
        props: {
            date,
            rows
        }
    };
}