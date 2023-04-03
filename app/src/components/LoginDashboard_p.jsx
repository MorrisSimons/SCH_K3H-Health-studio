import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import icon from "../images/icon.png"
import "./LoginDashboard_p.css";
import { Link } from "react-router-dom";

function LoginDashboard() {
	function handleSignOut() {
		localStorage.removeItem("user")
		window.location.reload()
	}

    const user = JSON.parse(localStorage.getItem("user"))
	console.log("user: " + user)

	const side_buttons = [
		{
			id: 1,
			title: "Se analys",
			navigation: "/see_analysis",
		},
		{
			id: 2,
			title: "Se data",
			navigation: "/data",
		},
		{
			id: 3,
			title: "Ladda fler tester",
			navigation: "/load_more_tests",
		}
	]

	const test_buttons = [
		{
			id: 1,
			title: "Test 1",
			navigation: "/see_analysis",
		},
		{
			id: 2,
			title: "Test 2",
			navigation: "/data",
		},
		{
			id: 3,
			title: "Test 3",
			navigation: "/load_more_tests",
		},
		{
			id: 4,
			title: "Test 4",
			navigation: "/load_more_tests",
		}
		
	]

	return (
		<div>
			<Header />
			<h1 className="title">Login Dashboard Player</h1>
			<section className="dashboard__section_player">
			<section className="tests">
				<h2>Senaste tester</h2>
				<div className="test_buttons">
					{test_buttons.map(({ id, title, navigation }) => {
						return (
							<Link to={navigation} key={id}>
								<button className="dashboard__button">{title}</button>
							</Link>
						)
					})}
				</div>
			</section>
			
				<section className="playerInfo">
					<img className="playerPicture" src={icon} alt="icon" />
					<div className="info">
						<p>Coach</p>
						<p>Tel.nr.</p>
						<p>Mail</p>
						<p>Ålder</p>
						<p>Pers.nr.</p>
						<p>Adress</p>
						<p>Antal tester</p>
						<p>Senaste testet</p>
						<p>Sport</p>
					</div>
					<h2 className="playerName">John Doe</h2>
				</section>
			<div className="side_buttons">
				{side_buttons.map(({ id, title, navigation }) => {
					return (
						<Link to={navigation} key={id}>
							<button className="dashboard__button">{title}</button>
						</Link>
					)
				})}
			<button className="logout" onClick={handleSignOut}>
				Logga ut
			</button>
			</div>
			</section>
			<Footer />
		</div>
	)
}

export default LoginDashboard;
