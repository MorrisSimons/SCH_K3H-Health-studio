import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Select from "react-select"
import "./Data.css"

function Data() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const [selectedOption, setSelectedOption] = useState(null)
	const options = [
		{ value: "coach", label: "Coach" },
		{ value: "user", label: "User" },
		{ value: "admin", label: "Admin" },
	]

	const [selectedForms, setSelectedForms] = useState([])
	const forms = [
		{
			id: 1,
			table: "user",
			columns: ["email", "firstName", "lastName", "accountType"],
		},
		{
			id: 2,
			value: "admin",
			columns: ["email2", "firstName2", "lastName2", "accountType2"],
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
	}, [])

	const addFormToTable = (e) => {
		e.preventDefault()
		console.log("Form selected")
		console.log(selectedOption)
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
								<div className="formOptionsName" key={forms.id}>
									{forms.value}
									{forms.columns &&
										forms.columns.map((column) => (
											<div className="formOptionsColumn">
												{column}
												<input
													className="formOptionsColumnButton"
													type="radio"
												/>
											</div>
										))}
								</div>
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
