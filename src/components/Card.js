import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((i) => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardDeleteButtonClass = `card__trash ${isOwn && 'card__trash_active'}`; // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`; // Создаём переменную, которую после зададим в `className` для кнопки лайка

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className='card'>
      <div className='card__image'>
        <img
          className='card__pic'
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        {isOwn && (
          <button
            className={cardDeleteButtonClass}
            type='button'
            aria-label='Значок удаления карточки'
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <div className='card__description'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Значок лайк'
            onClick={handleLikeClick}
          />
          <span className='card__like-number'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export { Card };
