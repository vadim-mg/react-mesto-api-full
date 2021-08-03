import { useContext } from 'react'
import Card from '../components/Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const {
    handleAvatarEditButtonClick,
    handleProfileEditButtonClick,
    handleAddPlaceButtonClick,
    handleCardClick,
    cards,
    onCardLike,
    onCardDelete
  } = props
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser?.avatar} alt={`Аватар пользователя: ${currentUser?.name}`} className={`profile__avatar ${!currentUser ? 'profile__avatar_invisible' : ''}`} />
          <button type="button" className="profile__avatar-edit-button" onClick={handleAvatarEditButtonClick}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button className="profile__edit-button profile__edit-button_hidden_temp" type="button"
            aria-label="edit_profile" onClick={handleProfileEditButtonClick}></button>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button className="profile__add-place-button" type="button" aria-label="add_profile" onClick={handleAddPlaceButtonClick}></button>
      </section>
      <section className="elements">
        {cards.map((element) => (
          <Card key={element._id} card={element} onCardClick={handleCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main
