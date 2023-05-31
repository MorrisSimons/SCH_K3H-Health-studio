import React from 'react'
import Header from './Header'
import Footer from './Footer'
import icon from '../images/icon.png'
import './LoginDashboard_p.css'
import { Link } from 'react-router-dom'
const API_PATH = process.env.REACT_APP_API_PATH

function LoginDashboard () {
  function handleSignOut () {
    localStorage.removeItem('user')
    window.location.reload()
  }

  const user = JSON.parse(localStorage.getItem('user'))
  console.log('user: ' + user)

  const sideButtons = [
    {
      id: 1,
      title: 'Se analys',
      navigation: '/see_analysis'
    },
    {
      id: 2,
      title: 'Se data',
      navigation: '/data'
    }
  ]

  const loadMore = [
    {
      id: 1,
      title: 'Ladda fler tester',
      navigation: '/loadMore_tests'
    }
  ]

  const testButtons = [
    {
      id: 1,
      title: 'Test 1',
      navigation: '/test1'
    },
    {
      id: 2,
      title: 'Test 2',
      navigation: '/test2'
    },
    {
      id: 3,
      title: 'Test 3',
      navigation: '/test3'
    },
    {
      id: 4,
      title: 'Test 4',
      navigation: '/test4'
    },
    {
      id: 5,
      title: 'Test 5',
      navigation: '/test5'
    },
    {
      id: 6,
      title: 'Test 6',
      navigation: '/test6'
    },
    {
      id: 7,
      title: 'Test 7',
      navigation: '/test7'
    }
  ]

  return (
    <section className='dashboard__section_player'>
      <Header />
      <h1 className='title'>Player Dashboard</h1>
      <div className='main_layout'>
        <div className='playerInfo'>
          <img className='playerPicture' src={icon} alt='icon' />
          <h2 className='playerName'>{user.given_name + ' ' + user.family_name}</h2>
          <div className='info'>
            <p>Coach:</p>
            <p>Tel.nr.:</p>
            <p>Mail:</p>
            <p>Ålder:</p>
            <p>Pers.nr.:</p>
            <p>Adress:</p>
            <p>Antal tester:</p>
            <p>Senaste testet:</p>
            <p>Sport:</p>
          </div>
        </div>
        <div className='tests'>
          <h2>Senaste tester</h2>
          <div className='testButtons_background'>
            <div className='testButtons'>
              {testButtons.map(({ id, title, navigation }) => {
                return (
                  <Link to={navigation} key={id}>
                    <button className='dashboard__button'>{title}</button>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='load_button'>
            {loadMore.map(({ id, title, navigation }) => {
              return (
                <Link to={navigation} key={id}>
                  <button className='dashboard__button'>{title}</button>
                </Link>
              )
            })}
          </div>
        </div>
        <div className='sideButtons'>
          {sideButtons.map(({ id, title, navigation }) => {
            return (
              <Link to={navigation} key={id}>
                <button className='dashboard__button'>{title}</button>
              </Link>
            )
          })}
          <button className='dashboard__button' onClick={handleSignOut}>
            Logga ut
          </button>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default LoginDashboard
