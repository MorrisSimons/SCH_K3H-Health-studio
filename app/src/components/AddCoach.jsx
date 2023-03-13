import React from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import "./AddCoach.css"
import K3H2 from "../images/K3H2.png"
import { useRef } from 'react';
import emailjs from 'emailjs-com'

function Home() {
    const form = useRef();
    console.log(form)
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_divma7g', 'template_t58vfk7', form.current, 'pqvac3rZUj_3LVggq')
  
      e.target.reset()
    };
	return (
		<div>
			<Header />
			<section className="home_section">
			<div className="add_coach_box">
            <img className="homeLogo" src={K3H2} alt="K3H2" />
                <form className="form_add_coach" ref={form} onSubmit={sendEmail}>
                
				<h1>Health Studio Login</h1>
				<h5>Good health starts with you</h5>
                <input type="email" name="mailto" className="input_box" placeholder='Email' required/>
                <input type="text" name="FirstName" className="input_box" placeholder='Förnamn' required/>
                <input type="text" name="LastName" className="input_box" placeholder='Efternamn' required/>
                <input type="text" name="LagNamn" className="input_box" placeholder='Lagnamn' required/>
                <button type="submit" className='submit_button'>Skicka inbjudan</button>
                <Link to="/"><button className="cancel_button">Gå tillbaka</button></Link>
                </form>
                </div>
                </section>
                <Footer />
        </div>
	)
}

export default Home
