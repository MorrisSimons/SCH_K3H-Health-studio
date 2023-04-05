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
			navigation: "/see_data",
		},
	]

	const load_more = [
		{
			id: 1,
			title: "Ladda fler tester",
			navigation: "/load_more_tests",
		}
	]

	const test_buttons = [
		{
			id: 1,
			title: "Test 1",
			navigation: "/test1",
		},
		{
			id: 2,
			title: "Test 2",
			navigation: "/test2",
		},
		{
			id: 3,
			title: "Test 3",
			navigation: "/test3",
		},
		{
			id: 4,
			title: "Test 4",
			navigation: "/test4",
		},
		{
			id: 5,
			title: "Test 5",
			navigation: "/test5",
		},
		{
			id: 6,
			title: "Test 6",
			navigation: "/test6",
		},
		{
			id: 7,
			title: "Test 7",
			navigation: "/test7",
		}
	]

	return (
		<section className="dashboard__section_player">
			<Header />
			<h1 className="title">Player Dashboard</h1>
				<div className="main_layout">
					<div className="playerInfo">
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
					</div>
					<div className="tests">
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
						<div className="load_button">
							{load_more.map(({ id, title, navigation }) => {
								return (
									<Link to={navigation} key={id}>
										<button className="dashboard__button">{title}</button>
									</Link>
								)
							})}
						</div>
					</div>
					<div className="side_buttons">
						{side_buttons.map(({ id, title, navigation }) => {
							return (
								<Link to={navigation} key={id}>
									<button className="dashboard__button">{title}</button>
								</Link>
							)
						})}
						<button className="dashboard__button" onClick={handleSignOut}>
							Logga ut
						</button>
					</div>
				</div>
			<Footer />
		</section>
	)
}

export default LoginDashboard;
