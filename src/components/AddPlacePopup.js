import React, { useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  // инпуты и их данные
  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditlink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  // обнуление инпутов
  useEffect(() => {
    setLink('');
    setName('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='popup-add'
      title='Новое место'
      text={onLoading? 'Создаем...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__input-container'>
        <input
          type='text'
          name='name'
          id='cardname-input'
          className='form__item form__item_image_name'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          required
          value={name}
          onChange={handleEditName}
        />
        <span className='form__item-error cardname-input-error' />
        <input
          type='url'
          name='link'
          id='link-input'
          className='form__item form__item_image_link'
          placeholder='Ссылка на картинку'
          required
          value={link}
          onChange={handleEditlink}
        />
        <span className='form__item-error link-input-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export { AddPlacePopup };
