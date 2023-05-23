import React from 'react';
import '../index.css';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
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
        <button
          className='card__trash'
          type='button'
          aria-label='Значок удаления карточки'
        />
      </div>
      <div className='card__description'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            className='card__like'
            type='button'
            aria-label='Значок лайк'
          />
          <span className='card__like-number'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export { Card };
