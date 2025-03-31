import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../store/auth/operations';
import { Eye, EyeOff, X } from 'lucide-react';
import css from './SignupModal.module.css';

const SignUpModal = ({ onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await dispatch(registerThunk({ email, password })).unwrap();
      onClose();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className={css.signUpModal}>
      <form onSubmit={handleSubmit} className={css.signUpForm}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Sign Up</h2>

        <div className={css.inputFieldsWrapper}>
          <label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email*" className={css.inputField} required />
          </label>

          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className={css.inputField}
              required
            />
            <button type="button" className={css.eyeButton} onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={css.inputField}
              required
            />
          </label>
        </div>

        <button type="submit" className={css.signUpButton} disabled={isLoading || !email || !password || !confirmPassword}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {error && <div className={css.error}>{error}</div>}
        <button type="button" className={css.signupButton} onClick={onSwitchToLogin}>
          I already have an account? <span>Sign in</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
