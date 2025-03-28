import React from 'react';
import Logo from 'components/Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import { useSelector } from 'react-redux';
import css from './Header.module.css';
import { clsx } from 'clsx';

const Header = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  return (
    <header className={css.header}>
      <div className={clsx('container', css.wrapper)}>
        <Logo className={css.logo} />
        <NavMenu></NavMenu>
        {isLoggedIn ? <UserBar></UserBar> : <AuthBar></AuthBar>}
      </div>
    </header>
  );
};

export default Header;
