import { Footer } from '@shared/components/layouts/Footer/Footer';
import { Header } from '@shared/components/layouts/Header';
import React from 'react';

import { Outlet } from 'react-router-dom';

export const Page = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
