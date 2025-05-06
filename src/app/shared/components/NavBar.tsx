import React from 'react';
import { Link } from 'react-router-dom';

import { navItems } from '@app/core/constants/nav';

export const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="list-menus">
        {navItems.map((nav) => (
          <li className="list-item">
            <Link className="menu" to={nav.href}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
