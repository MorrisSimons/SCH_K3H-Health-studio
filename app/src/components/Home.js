import React from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Login from "../login_function/Login"

function Home() {
	function onLoginPress() {
		const loginButton = document.getElementById("loginButton")
		const loginPrompt = document.getElementById("loginPrompt")

		loginPrompt.hidden = false
		loginButton.hidden = true
	}

	return (
		<div>
			<Header />
			<h1>Welcome to the Index page</h1>
			<button id="loginButton" onClick={onLoginPress}>
				Login
			</button>
			<div id="loginPrompt" hidden>
				<Login />
			</div>
			<Link to="/about">
				<button>Go to About</button>
			</Link>

			<Footer />
		</div>
	)
}

export default Home
