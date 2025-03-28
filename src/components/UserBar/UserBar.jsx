import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginModal from '../LoginModal/LoginModal';
import css from './UserBar.module.css';
import { clsx } from 'clsx';
import Btn from '../UI/Btn/Btn';
import { logoutThunk } from '../../store/auth/operations';
import { setModalLoginOpen } from '../../store/modal/operations';

const UserBar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const { isLoginModalOpen } = useSelector(state => state.modal);

  const handleLoginModalClose = () => {
    dispatch(setModalLoginOpen(false));
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div className={clsx('container', css.wrapper)}>
      <>
        <p>{currentUser?.name || 'User'}</p>
        <Link to={`/user/${currentUser?.id}`} className={css.profileLink}>
          Profile
        </Link>
        <Btn variant="secondary" onClick={handleLogout}>
          Log Out
        </Btn>
      </>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
    </div>
  );
};

export default UserBar;
