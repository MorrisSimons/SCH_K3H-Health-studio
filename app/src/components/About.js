import React from "react"
import Header from "./Header"
import Footer from "./Footer"

function About() {
	const user = JSON.parse(localStorage.getItem("user"))
	return (
		<div>
			<Header />
			<h1>About us</h1>
			{/*
			<p>{user.name}</p>*/}
			{/*<p>{user.email}</p>*/}
			{/* ... */}
			<Footer />
		</div>
	)
}

export default About
