import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"

function ManageForms() {
    const [error, setError] = useState(null)
    const [tables, setTables] = useState([])
    

    useEffect(() => {
		fetch("http://localhost:5000/api/getForms", { method: "GET" })
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					//Capitalise first letter label
					data[i].label =
						data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1)
				}
				setTables(data)
			})
			.catch((error) => {
				setError(error)
			})
	}, [])

    console.log(tables)
	
    return (
        <div>
            <Header />
            <div>
                {tables.map((table) => {
                    return (
                        <div key={table.id} className="DoTest_field">
                            <text>{table.label}</text>
                        </div>
                    )
                })}
            </div>
            <Footer />
        </div>
    )
}
export default ManageForms