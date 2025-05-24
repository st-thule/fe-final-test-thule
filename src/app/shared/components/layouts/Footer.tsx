import React from 'react';
import { Link } from 'react-router-dom';

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
          <p className="">Blog template</p>
        </div>
      </div>
    </footer>
  );
};
