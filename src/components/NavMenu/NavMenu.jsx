import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './NavMenu.module.css';

const NavMenu = ({ isInverse }) => {
  return (
    <nav className={css.nav}>
      <ul className={css.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(css.navLink, isActive && css.active, isInverse && css.inverseNavLink)
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recipe/add"
            className={({ isActive }) =>
              clsx(css.navLink, isActive && css.active, isInverse && css.inverseNavLink)
            }
          >
            Add recipe
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;