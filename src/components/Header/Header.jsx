import React from 'react';
import Logo from '../Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import css from './Header.module.css';
import {Container} from "../UI/index.js";
import { useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector(state => state.auth);
  return (
    <header>
      <Container className={css.header} dataTheme={['/'].includes(pathname) ? 'dark' : ''}>
        <Logo />
        <NavMenu />
        {isLoggedIn ? <UserBar /> : <AuthBar />}
      </Container>
    </header>
  );
};

export default Header;