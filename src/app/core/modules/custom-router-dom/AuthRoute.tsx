import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { authStorage } from '@app/core/services/auth-storage.service';

export const AuthRoute = ({
  component: Wrapper,
}: {
  component: React.ComponentType;
}) => {
  const token = authStorage.getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(AppRoutes.HOME);
    }
  }, [token, navigate]);

  return !token ? <Wrapper /> : null;
};
