import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../partials/Button';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="wrapper">
          <h1 className="logo">
            <Link to="/">
              <img src="/assets/images/logo.png" />
            </Link>
          </h1>
          <div className="header-action">
            <Button className="btn btn-primary" label="Login" />
          </div>
        </div>
      </div>
    </header>
  );
};
