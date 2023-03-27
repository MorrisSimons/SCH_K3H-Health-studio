import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import "./Data.css"

function Data() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)

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

	return (
		<div>
			<Header />
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

			<Footer />
		</div>
	)
}

export default Data
