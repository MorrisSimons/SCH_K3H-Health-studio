import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import "./LoginDashboard_a.css"
import { Link } from "react-router-dom"

function LoginDashboard() {
	function handleSignOut() {
		localStorage.removeItem("user")
		window.location.reload()
	}

	const user = JSON.parse(localStorage.getItem("user"))
	console.log("user: " + user)

	const data = [
		{
			id: 1,
			title: "Gör test",
			navigation: "/do_test",
		},
		{
			id: 2,
			title: "Se data",
			navigation: "/data",
		},
		{
			id: 3,
			title: "Analyser",
			navigation: "/doanalysis",
		},
		{
			id: 4,
			title: "Skapa formulär",
			navigation: "/createform",
		},
		{
			id: 5,
			title: "formulär",
			navigation: "/forms",
		},
		{
			id: 6,
			title: "Lägg till coach",
			navigation: "/add_coach",
		},
	]

	return (
		<section className="dashboard__section_admin">
			<div id="admin">
				<Header />
				<h1>LoginDashboard</h1>
				<div className="container dashboard__container">
					{data.map(({ id, title, navigation }) => {
						return (
							<Link to={navigation} key={id}>
								<button className="dashboard__button">{title}</button>
							</Link>
						)
					})}
					<button className="logout" onClick={handleSignOut}>
						Logga ut
					</button>
				</div>
				<Footer />
			</div>
		</section>
	)
}

export default LoginDashboard
