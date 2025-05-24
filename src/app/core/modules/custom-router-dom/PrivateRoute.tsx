import React from 'react';
import { Navigate } from 'react-router-dom';

import { authStorage } from '@app/core/services/auth-storage.service';
import { AppRoutes } from '@app/core/constants/app-routes';
import { useAppSelector } from '@app/store/hook/useAppSelector';

// checked logged in, if not logged in, navigate to auth
export const PrivateRoute = ({
  component: Wrapped,
}: {
  component: React.ComponentType;
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const token = authStorage.getToken();
  return token && user ? (
    <Wrapped />
  ) : (
    <Navigate to={`${AppRoutes.AUTH}/${AppRoutes.LOGIN}`} replace />
  );
};
