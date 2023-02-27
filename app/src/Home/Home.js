import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Login from "../login_function/Login"
import "./Home.css"

function Home() {
	return (
		<div>
			<Header />
			<section>
				<div className="home_pagebox">
				<h1>Good Health starts with you</h1>
				<form>
				<label htmlFor="name">Name</label>
          		<input type="text" id="name" name="name" required />
				<label htmlFor="password">Password</label>
            	<input type="password" id="password" name="password" required />
				<div className="create_account_button"><button type="submit">Create account</button></div>
				</form>
				<h4>OR</h4>
					<div className="login_button"><Login /></div>
					
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Home
