import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../store/auth/operations';
import css from './LoginModal.module.css';

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      onClose();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className={css.loginModal}>
      <form onSubmit={handleSubmit} className={css.loginForm}>
        <h2>Login</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
