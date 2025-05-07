import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import { Provider } from 'react-redux';
import '../stylesheet/styles.scss';
import appRoutes from './app.routes';
import { store } from './store';

const App = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
