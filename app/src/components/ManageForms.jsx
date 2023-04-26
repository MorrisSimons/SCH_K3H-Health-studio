import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import "./ManageForms.css"

const API_PATH = process.env.REACT_APP_API_PATH;

function ManageForms() {
	const [error, setError] = useState(null)
	const [tables, setTables] = useState([])

	function deleteTable(name) {
		const confirmed = window.confirm(
			"Are you sure you want to delete this table?"
		)

		if (confirmed) {
			const dropTable = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					formName: name.toLowerCase(),
				}),
			}
			fetch(API_PATH + "api/dropTable", dropTable)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((error) => {
					setError(error)
				})
				

			// Remove table from state
			const newTables = tables.filter((table) => table.name !== name)
			//setSelectedForms((selectedForms) => [...selectedForms, tempResult])
			setTables((tables) => [...newTables])
			// Update the page to reflect the change
			


		}
	}

	useEffect(() => {
		fetch(API_PATH + "api/getForms", { method: "GET" })
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
			<div class="manageform_container">
				{tables.map((table) => {
					return (
						<div class="manageform_field" key={table.id}>
							<text class="manageform_text">{table.label}</text>

							<button
								class="manageform_delete"
								onClick={() => deleteTable(table.label)}
							>
								Delete Table
							</button>
						</div>
					)
				})}
			{error && <div>{error.message}</div>}
			</div>
			<Footer />
		</div>
	)
}
export default ManageForms
