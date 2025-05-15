import React from 'react';

import { Button } from '@shared/components/partials';

import avatar from '@assets/icons/avatar.svg';

const Profile = () => {
  return (
    <div className="page page-profile">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <section className="section section-info">
            <div className="section-image">
              <img className="img avatar" src={avatar} />
            </div>
            <div className="section-content">
              <div className="section-text">
                <h1 className="section-title">Lê Anh Thư</h1>
                <p className="section-subtitle">thule210903@gmail.com</p>
              </div>
              <Button label="Edit" className="btn btn-primary" />
            </div>
          </section>
          <div className=""></div>
          <section className="section section-list section-post">
            <div className="section-header">
              <h2 className="section-title">My Article</h2>
              <ul className="list list-posts"></ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
