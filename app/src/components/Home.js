import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Login from '../login_function/Login'
import './Home.css'
import K3H2 from '../images/K3H2.png'

function Home () {
  return (
    <div>
      <Header />
      <section className='home_section'>
        <div className='login_box'>
          <img className='homeLogo' src={K3H2} alt='K3H2' />
          <h1>Health Studio Login</h1>
          <h5>Good health starts with you</h5>
          <div className='login_box_google'>
            <Login />
          </div>
          <Link to='/About'><button className='about_us_button'>About us</button></Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
