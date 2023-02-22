import React from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Login from "../login_function/Login"

function Index() {
	function onLoginPress() {
		const loginButton = document.getElementById("loginButton")
		const loginPrompt = document.getElementById("loginPrompt")

		loginPrompt.hidden = false
		loginButton.hidden = true
	}

	return (
		<div>
			<h1>Welcome to the Index page</h1>
			<button id="loginButton" onClick={onLoginPress}>
				Login
			</button>
			<div id="loginPrompt" hidden>
				<Login />
			</div>

			<Footer />
		</div>
	)
}

export default Index
