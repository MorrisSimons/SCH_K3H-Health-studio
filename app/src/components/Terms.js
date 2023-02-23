import React from "react"
import Header from "./Header"
import Footer from "./Footer"

function Terms() {
	const user = JSON.parse(localStorage.getItem("user"))
	return (
		<div>
			<Header />
			<h1>Terms of service</h1>
			<Footer />
		</div>
	)
}

export default Terms
