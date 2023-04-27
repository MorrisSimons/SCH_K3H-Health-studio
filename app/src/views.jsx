import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"
import Contact from "./components/Contact"
import Policy from "./components/Policy"
import Terms from "./components/Terms"
import Data from "./components/Data"
//import Add_form from "./components/Add_form_page"
import LoginDashboardA from "./components/LoginDashboard_a"
import LoginDashboardC from "./components/LoginDashboard_c"
import LoginDashboardP from "./components/LoginDashboard_p"
import AddCoach from "./components/AddCoach"
import DoTestPage from "./components/DoTestPage"
import AddForm from "./components/AddForm"
import ManageForms from "./components/ManageForms"
const API_PATH = process.env.REACT_APP_API_PATH
const envirioment =  'True' //process.env.REACT_APP_DEV_ENVIRONMENT


const Views = () => {
	const [dashboard, setDashboard] = useState(<LoginDashboardA />)
	const user = JSON.parse(localStorage.getItem("user"))
	const isLoggedIn = user && Object.keys(user).length !== 0
	async function getDashboard() {
		if (isLoggedIn) {

			if (envirioment === "False") {
			const data_2 = "Console log"
			console.log("End?")
			console.log(data_2)
			fetch(API_PATH + "api/getUserType", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: user.email }),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data[0].accountType === "admin") {
						setDashboard(<LoginDashboardA />)
					} else if (data[0].accountType === "coach") {
						setDashboard(<LoginDashboardC />)
					}
					else if (data[0].accountType === "user") {
						setDashboard(<LoginDashboardP />)
					}
					else {
						setDashboard(<Home />)
					}
				})

			}
			else {
				// Enter the dashboard you want to develop in here
				setDashboard(<LoginDashboardP />)
			}

		} else {
			// Should log out people as well.
			setDashboard(<Home />)
		}
	}

	useEffect(() => {
		// Set the dashboard to admin
		(async () => {
			await getDashboard()
		  })();
	}, [])


	return (
		<Routes>
			<Route path="/" element={dashboard} />
			<Route path="/Data" element={<Data />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/policy" element={<Policy />} />
			<Route path="/terms" element={<Terms />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/add_coach" element={<AddCoach />} />
			<Route path="/do_test" element={<DoTestPage/>} />
			<Route path="/createform" element={<AddForm/>} />
			<Route path="/forms" element={<ManageForms/>} />
			
		</Routes>
	)
}

export default Views
