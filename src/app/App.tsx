import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css';

import '../stylesheet/styles.scss';
import appRoutes from './app.routes';
import AppErrorBoundaryFallback from './AppErrorBoundaryFallback';
import AppSuspense from './AppSuspense';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from '@shared/contexts/auth.context';

export const Root = () => {
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

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer position="top-right" autoClose={3000} />
  </AuthProvider>
);
