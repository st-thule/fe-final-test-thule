import React from 'react';
import { Navigate } from 'react-router-dom';

import { authStorage } from '@app/core/services/auth-storage.service';
import { AppRoutes } from '@app/core/constants/app-routes';

export const PrivateRoute = ({
  component: Wrapped,
}: {
  component: React.ComponentType;
}) => {
  const token = authStorage.getToken();
  return token ? (
    <Wrapped />
  ) : (
    <Navigate to={`${AppRoutes.AUTH}/${AppRoutes.LOGIN}`} replace />
  );
};
