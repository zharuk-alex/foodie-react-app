import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginModal from '../LoginModal/LoginModal';
import css from './AuthBar.module.css';
import { clsx } from 'clsx';
import Btn from '../UI/Btn/Btn';
import { setModalLoginOpen } from '../../store/modal/operations';

const AuthBar = () => {
  const dispatch = useDispatch();
  const { isLoginModalOpen } = useSelector(state => state.modal);

  const handleLoginModalOpen = () => {
    dispatch(setModalLoginOpen(true));
  };

  const handleLoginModalClose = () => {
    dispatch(setModalLoginOpen(false));
  };

  return (
    <div className={clsx('container', css.wrapper)}>
      <Btn variant="secondary" onClick={handleLoginModalOpen}>
        Sign In
      </Btn>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
    </div>
  );
};

export default AuthBar;
