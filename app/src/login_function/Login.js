import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import config from "../config.json"

function LoginFunction() {
	const [user, setUser] = useState({})

	function handleCallbackResponse(response) {
		console.log("Encoded JWT ID token: " + response.credential)
		var userObject = jwt_decode(response.credential)
		console.log(userObject)
		setUser(userObject)

		document.getElementById("signInDiv").hidden = true

		// Save the JWT token in local storage
		localStorage.setItem("user", JSON.stringify(userObject))
		console.log("success")
		window.location.reload()
	}

	function handleSignOut(event) {
		setUser({})
		document.getElementById("signInDiv").hidden = false

		// Clear the JWT token from local storage
		localStorage.removeItem("user")
	}

	useEffect(() => {
		/* global google */
		try {
			google.accounts.id.initialize({
				client_id: config["client-id"],
				callback: handleCallbackResponse,
			})

			google.accounts.id.renderButton(document.getElementById("signInDiv"), {
				theme: "outline",
				size: "large",
			})

			google.accounts.id.prompt()

			console.log(document.getElementById("signInDiv")) // Add this line
		} catch (error) {
			console.log(error)
			window.location.reload()
		}
	}, [])

	return (
		<div className="LoginFunction">
			<div id="signInDiv"></div>
			{Object.keys(user).length !== 0 && (
				<button onClick={(e) => handleSignOut(e)}>Sign Out</button>
			)}
		</div>
	)
}

export default LoginFunction
