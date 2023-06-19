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

    return (
        <Layout>
            <div>
                <p>This page tracks the macros for {date}</p>
                <button onClick={() => setShowCalendar(!showCalendar)}>{showCalendar ? 'Close Calendar' : 'Open Calendar'}</button>
                <div style={{display: showCalendar ? "block": "none"}}>
                    <Calendar onChange={changeDate} defaultValue={date} />
                </div>
                <p>Protein: {totalProtein}</p>
                <p>Calories: {totalCalories}</p>
                <Table rows={rows} sendProteinToParent={sendProteinToParent} sendCaloriesToParent={sendCaloriesToParent} date={date}></Table>
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