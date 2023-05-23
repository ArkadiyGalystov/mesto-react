import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <div className='header'>
      <header className='header'>
        <img className='header__logo' src={logo} alt='логотип' />
      </header>
    </div>
  );
}

export { Header };
