import Logo from '../Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import css from './Header.module.css';
import { Btn, Container, Icon } from '../UI/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LoginModal from 'components/LoginModal/LoginModal.jsx';
import { setModalLoginOpen } from 'store/modal/operations';
import { useEffect, useState } from 'react';

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { isLoginModalOpen } = useSelector(state => state.modal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isMobileMenuOpen) {
      html.classList.add(css.noScroll);
      body.classList.add(css.noScroll);
    } else {
      html.classList.remove(css.noScroll);
      body.classList.remove(css.noScroll);
    }

    return () => {
      html.classList.remove(css.noScroll);
      body.classList.remove(css.noScroll);
    };
  }, [isMobileMenuOpen]);

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLoginModalClose = () => {
    dispatch(setModalLoginOpen(false));
  };

  return (
    <header className={className}>
      <Container className={css.header} dataTheme={['/'].includes(pathname) ? 'dark' : ''}>
        {isMobileMenuOpen && <div className={css.overlay} onClick={closeMenu} />}
        <div id="menuContainer" className={isMobileMenuOpen ? css.menuContainerMobile : css.menuContainer}>
          {isMobileMenuOpen && (
            <Btn variant="clear" className={css.menuClose} aria-label="Close menu" onClick={closeMenu}>
              <Icon name="icon-close" className={css.closeIcon} />
            </Btn>
          )}
          <Logo className={isMobileMenuOpen ? css.logoMenu : ''} />
          <NavMenu variant={isMobileMenuOpen ? 'navMenu' : 'nav'} />
          {!isMobileMenuOpen && (
            <div className={css.menuAndUser}>
              {isLoggedIn ? <UserBar /> : <AuthBar />}
              <Btn variant="clear" className={css.menuOpen} aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu" aria-label="Open menu" onClick={openMenu}>
                <Icon name="icon-burger-menu" className={css.burgerIcon} />
              </Btn>
            </div>
          )}
        </div>
        {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
      </Container>
    </header>
  );
};

export default Header;
