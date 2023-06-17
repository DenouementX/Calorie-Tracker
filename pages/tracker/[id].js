import Table from '../../components/table'
import { getAllTrackerIds } from '../../lib/tracker'
import { useState, useEffect } from "react"
import { PrismaClient } from '@prisma/client'

export default function Tracker({date, rows}) {
    const [totalProtein, setTotalProtein] = useState(); 
    const [totalCalories, setTotalCalories] = useState();

    // Callback Functions
    const sendProteinToParent = (protein) => {
        setTotalProtein(protein);
    };
    const sendCaloriesToParent = (calories) => {
        setTotalCalories(calories);
    };

    return (
        <div>
            <p>This page tracks the macros for {date}</p>
            <p>Protein: {totalProtein}</p>
            <p>Calories: {totalCalories}</p>
            <Table rows={rows} sendProteinToParent={sendProteinToParent} sendCaloriesToParent={sendCaloriesToParent} date={date}></Table>
        </div>
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