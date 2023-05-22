import React, { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id)

  // const cardLikeButtonClassName = ( 
  //   `card__like ${isLiked && 'card__like_active'}` 
  // );

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="card">
      {isOwn && <button className='card__trashbin' onClick={handleDeleteClick} />} 
            <img className="card__image" src={card?.link || ""} alt={card && card.name} onClick={handleCardClick}/>
            <div className="card__info">
                <h2 className="card__mesto">{card && card.name}</h2>
                <div className="card__like-container">
                    <button className={`card__like ${isLiked && 'card__like_active'}`} type="button" onClick={handleLikeClick} aria-label="Нравится"></button>
                    <span className="card__like-counter"></span>
                </div>
            </div>
    </article>
  );
}

export default Card;