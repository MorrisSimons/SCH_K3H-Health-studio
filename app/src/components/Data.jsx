import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Select from "react-select"
import "./Data.css"
const API_PATH = process.env.REACT_APP_API_PATH;

function Data() {

	const [overview, setOverview] = useState([])
	const [information, setInformation] = useState([])
	const [error, setError] = useState(null)
	const [selectedOption, setSelectedOption] = useState(null)
	const [options, setOptions] = useState([])
	const [selectedForms, setSelectedForms] = useState([])
	const user = JSON.parse(localStorage.getItem("user"))


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
					data[i].value = data[i].name
					//Capitalise first letter label
					data[i].label =
						data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1)
				}
				setOptions(data)
			})
			.catch((error) => {
				setError(error)
			})
	}, [])


	async function getAllowed() {
		fetch(API_PATH + "api/getUserType", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: user.email }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				let tempOverview = []
				for (let i = 0; i < selectedForms.length; i++) {
					for (let j = 0; j < selectedForms[i].columns.length; j++) {
						if (selectedForms[i].columns[j].value === true) {
							tempOverview.push({
								tableName: selectedForms[i].tableName,
								columnName: selectedForms[i].columns[j].name,
							})
						}
					}
				}
				if (data.accountType === "admin") {
					const request_body = {
						names: tempOverview,  
					}
					fetchData(request_body);
				} 
				else if (data.accountType === "coach") {
					const request_body = {
						names: tempOverview,  
					}
					fetchData(request_body);
				}
				else if (data.accountType === "user") {
					const request_body = {
						names: tempOverview,
					}
					fetchData(request_body);
				}
				else {
					console.log("Error, not a user")
				}



			})

		}



	async function fetchData(request_body) {
		fetch(API_PATH + "api/getData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request_body),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data) => {
				console.log(data)
				setInformation(data)
			})
			.catch((error) => {
				setError(error)
			})
	}



	const addFormToTable = (e) => {
		e.preventDefault()
		if (selectedOption === null) {
			console.log("No form selected")
			return
		} else if (selectedForms.includes(selectedOption)) {
			console.log("Form already selected")
			return
		} else {
			fetch(API_PATH + "api/getColumns", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					formId: selectedOption.value,
				}),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok")
					}
					console.log(response)
					return response.json()
				})
				.then((data) => {
					console.log(data)
					// Get the fields from data and put them into name and value
					let tempData = []
					// Loop through the data and put them into an array
					for (let i = 0; i < data.fields.length; i++) {
						tempData.push({ name: data.fields[i], value: false })
					}
					let tempResult = {
						id: selectedOption.value,
						tableName: selectedOption.label,
						columns: tempData,
					}
					setSelectedForms((selectedForms) => [...selectedForms, tempResult])
				})
				.catch((error) => {
					setError(error)
				})
		}
	}

	const updateOverview = () => {
		let tempOverview = []
		for (let i = 0; i < selectedForms.length; i++) {
			for (let j = 0; j < selectedForms[i].columns.length; j++) {
				if (selectedForms[i].columns[j].value === true) {
					tempOverview.push({
						tableName: selectedForms[i].tableName,
						columnName: selectedForms[i].columns[j].name,
					})
				}
			}
		}
		setOverview(tempOverview)
		console.log("Overview updated")
		console.log(overview)
		updateInformation(overview)
	}

	const updateInformation = (fields) => {
		
		// Using the information found in the overview, get the information from the database
		fetch (API_PATH + "api/getData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				names: fields,
				nameFields: fields,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data) => {
				setInformation(data)
				console.log(data)
				console.log("Information updated")
			})
			.catch((error) => {
				setError(error)
			})
	}
	




	return (
		<div>
			<Header />
			<div className="form">
				<div className="formSelect">
					<label className="formSelectLabel">Select a form:</label>
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
						className="formSelectSelection"
					/>
					<button className="formSelectButton" onClick={addFormToTable}>
						Select
					</button>
				</div>
				<div className="formOptions">
					<label className="formOptionsLabel">Selected forms:</label>
					<div className="formOptionsSelection">
						{selectedForms &&
							selectedForms.map((forms) => (
								<table className="formOptionsNameTable" key={forms.id}>
									<thead>
										<tr>
											<th className="formOptionsNameTableText">
												{forms.tableName}
											</th>
											<td className="formOptionsNameTableButton">
												<button className="formOptionsNameTableButton">
													X
												</button>
											</td>
										</tr>
									</thead>
									{forms.columns &&
										forms.columns.map((column) => (
											<tbody key={column.name}>
												<tr>
													<td className="formOptionsNameTableText">
														{column.name}
													</td>
													<td className="formOptionsNameTableButton">
														<input
															className="formOptionsNameTableButton"
															type="checkbox"
															value={column.value}
															onClick={() => {
																column.value = !column.value
																console.log(column.value)
																updateOverview()
															}}
														/>
													</td>
												</tr>
											</tbody>
										))}
								</table>
							))}
					</div>
				</div>
				<center>
					<div className="table">
						<table className="tableStriped">
							<thead>
								<tr className="trRow">
									{overview &&
										overview.map((column) => (
											<th className="thText" key={column.columnName}>
												{column.columnName}
											</th>
										))}
								</tr>
							</thead>
							<tbody>
								{information &&
									information.map((row) => (
										<tr className="trRow" key={row.id}>
											{overview &&
												overview.map((column) => (
													<td className="tdText" key={column.columnName}>
														{row[column.columnName]}
													</td>
												))}
										</tr>
									))}


							</tbody>
						</table>
					</div>
					{error && <div>Error: {error.message}</div>}
				</center>
			</div>
			<Footer />
		</div>
	)
}

export default Data
