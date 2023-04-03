import { Routes, Route } from "react-router-dom"
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

const Views = () => {
	const user = JSON.parse(localStorage.getItem("user"))
	const isLoggedIn = user && Object.keys(user).length !== 0

	return (
		<Routes>
			<Route path="/" element={isLoggedIn ? <LoginDashboardP /> : <Home />} />
			<Route path="/Data" element={<Data />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/policy" element={<Policy />} />
			<Route path="/terms" element={<Terms />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/add_coach" element={<AddCoach />} />
			<Route path="/do_test" element={<DoTestPage/>} />
		</Routes>
	)
}

export default Views
