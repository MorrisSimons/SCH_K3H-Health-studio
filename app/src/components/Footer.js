import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer () {
  return (
    <div>
      <div className='footerPhantom' />
      <div className='footer'>
        <div id='footerText' className='footerText'>
          <p>
            © 2023, HURSA|
            <Link to='/about'>About us</Link>|
            <Link to='/contact'>Contact us </Link>|
            <Link to='/policy'>Privacy policy </Link>|
            <Link to='/terms'>Terms of service </Link>|
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
