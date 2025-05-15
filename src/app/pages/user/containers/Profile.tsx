import React from 'react';

import { Button } from '@shared/components/partials';

const Profile = () => {
  return (
    <div className="page page-profile">
      <section className="section section-info">
        <img className="img avatar" src="" />
        <div className="section-text">
          <h1 className="section-title"></h1>
          <p className="section-subtitle"></p>
        </div>
        <Button label="Edit" className="btn btn-primary" />
      </section>
      <section className="section section-list section-post">
        <div className="section-header">
          <h2 className="section-title">My Article</h2>
          <ul className="list list-posts"></ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;
