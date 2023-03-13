import React, { useState, useEffect } from "react"
import Footer from "./Footer"
import Header from "./Header"

//Make an api call to api/getUsers to get all users
//Then dispaly them in a table

function Data() {
	const [user, setUsers] = useState([])
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
	console.log(user)

	// Object.keys(user).length !== 0 && (
	// 	<button onClick={(e) => handleSignOut(e)}>Sign Out</button>
	// )
	{
		;<p>
			Welcome {user?.firstName} {user?.lastName}
		</p>
	}

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
