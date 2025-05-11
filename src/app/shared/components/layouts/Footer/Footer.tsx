import React from 'react';
import { Link } from 'react-router-dom';

import { footerList } from './footerList';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="wrapper wrapper-flex">
          <h2 className="logo">
            <Link to="/">
              <img src="/assets/images/logo.png" />
            </Link>
          </h2>
          <nav className="nav nav-footer">
            <ul className="list list-legal">
              {footerList.map((item) => (
                <li className="list-item" key={item.id}>
                  <Link className="list-link" to={item.href}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
