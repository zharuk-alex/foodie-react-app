import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '../Logo/Logo';
import css from './Header.module.css';
import NavMenu from '../NavMenu/NavMenu';

const Header = () => {
  const location = useLocation();
  const isInverse = location.pathname === '/';

  return (
    <header>
      <div className={css.headerContainer}>
        <div
          className={clsx(css.header, isInverse)}
        >
          <Logo />
          <NavMenu isInverse={isInverse} />
        </div>
      </div>
    </header>
  );
};

export default Header;
