import React, { useEffect, useState } from 'react';
import '../index.css';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';

import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false); // состояния загрузки во время ожидания ответа от сервера
  const [currentUser, setCurrentUser] = useState({}); // данные пользователя из апи
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([currentUser, initialCards]) => {
        setCurrentUser(currentUser);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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

  function handleDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // обработчик лайка на карточках
  function handleCardLike(card) {
    // проверка лайка
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );
    api.toggleLikeCard(
      card._id,
      !isLiked
    )
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // редактирование аватара пользователя
  function handleUpdateAvatar(inputValues) {
    function makeRequest() {
      return api.editUserAvatar(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // редактирование данных пользователя
  function handleUpdateUser(inputValues) {
    function makeRequest() {
      return api.editUserInfo(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // добавление новой карточки
  function handleAddPlaceSubmit(inputValues) {
    function makeRequest() {
      return api.addCards(inputValues).then((newCard) => {
        setCards([newCard, ...cards,]);
      })
    }
    handleSubmit(makeRequest)
  }

  // принимает функцию запроса
  function handleSubmit(request) {// изменяем текст кнопки до вызова

    setIsLoading(true);
    request()
      .then((closeAllPopups) => request(closeAllPopups))
      //.then(closeAllPopups) // ловим ошибку
      .catch((err) => console.log(err)) // используется для логирования ошибок
      .finally(() => setIsLoading(false)); // возвращаем обратно начальный текст кнопки
  }

  // удаление карточки
  function handleCardDelete(card) {
    function makeRequest() {
      return api.removeCardApi(card._id).then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
    }
    handleSubmit(makeRequest);
  }

  // закрытие popup`of
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setDeletedCard({});
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick} // аватар
          onEditProfile={handleEditProfileClick} // профиль
          onAddPlace={handleAddPlaceClick} // новая карта
          onCardClick={handleCardClick} // слайдер
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          onConfirmDelete={handleDeleteClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          card={deletedCard}
          onSubmit={handleCardDelete}
          onLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
