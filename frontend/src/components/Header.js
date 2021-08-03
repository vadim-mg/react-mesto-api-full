import logo from '../images/logo/logo.svg'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header(props) {
  const { userEmail, onLogout } = props
  const [headerLink, setHeaderLink] = useState({
    'link': 'sign-in',
    'name': 'Войти'
  })
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [buttonClass, setButtonClass] = useState('');
  const [menuClass, setMenuClass] = useState('')
  const handleMenuButtonclick = e => setIsMenuOpened(!isMenuOpened)
  const location = useLocation();

  useEffect(() => {
    setMenuClass('header__nav ' + (isMenuOpened ? ' header__nav_opened' : ''))
    setButtonClass('header__button header__button_' + (isMenuOpened ? 'close' : 'menu'))
  }, [isMenuOpened])

  useEffect(() => {
    switch (location.pathname) {
      case "/sign-in":
        setHeaderLink({
          'link': 'sign-up',
          'name': 'Регистрация'
        })
        break
      default:
        setHeaderLink({
          'link': 'sign-in',
          'name': 'Войти'
        })
        break
    }
  }, [location])

  return (
    <header className="header container">
      {userEmail !== ''
        ? <nav className={menuClass}>
          <a href={`mailto:${userEmail}`} className="header__nav-link header__nav-link_email">{userEmail}</a>
          <Link to="/sign-in" className="header__nav-link" target="_self" onClick={onLogout}>Выйти</Link>
        </nav>
        : ''}

      <div className="header__place">
        <Link to="/" className="header__link" target="_self" >
          <img src={logo} className="header__logo" alt="логотип: Mesto - Russia" />
        </Link>
        {(userEmail !== ''
          ? <button className={buttonClass} onClick={handleMenuButtonclick}></button>
          : <Link to={headerLink.link} className="header__link">{headerLink.name} </Link>)}
      </div>
    </header>
  )
}

export default Header
