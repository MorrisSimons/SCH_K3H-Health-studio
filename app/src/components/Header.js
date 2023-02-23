import React from "react"
import { Link } from "react-router-dom"
import K3H2 from "../images/K3H2.png"
import icon from "../images/icon.png"
import "./Header.css"

function Header() {
	return (
		<div>
			<div className="header">
				<Link to="/">
					<img className="headerLogoLeft" src={K3H2} alt="K3H2" />
				</Link>
				<img className="headerLogoRight" src={icon} alt="icon" />
			</div>
			<div className="headerPhantom"></div>
		</div>
	)
}

export default Header
