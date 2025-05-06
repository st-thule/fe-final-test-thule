import React from 'react';

import { navItems } from '@app/core/constants/nav';

export const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="list-menus">
        {navItems.map((nav) => (
          <li className="list-item">
            <a className="menu" href={nav.href}>
              {nav.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
