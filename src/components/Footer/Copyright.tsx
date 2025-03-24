import React from 'react';
import css from './Footer.module.css';

const currentYear = new Date().getFullYear();

const Copyright = () => {
  return (
    <p className={css.footerText}>
      @{currentYear}, Foodies. All rights reserved
    </p>
  );
};

export default Copyright;
