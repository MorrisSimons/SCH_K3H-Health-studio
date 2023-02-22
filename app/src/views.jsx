import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"
import Login from "./login_function/Login"
import Index from "./components/Index"

const Views = () => {
	const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

	return (
		<Routes>
			<Route path="/" element={isLoggedIn ? <Home /> : <Index />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Views
