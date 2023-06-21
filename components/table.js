import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router";

export default function Table({rows, sendProteinToParent, sendCaloriesToParent, date}) {
    
    const [numRows, setNumRows] = useState(rows.length);
    const [websiteReload, setWebsiteReload] = useState(false);
    const dynamicRoute = useRouter().asPath;

    const handleNewEntryKeyDown = (event) => {
        if (event.key === 'Enter') {
            var food = document.getElementById('enterName').value;
            var protein = document.getElementById('enterProtein').value;
            var calories = document.getElementById('enterCalories').value;

            var newRow = {
                date: date,
                index: numRows + 1,
                food: food,
                protein: Math.max(0, protein), // Defaults entries to 0 to prevent NaN
                calories: Math.max(0, calories)
            }

            axios.post('/api/addRow', newRow)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            rows.push(newRow);
            document.getElementById('enterName').value = ""
            document.getElementById('enterProtein').value = ""
            document.getElementById('enterCalories').value = ""
            setNumRows(numRows + 1);
        }
    }

    const handleUpdateEntryKeyDown = (event) => {
        if (event.key === 'Enter') {
            var index = parseInt((event.currentTarget.id).split('-')[1]);
            var food = document.getElementById('enterName-'+index).value;
            var protein = parseInt(document.getElementById('enterProtein-'+index).value);
            var calories = parseInt(document.getElementById('enterCalories-'+index).value);

            var newRow = {
                date: date,
                index: index,
                food: food,
                protein: protein,
                calories: calories
            };

            axios.put('/api/updateRow', newRow)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            updateTotalCounts();
        }
    }

    const updateTotalCounts = () => {
        var totalProtein = 0;
        var totalCalories = 0;
        for (var i=1; i<=numRows; i++) {
            totalProtein += parseInt(document.getElementById('enterProtein-'.concat(i)).value);
            totalCalories += parseInt(document.getElementById('enterCalories-'.concat(i)).value);
        }
        sendProteinToParent(totalProtein);
        sendCaloriesToParent(totalCalories);
    }

    useEffect(()=>{
        updateTotalCounts();
    }, [numRows, websiteReload])

    // Resets State on Next.js Route Change
    // As outlined here: https://www.seancdavis.com/posts/resetting-state-on-nextjs-route-change/
    useEffect(()=>{
        setNumRows(rows.length);
        // Important in case navigating from one website with x # rows to another with x # rows as well
        // Next.js will not run the useEffect because numRows stayed the same so we need to force it via websiteReload
        setWebsiteReload(!websiteReload);
    }, [dynamicRoute])

    return (
        <div>
            <table className="border-separate border-spacing-1.5 pt-3 table-auto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food Item</th>
                        <th>Protein</th>
                        <th>Calories</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={date + '-' + row.index}>
                            <td>{row.index})</td>
                            <td><input id={"enterName-" + row.index} type="text" onKeyDown={handleUpdateEntryKeyDown} defaultValue={row.food}></input></td>
                            <td><input id={"enterProtein-" + row.index} type="number" onKeyDown={handleUpdateEntryKeyDown} defaultValue={row.protein}></input></td>
                            <td><input id={"enterCalories-" + row.index} type="number" onKeyDown={handleUpdateEntryKeyDown} defaultValue ={row.calories}></input></td>
                        </tr>
                    ))}
                    <tr>
                        <td>{numRows + 1})</td>
                        <td><input id="enterName" type="text" onKeyDown={handleNewEntryKeyDown} placeholder="Food Name"></input></td>
                        <td><input id="enterProtein" type="number" onKeyDown={handleNewEntryKeyDown} placeholder="Protein (g)"></input></td>
                        <td><input id="enterCalories" type="number" onKeyDown={handleNewEntryKeyDown} placeholder="Calories (cal)"></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
