import React from 'react';
import { Navigate } from 'react-router-dom';

import { authStorage } from '@app/core/services/auth-storage.service';

const isAuthenticated = (): boolean => {
  const token = authStorage.getToken;
  return !!token;
};

export const PrivateRoute = ({ component: Wrapped }) => {
  return isAuthenticated() ? <Wrapped /> : <Navigate to="/auth/login" />;
};
