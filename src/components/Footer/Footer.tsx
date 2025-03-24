import React from 'react';
import Logo from '../Logo/Logo';

import Copyright from './Copyright';
import SocialLinks from './SocialLinks';

import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div>
        <div className={css.top}>
          <Logo />
          <SocialLinks />
        </div>
      </div>
      <hr className={css.divider} />
      <div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
