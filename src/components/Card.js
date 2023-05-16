import React from 'react';

function Card({ card, onCardClick }) {

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <article className="card">
        <button className="card__trashbin" type="button" aria-label="Удалить"></button>
            <img className="card__image" src={card?.link || ""} alt={card && card.name} onClick={handleCardClick}/>
            <div className="card__info">
                <h2 className="card__mesto">{card && card.name}</h2>
                <div className="card__like-container">
                    <button className="card__like" type="button" aria-label="Нравится"></button>
                    <span className="card__like-counter"></span>
                </div>
            </div>
    </article>
  );
}

export default Card;