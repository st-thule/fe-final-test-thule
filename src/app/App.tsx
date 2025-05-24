import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '../stylesheet/styles.scss';
import appRoutes from './app.routes';
import AppErrorBoundaryFallback from './AppErrorBoundaryFallback';
import AppSuspense from './AppSuspense';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';
import { authStorage } from './core/services/auth-storage.service';
import { store } from './store';
import { validateAuthTokenThunk } from './store/auth/thunk/authThunk';
import { useAppDispatch } from './store/hook/useAppDispatch';

export const Root = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      dispatch(validateAuthTokenThunk());
    }
  }, [dispatch]);

  return (
    <ErrorBoundary FallbackComponent={AppErrorBoundaryFallback}>
      <AppSuspense>
        <Outlet />
      </AppSuspense>
    </ErrorBoundary>
  );
};

const router = createBrowserRouter([
  { path: '/', Component: Root, children: renderChildren(appRoutes) },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer position="top-center" autoClose={1000} />
  </>
);
