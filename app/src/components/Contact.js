import React from "react"
import Header from "./Header"
import Footer from "./Footer"

function Contact() {
	const user = JSON.parse(localStorage.getItem("user"))
	return (
		<div>
			<Header />
			<h1>Contact us</h1>
			<Footer />
		</div>
	)
}

export default Contact
