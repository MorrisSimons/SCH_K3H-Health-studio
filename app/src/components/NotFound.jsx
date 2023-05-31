import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'
import image404 from '../images/404.webp'
import Header from './Header'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  }, [navigate])
  return (
    <div>
      <Header />
      <div className='container'>
        <img src={image404} alt='not found page img' className='container__image' />
      </div>
      <p> Redirecting you to the home page... </p>
    </div>
  )
}

export default NotFound
