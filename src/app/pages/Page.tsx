import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@shared/components/layouts/Footer';
import { Header } from '@shared/components/layouts/Header';
import { ModalComponent } from '@shared/components/Modal';

const Page = () => {
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

export default Page;
