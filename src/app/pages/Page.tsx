import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@shared/components/layouts/Footer/Footer';
import { Header } from '@shared/components/layouts/Header';
import { ModalComponent } from '@shared/components/Modal';

export const Page = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <ModalComponent />
    </>
  );
};
