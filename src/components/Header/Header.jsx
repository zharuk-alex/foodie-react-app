import React from 'react';
import Logo from '../Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import css from './Header.module.css';
import { Container } from '../UI/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LoginModal from 'components/LoginModal/LoginModal.jsx';
import { setModalLoginOpen } from 'store/modal/operations';

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { isLoginModalOpen } = useSelector(state => state.modal);

  const handleLoginModalClose = () => {
    dispatch(setModalLoginOpen(false));
  };

  return (
    <header className={className}>
      <Container className={css.header} dataTheme={['/'].includes(pathname) ? 'dark' : ''}>
        <Logo />
        <NavMenu />
        {isLoggedIn ? <UserBar /> : <AuthBar />}
        {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
      </Container>
    </header>
  );
};

export default Header;
