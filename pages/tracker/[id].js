import Table from '../../components/table'
import { getAllTrackerIds } from '../../lib/tracker'
import { useState, useEffect } from "react"
import { PrismaClient } from '@prisma/client'
import Calendar from 'react-calendar'
import { useRouter } from 'next/router'
import 'react-calendar/dist/Calendar.css';
import Layout from '../../components/layout'

export default function Tracker({date, rows}) {
    const [totalProtein, setTotalProtein] = useState(); 
    const [totalCalories, setTotalCalories] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const router = useRouter();

    // Callback Functions
    const sendProteinToParent = (protein) => {
        setTotalProtein(protein);
    };
    const sendCaloriesToParent = (calories) => {
        setTotalCalories(calories);
    };

    const changeDate = (date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1; // Months from 1-12
        var year = date.getFullYear();
        var newDate = year + "-" + month + "-" + day;
        router.push(newDate);
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
            <div className='mt-20 mx-72 border border-borderGray rounded-md shadow-lg shadow-gray bg-backgroundGray p-10 font-mono font-thin'>
                <div className='text-center text-textBlue'>
                    <p className='text-5xl'>{getDate(date)}</p>
                    <button onClick={() => setShowCalendar(!showCalendar)}>{showCalendar ? 'Close Calendar ↑' : 'Open Calendar ↓'}</button>
                    <div className="flex justify-center items-center" style={{display: showCalendar ? "block": "none"}}>
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
                <div className='flex justify-center items-center'>
                    <Table rows={rows} sendProteinToParent={sendProteinToParent} sendCaloriesToParent={sendCaloriesToParent} date={date}></Table>
                </div>
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