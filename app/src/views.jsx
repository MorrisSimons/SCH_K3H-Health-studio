import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"
import LoginDashboard from "./components/LoginDashboard"

const Views = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = user && Object.keys(user).length !== 0;

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <LoginDashboard /> : <Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />
      <Route path="/policy" element={<h1>Privacy Policy</h1>} />
      <Route path="/terms" element={<h1>Terms of Service</h1>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Views
