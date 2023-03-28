import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Select from "react-select"
import "./Data.css"

function Data() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const [selectedOption, setSelectedOption] = useState(null)
	const [options, setOptions] = useState([])

	const [selectedForms, setSelectedForms] = useState([])
	const forms = [
		{
			id: 1,
			tableName: "user",
			columns: [
				{ name: "email", value: false },
				{ name: "firstName", value: false },
				{ name: "lastName", value: false },
				{ name: "accountType", value: false },
			],
		},
		{
			id: 2,
			tableName: "admin",
			columns: [
				{ name: "email2", value: false },
				{ name: "firstName2", value: true },
				{ name: "lastName2", value: false },
				{ name: "accountType2", value: false },
			],
		},
	]

	// Insert forms into selectedForms array

	useEffect(() => {
		fetch("http://localhost:5000/api/getUsers", { method: "GET" })
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data) => {
				setUsers(data)
			})
			.catch((error) => {
				setError(error)
			})
		fetch("http://localhost:5000/api/getForms", { method: "GET" })
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

	const addFormToTable = (e) => {
		e.preventDefault()
		console.log("Form selected")
		console.log(selectedOption)
		console.log(options)
		if (selectedOption === null) {
			console.log("No form selected")
			return
		} else if (selectedForms.includes(selectedOption)) {
			console.log("Form already selected")
			return
		} else if (selectedOption.value === "user") {
			console.log("User form selected")
			setSelectedForms((selectedForms) => [...selectedForms, forms[0]])
		} else if (selectedOption.value === "admin") {
			console.log("Admin form selected")
			setSelectedForms((selectedForms) => [...selectedForms, forms[1]])
		}
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
									<th className="thText">First Name</th>
									<th className="thText">Last Name</th>
									<th className="thText">Email</th>
									<th className="thText">Account Type</th>
								</tr>
							</thead>
							<tbody>
								{users &&
									users.map((user) => (
										<tr className="trRow" key={user.id}>
											<td className="tdText">{user.firstName}</td>
											<td className="tdText">{user.lastName}</td>
											<td className="tdText">{user.email}</td>
											<td className="tdText">{user.accountType}</td>
										</tr>
									))}
								{error && <div>Error: {error.message}</div>}
							</tbody>
						</table>
					</div>
				</center>
			</div>
			<Footer />
		</div>
	)
}

export default Data
