import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"
import Contact from "./components/Contact"
import Policy from "./components/Policy"
import Terms from "./components/Terms"
import LoginDashboard from "./components/LoginDashboard"

const Views = () => {
	const user = JSON.parse(localStorage.getItem("user"))
	const isLoggedIn = user && Object.keys(user).length !== 0

	return (
		<Routes>
			<Route path="/" element={isLoggedIn ? <LoginDashboard /> : <Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/policy" element={<Policy />} />
			<Route path="/terms" element={<Terms />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Views
