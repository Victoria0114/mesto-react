import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from "../utils/Api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({
    name: " ",
    about: " ",
    avatar: " ",
    _id: " ",
  });
  const [cards, setCards] = useState([]);

  

  const updateUser = () => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api  
    .getCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    updateUser();
  }, []);
  

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
      .deleteLike(card.cardId)
      .then((data) => {
        setCards((state) =>
          state.map((c) => (c._id === card.cardId ? data : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      api
      .putLike(card.cardId)
      .then((data) => {
        setCards((state) =>
          state.map((item) => (item._id === card.cardId ? data : item))
        );
      })
      .catch((error) => {
        console.log(error);
      });
    }
    // api
    //   .changeLikeCardStatus(card._id, !isLiked)
    //   .then((newCard) => {
    //     setCards((state) => 
    //       state.map((c) => c._id === card._id ? newCard : c));})
    //   .catch((error) => {
    //     console.log(error);
    // });
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card.cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.cardId));
      })
      .catch((error) => {
        console.log(error);
    });
  }
  const handleUpdateUser = (user) => {
    api
      .patchUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (avatar) => {
    api
    .patchAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
    })
    .then(() => closeAllPopups())
    .catch((error) => console.log(error));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer/>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>
        </CurrentUserContext.Provider>
      </div>  
    </div>
  );
}
export default App;