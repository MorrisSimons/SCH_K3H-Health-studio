import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"
import Index from "./components/Index"

const Views = () => {
	const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

	return (
		<Routes>
			<Route path="/" element={isLoggedIn ? <Home /> : <Index />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<h1>Contact Us</h1>} />
			<Route path="/policy" element={<h1>Privacy Policy</h1>} />
			<Rote path="/terms" element={<h1>Terms of Service</h1>} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Views
