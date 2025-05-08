import React from 'react';

import { Pagination } from '@shared/components/Pagination';
import { Post } from '@shared/components/Post';
import { Tag } from '@shared/components/TagComponent';

const Home = () => {
  return (
    <div className="page page-home">
      <div className="container">
        <section className="section section-banner">
          <h2 className="section-title"></h2>
          <div className="section-footer">
            <p className="section-subtitle"></p>
            <div className="section-info info">
              <img className="img info-img" />
              <p className="info-text"></p>
            </div>
          </div>
        </section>
        <section className="section section-list section-tags">
          <div className="section-header">
            <h2 className="section-title">Our tags</h2>
            <p className="section-subtitle">
              Ideas, trends, and inspiration for a brighter future
            </p>
          </div>
          <ul className="row">
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
          </ul>
        </section>
        <section className="section section-list section-posts">
          <div className="section-header">
            <h2 className="section-title">Latest posts</h2>
            <p className="section-subtitle">
              Discover how innovation and creativity drive meaningful change
            </p>
          </div>
          <ul className="row">
            <Post className={''} />
            <Post className={''} />
            <Post className={''} />
            <Post className={''} />
            <Post className={''} />
          </ul>
          <Pagination
            totalItems={0}
            itemsPerPage={0}
            currentPage={0}
            onPageChange={() => {}}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
