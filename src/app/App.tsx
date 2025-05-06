import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import appRoutes from './app.routes';

const App = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
