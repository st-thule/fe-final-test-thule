import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import '../stylesheet/styles.scss';
import appRoutes from './app.routes';
import AppErrorBoundaryFallback from './AppErrorBoundaryFallback';
import AppSuspense from './AppSuspense';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';
import { ToastContainer } from 'react-toastify';

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
  <>
    {' '}
    <RouterProvider router={router} />{' '}
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);
