import Table from '../../components/table';
import {getAllTrackerIds} from '../../lib/tracker'

export default function Tracker({date, rows}) {
    return (
        <div>
            <p>This page tracks the macros for {date}</p>
            <p>Protein:</p>
            <p>Calories:</p>
            <Table rows={rows}></Table>
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
    // Fetch necessary data for the blog post using params.id
    var date = params.id;

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