import React from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import "./AddCoach.css"
import K3H2 from "../images/K3H2.png"
import { useRef } from "react"
import emailjs from "emailjs-com"
import Select from "react-select"
import { useState } from "react"

function Home() {
	// select options
	const [selectedOption, setSelectedOption] = useState(null)
	const options = [
		{ value: "coach", label: "Coach" },
		{ value: "user", label: "User" },
		{ value: "admin", label: "Admin" },
	]

	// emailjs mail to customer
	const form = useRef()
	console.log(form)

	// add user to database
	const sendEmail = (e) => {
		e.preventDefault()

		emailjs.sendForm(
			"service_divma7g",
			"template_t58vfk7",
			form.current,
			"pqvac3rZUj_3LVggq"
		)

		const addUser = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: form.current.mailto.value,
				firstName: form.current.FirstName.value,
				lastName: form.current.LastName.value,
				accountType: selectedOption.value,
			}),
		}

		fetch("http://localhost:5000/api/addUser", addUser)
			.then((response) => response.json())
			.then((data) => console.log(data))
		console.log(addUser)
		e.target.reset()
	}

	return (
		<div>
			<Header />
			<section className="home_section">
				<div className="add_coach_box">
					<img className="homeLogo" src={K3H2} alt="K3H2" />
					<form className="form_add_coach" ref={form} onSubmit={sendEmail}>
						<h1>Bjud in till Health Studio</h1>
						<input
							type="email"
							name="mailto"
							className="input_box"
							placeholder="Email"
							required
						/>
						<input
							type="text"
							name="FirstName"
							className="input_box"
							placeholder="Förnamn"
							required
						/>
						<input
							type="text"
							name="LastName"
							className="input_box"
							placeholder="Efternamn"
							required
						/>
						<input
							type="text"
							name="LagNamn"
							className="input_box"
							placeholder="Lagnamn"
							required
						/>
						<Select
							defaultValue={selectedOption}
							onChange={setSelectedOption}
							options={options}
							className="select_box"
						/>
						<button type="submit" className="submit_button">
							Skicka inbjudan
						</button>
						<Link to="/">
							<button className="cancel_button">Gå tillbaka</button>
						</Link>
					</form>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Home
