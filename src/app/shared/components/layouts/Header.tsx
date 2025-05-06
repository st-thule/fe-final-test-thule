import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="wrapper">
          <h2 className="logo">
            <Link to="">
              <img src="/assets/images/logo.png" />
            </Link>
          </h2>
          <div className="header-action">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
};
