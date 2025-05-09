import React from 'react';
import { Outlet } from 'react-router-dom';

const Posts = () => {
  return (
    <div className="posts-page">
      <Outlet />
    </div>
  );
};

export default Posts;
