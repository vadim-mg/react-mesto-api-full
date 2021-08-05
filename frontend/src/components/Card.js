import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const { onCardClick, onCardLike, onCardDelete, card } = props;
  const currentUser = useContext(CurrentUserContext)

  const isLikedByCurrentUser = currentUser && card && card.likes &&
    card.likes.some(cardLikeProps => cardLikeProps._id === currentUser._id)
  const cardLikeButtonClassName = `element__like ${isLikedByCurrentUser ? 'element__like_active' : ''}`

  const handleCardClick = () => onCardClick(card)
  const handleLikeClick = () => onCardLike(card, isLikedByCurrentUser)
  const handleCardDelete = () => onCardDelete(card._id)

  return (
    <figure className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
      {
        card.owner._id === currentUser._id &&
        <button className="element__bin" type="button" aria-label="bin" onClick={handleCardDelete}></button>
      }
      <figcaption className="element__caption">
        <h2 className="element__text">{card.name}</h2>
        <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}></button>
        <span className="element__like-count">{card.likes.length}</span>
      </figcaption>
    </figure>
  )
}

export default Card
