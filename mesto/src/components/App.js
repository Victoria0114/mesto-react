import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});

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
    setSelectedCard(card);
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
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer/>
        <PopupWithForm
          name="edit"
          buttonText="Сохранить"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            className="popup__edit-form popup__edit-form_input_name" 
            id="name-input" 
            name="name" 
            type="text" 
            placeholders="Имя" 
            minLength={2} 
            maxLength={40}
            // defaultValue 
            required
          />
          <span className="popup__span popup__span_error_visible name-input-error"></span>
          <input 
            className="popup__edit-form popup__edit-form_input_about " 
            id="about-input" 
            name="about" 
            type="text" 
            placeholders="О себе"  
            minLength={2} 
            maxLength={200}
            // defaultValue 
            required
          />
          <span className="popup__span popup__span_error_visible about-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="new-place"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            className="popup__edit-form popup__edit-form_input_place-name" 
            id="place-input" 
            name="name" 
            type="text" 
            placeholder="Название" 
            minLength={2} 
            maxLength={30} 
            // defaultValue 
            required
          />
          <span className="popup__span popup__span_error_visible place-input-error"></span>
          <input 
            className="popup__edit-form popup__edit-form_input_link" 
            id="link-input" 
            name="link" 
            type="url" 
            placeholder="Ссылка на картинку" 
            // defaultValue 
            required
          />
          <span className="popup__span popup__span_error_visible link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          buttonText="Сохранить"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input 
              className="popup__edit-form popup__edit-form_input_avatar" 
              id="avatar-input" 
              name="avatar" 
              type="url" 
              placeholder="Ссылка на картинку" 
              required
          />
          <span className="popup__span popup__span_error_visible avatar-input-error"></span>
        </PopupWithForm>

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
      </div>
    </div>
  );
}
export default App;