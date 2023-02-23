import React from "react"
import Header from "./Header"
import Footer from "./Footer"

function LoginDashboard() {
	function handleSignOut() {
		localStorage.removeItem("user")
		window.location.reload()
	}

	const user = JSON.parse(localStorage.getItem("user"))
	console.log("user: " + user)

	return (
		<div>
			<Header />

			<h1>LoginDashboard</h1>
			<p>{user.name}</p>
			<p>{user.email}</p>
			{/* ... */}
			<button onClick={handleSignOut}>Sign Out</button>
			<Footer />
		</div>
	)
}

export default LoginDashboard
