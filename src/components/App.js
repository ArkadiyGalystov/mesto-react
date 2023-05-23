import React from 'react';
import '../index.css';

import { useState } from 'react';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';

import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className='root'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick} // аватар
        onEditProfile={handleEditProfileClick} // профиль
        onAddPlace={handleAddPlaceClick} // новая карта
        onCardClick={handleCardClick} // слайдер
      />
      <Footer />
      
      <PopupWithForm // редактирование аватара
        name='popup-avatar'
        title='Обновить аватар'
        text='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className='form__input-container'>
          <input
            type='url'
            name='link'
            id='link-avatar-input'
            className='form__item form__item_avatar_link'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='form__item-error link-avatar-input-error' />
          
        </fieldset>
      </PopupWithForm>

      <PopupWithForm // форма редактирование профиля
        name='popup-profile'
        title='Редактировать профиль'
        text='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        
        <fieldset className='form__input-container'>
          <input // поле имя
            type='text'
            name='name'
            id='username-input'
            className='form__item form__item_user_name'
            placeholder='Имя'
            minLength={2}
            maxLength={40}
            required
          />
          <span className='form__item-error username-input-error' />

          <input // поле о себе
            type='text'
            name='about'
            id='about-input'
            className='form__item form__item_user_about'
            placeholder='О себе'
            minLength={2}
            maxLength={200}
            required
          />
          <span className='form__item-error about-input-error' />

        </fieldset>
      </PopupWithForm>

      <PopupWithForm // добавление карточки
        name='popup-add'
        title='Новое место'
        text='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className='form__input-container'>
          <input // название/описание картинки
            type='text'
            name='name'
            id='cardname-input'
            className='form__item form__item_image_name'
            placeholder='Название'
            minLength={2}
            maxLength={30}
            required
          />
          <span className='form__item-error cardname-input-error' />

          <input // ссылка на картинку
            type='url'
            name='link'
            id='link-input'
            className='form__item form__item_image_link'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='form__item-error link-input-error' />

        </fieldset>
      </PopupWithForm>

      <PopupWithForm // удаление карточки
      name='popup-delete' 
      title='Вы уверены?' 
      text='Да' />

      <ImagePopup // слайдер
      card={selectedCard} 
      onClose={closeAllPopups} />

    </div>
  );
}

export default App;