import { useEffect, useState } from "react";

export default function Table({rows}) {
    
    const [numRows, setNumRows] = useState(rows.length);
    const [totalProtein, setTotalProtein] = useState(); // TODO: 
    const [totalCalories, setTotalCalories] = useState(); // TODO: 

    const handleNewEntryKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("New Entry")
            var name = document.getElementById('enterName').value
            var protein = document.getElementById('enterProtein').value
            var calories = document.getElementById('enterCalories').value
            rows.push({
                id: numRows + 1,
                name: name,
                protein: protein,
                calories: calories
            });
            document.getElementById('enterName').value = ""
            document.getElementById('enterProtein').value = ""
            document.getElementById('enterCalories').value = ""
            setNumRows(numRows + 1);
        }
    }

    const handleUpdateEntryKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("Update Entry");
        }
    }

    useEffect(()=>{
    })

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
                        <td><input id="enterName" type="text" onKeyDown={handleNewEntryKeyDown}></input></td>
                        <td><input id="enterProtein" type="number" onKeyDown={handleNewEntryKeyDown}></input></td>
                        <td><input id="enterCalories" type="number" onKeyDown={handleNewEntryKeyDown}></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
