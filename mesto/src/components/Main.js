import React, { useEffect, useState } from 'react';
import { api } from "../utils/Api";
import Card from "./Card";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api
          .getUserInfo()
          .then((profileUserInfo) => {
            setUserName(profileUserInfo.name);
            setUserDescription(profileUserInfo.about);
            setUserAvatar(profileUserInfo.avatar);
          })
          .catch((error) => console.log(error));
        api  
          .getCards()
          .then((cards) => {
            setCards(cards);
          })
          .catch((error) => console.log(error));
    }, []);

  return (
    <main className="content">
      <section className="profile">
        <button 
          className="profile__avatar-button" 
          type="button"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userName}</h1>
            <button 
              className="profile__edit-button"
              type="button" 
              onClick={onEditProfile}
              aria-label="Добавить"
            ></button>
          </div>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button 
          className="profile__add-button" 
          type="button" 
          onClick={onAddPlace}
          aria-label="Добавить"
        ></button>
      </section>
      <div className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
}

export default Main;