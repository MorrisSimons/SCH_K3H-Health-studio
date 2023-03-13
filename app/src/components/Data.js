import React, { useState, useEffect } from "react"
import Footer from "./Footer"
import Header from "./Header"

//Make an api call to api/getUsers to get all users
//Then dispaly them in a table

function Data() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	useEffect(() => {
		fetch("http://localhost:5000/api/getUsers", { method: "GET" })
			.then((res) => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error("Something went wrong")
				}
			})
			.then((data) => {
				setUsers(data)
			})
			.catch((error) => {
				setError(error)
				console.log(error)
			}).finally
	}, [])

	return (
		<div>
			<Header />
			<section className="data_section">
				<div className="data_box">
					<h1>Data</h1>
					<table>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
						</tr>
						{users.map((user) => (
							<tr>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
							</tr>
						))}
					</table>
					<p className="data_text">
						Here is the data from the database. This data is being fetched from
						the backend using an api call. // Show the data contained in users
						and setUsers
					</p>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Data
