import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { USER_KEY } from '@app/core/constants/contants';
import { authStorage } from '@app/core/services/auth-storage.service';
import { Button } from '../partials/Button';
import { getDataFromLocalStorage } from '@app/core/helpers/storage.helper';
import { User } from '@shared/models/user';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = getDataFromLocalStorage(USER_KEY, {});

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
              <p></p>
            ) : (
              <Link to={AppRoutes.LOGIN}>
                <Button className="btn btn-primary" label="Login" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
