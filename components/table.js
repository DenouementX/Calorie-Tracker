import { useEffect, useState } from "react";

export default function Table({rows, sendProteinToParent, sendCaloriesToParent}) {
    
    const [numRows, setNumRows] = useState(rows.length);

    const handleNewEntryKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("New Entry")
            var name = document.getElementById('enterName').value
            var protein = document.getElementById('enterProtein').value
            var calories = document.getElementById('enterCalories').value
            // TODO: Database CREATE
            rows.push({
                id: numRows + 1,
                name: name,
                protein: Math.max(0, protein), // Defaults entries to 0 to prevent NaN
                calories: Math.max(0, calories)
            });
            document.getElementById('enterName').value = ""
            document.getElementById('enterProtein').value = ""
            document.getElementById('enterCalories').value = ""
            setNumRows(numRows + 1);
        }
    }

    const handleUpdateEntryKeyDown = (event) => {
        if (event.key === 'Enter') {
            // TODO: Database UPDATE
            console.log("Update Entry");
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
    }, [numRows])

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Food Item</th>
                        <th>Protein</th>
                        <th>Calories</th>
                    </tr>
                    {rows.map(row => (
                        <tr key={row.id}>
                            <td>{row.id})</td>
                            <td><input id={"enterName-" + row.id} type="text" onKeyDown={handleUpdateEntryKeyDown} defaultValue={row.name}></input></td>
                            <td><input id={"enterProtein-" + row.id} type="number" onKeyDown={handleUpdateEntryKeyDown} defaultValue={row.protein}></input></td>
                            <td><input id={"enterCalories-" + row.id} type="number" onKeyDown={handleUpdateEntryKeyDown} defaultValue ={row.calories}></input></td>
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
