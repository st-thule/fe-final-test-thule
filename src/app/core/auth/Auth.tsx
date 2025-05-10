import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="page page-auth">
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
