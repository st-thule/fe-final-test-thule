import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  const token = '';
  return !!token;
};

export const PrivateRoute = ({ component: Wrapped }) => {
  return isAuthenticated() ? <Wrapped /> : <Navigate to="/auth/login" />;
};
