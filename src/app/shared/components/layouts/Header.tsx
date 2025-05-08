import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../partials/Button';
import { authStorage } from '@app/core/services/auth-storage.service';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = authStorage.getToken();
    setIsLoggedIn(!!token);
  }, []);

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
            {isLoggedIn ? (
              <Button className="btn btn-secondary" label="Logged" />
            ) : (
              <Link to="/login">
                <Button className="btn btn-primary" label="Login" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
