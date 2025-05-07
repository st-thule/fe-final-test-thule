import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth-page">
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
