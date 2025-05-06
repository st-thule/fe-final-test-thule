import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from '@app/shared/components/NavBar';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h2 className="logo">
          <Link to="">
            <img src="/assets/images/logo.png" />
          </Link>
        </h2>
        <Navbar />
        <div className="header-action">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </header>
  );
};
