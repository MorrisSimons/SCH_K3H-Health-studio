import React from "react"
import Header from "./Header"
import Footer from "./Footer"

function Policy() {
	const user = JSON.parse(localStorage.getItem("user"))
	return (
		<div>
			<Header />
			<h1>Privacy policy</h1>
			<Footer />
		</div>
	)
}

export default Policy
