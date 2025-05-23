import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { authStorage } from '@app/core/services/auth-storage.service';

// check logged in - if logged in, not navigate to auth page
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
