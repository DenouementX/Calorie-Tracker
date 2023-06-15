import Table from '../../components/table';
import {getAllTrackerIds} from '../../lib/tracker'
import {useState} from "react";

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
            <Table rows={rows} sendProteinToParent={sendProteinToParent} sendCaloriesToParent={sendCaloriesToParent}></Table>
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

    // TODO: Database READ
    
    // Sample database return
    var rows = [
        {
            id: "1",
            name: "Chicken Thighs",
            protein: 49,
            calories: 490
        },
        {
            id: "2",
            name: "White Rice",
            protein: 4,
            calories: 242
        },
        {
            id: "3",
            name: "Beans",
            protein: 7,
            calories: 110
        },
        {
            id: "4",
            name: "Cheese",
            protein: 7,
            calories: 110
        },
        {
            id: "5",
            name: "Yogurt",
            protein: 11,
            calories: 60
        }
    ];

    return {
        props: {
            date,
            rows
        }
    };
}