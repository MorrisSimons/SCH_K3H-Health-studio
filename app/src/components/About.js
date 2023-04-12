import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import "./About.css"

function About() {
	return (
		<div>
			<Header />
				<div className="textbox">
					<h1>About us</h1>
						<p1>
							We are a team of 7 highly motivated and skilled software developers from Blekinge Tekniska Högskola, passionate about crafting innovative software solutions to meet the needs of our clients. 
							Our team comprises individuals with diverse backgrounds and skill sets, enabling us to approach projects from different angles and provide unique perspectives on complex problems.
							Our team is committed to delivering high-quality software that meets the needs of our clients. 
							We understand that every project is unique and requires tailored solutions, which is why we work closely with our clients to ensure that we understand their requirements and develop software that meets their needs. 
							Our team is adept at working with a wide range of technologies, including front-end and back-end development and database design.
							At our core, we value teamwork and collaboration. 
							We believe that the best software is developed when team members work together, share ideas, and build upon each other's strengths. 
							This is why we have a rigorous process for code reviews and encourage frequent communication among team members.
							Our team has experience working on a range of software projects, and we take pride in our ability to tackle complex problems and develop solutions that exceed our clients' expectations.
							If you're looking for a team of dedicated software developers who can help bring your vision to life, look no further than our team. 
							Contact us today to learn more about our services and how we can help you achieve your goals.
						</p1>
				</div>
			{/*
			<p>{user.name}</p>*/}
			{/*<p>{user.email}</p>*/}
			{/* ... */}
			<Footer />
		</div>
	)
}

export default About
