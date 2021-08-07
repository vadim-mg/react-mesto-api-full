import { useState, useEffect } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Header from './Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Login from './Login'
import Register from './Register'
import Popup from '../components/Popup'
import PopupWithForm from './PopupWithForm'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import auth from '../utils/auth'
import InfoTooltip from "./InfoTooltip"


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isShouldBeRemovedCardID, setIsShouldBeRemovedCardID] = useState(false)
  const [userEmail, setUserEmail] = useState(' ')
  const history = useHistory()
  const [infoTooltip, setInfoTooltip] = useState(null)

  useEffect(() => {
    return api.loadUserInfo()
      .then(result => {
        if (result) {
          setCurrentUser(result)
          setUserEmail(result.email)
          return Promise.resolve('Profile Loaded')
        }
      })
      .then(r => {
        return api.getCardList()
          .then(result => {
            setCards(result)
            history.push('/')
          })
          .catch(err => console.error(err))
      })
      .catch(err => {
        setUserEmail('')
        setCurrentUser(null)
        setCards([])
        history.push('/sign-in')
      })
  }, [history, userEmail])


  const handleAvatarEditButtonClick = () => setIsEditAvatarPopupOpen(true)
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)
  const handleCardClick = card => setSelectedCard(card)
  const handleDeleteCardClick = cardId => setIsShouldBeRemovedCardID(cardId)

  // Если ошибка автризации (401), то выполняем редирект на страницук авторизации
  const errorHandlerWithRedirect = err => {
    if (err.status === 401) {
      closeAllPopups()
      // history.push('/sign-in')
      handleSignOut()
      showErrorInfoTooltip(JSON.stringify({ message: "Необходима авторизация!" }))
    }
    return Promise.reject(err)
    // есть catch в самом конце запроса в universalForm
  }

  const handleUpdateUser = (...userData) =>
    api.setUserInfo(...userData)
      .then(value => {
        setCurrentUser(value)
        closeAllPopups()
      })
      .then(result => Promise.resolve('Profile saved'))
      .catch(err => errorHandlerWithRedirect(err))


  const handleUpdateAvatar = avatar =>
    api.setAvatar(avatar)
      .then(value => {
        setCurrentUser(value)
        closeAllPopups()
      })
      .then(result => Promise.resolve('Avatar saved'))
      .catch(err => errorHandlerWithRedirect(err))


  const handleAddPlace = place =>
    api.saveCard(place)
      .then(createdCard => {
        setCards([createdCard, ...cards])
        closeAllPopups()
      })
      .then(result => Promise.resolve('Card added'))
      .catch(err => errorHandlerWithRedirect(err))


  const closeAllPopups = () => {
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false)
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false)
    if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false)
    if (selectedCard) setSelectedCard(null)
    if (isShouldBeRemovedCardID) setIsShouldBeRemovedCardID(false)
  }


  const handleCardLike = (card, isLikedByCurrentUser) =>
    api.changeLikeCardStatus(card._id, !isLikedByCurrentUser)
      .then(changedCard => setCards(cards => cards.map(i =>
        i._id === card._id ? changedCard : i)))
      .catch(err => errorHandlerWithRedirect(err))


  const handleCardDelete = card =>
    api.deleteCard(isShouldBeRemovedCardID)
      .then(result => {
        setCards(cards.filter(item => item._id !== isShouldBeRemovedCardID))
        closeAllPopups()
      })
      .then(result => Promise.resolve('Card deleted'))
      .catch(err => errorHandlerWithRedirect(err))


  const showErrorInfoTooltip = err => {
    let errorMessage = JSON.parse(err)
    errorMessage = errorMessage.error || errorMessage.message || 'Что-то пошло не так'
    setInfoTooltip({
      'class': 'popup__tooltip-image_error',
      'text': (<> {errorMessage}!<br /> Попробуйте ешё раз.</>),
      'handleClose': e => setInfoTooltip(null)
    })
    return Promise.reject(err)
  }


  const handleSignUp = ({ email, password }) => auth.signUp(email, password)
    .then(result => {
      setInfoTooltip({
        'class': 'popup__tooltip-image_successfull',
        'text': (<>Вы успешно<br />зарегистрировались!</>),
        'handleClose': e => {
          setInfoTooltip(null)
          history.push('/sign-in')
        }
      })
      return Promise.resolve('Регистрация прошла. Уведомление показано.')
    })
    .catch(err => showErrorInfoTooltip(err))


  const handleSignIn = ({ email, password }) => auth.signIn(email, password)
    .then(result => {
      setUserEmail(email)
      return Promise.resolve(() => history.push('/'))
    })
    .catch(err => showErrorInfoTooltip(err))


  const handleSignOut = () => {
    auth.signOut()
      .then(result => {
        setUserEmail('')
        setCurrentUser(null)
        setCards([])
        history.push('/sign-in')
      })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App" >
        <Header userEmail={userEmail} onLogout={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            userEmail={userEmail}
            component={Main}
            handleProfileEditButtonClick={handleEditProfileClick}
            handleAddPlaceButtonClick={handleAddPlaceClick}
            handleAvatarEditButtonClick={handleAvatarEditButtonClick}
            handleCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />
          <Route path="/sign-up">
            <Register onSignUp={handleSignUp} />
          </Route>
          <Route path="/sign-in">
            <Login onSignIn={handleSignIn} />
          </Route>
          <Route>
            {userEmail !== '' ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <Popup isOpen={selectedCard} name="view">
          <div className="popup__container popup__container_xl">
            <button className="popup__close-button" type="button" aria-label="close_popup" onClick={closeAllPopups}></button>
            <figure className="popup__picture">
              <img src={selectedCard?.link} className="popup__picture-image" alt={selectedCard?.name} />
              <figcaption className="popup__picture-name">{selectedCard?.name}</figcaption>
            </figure>
          </div>
        </Popup>

        <PopupWithForm isOpen={isShouldBeRemovedCardID} name="delete" onSubmit={handleCardDelete} caption="Вы уверены?" buttonText="Да" onClose={closeAllPopups} buttonLoadingText="Удаление..." submitButtomState="true" />

        <Popup isOpen={infoTooltip} name="infoTooltip" >
          <InfoTooltip iconClass={infoTooltip?.class} text={infoTooltip?.text} onClose={infoTooltip?.handleClose} />
        </Popup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App
