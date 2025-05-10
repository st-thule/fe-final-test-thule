import React, { useState } from 'react';

import { Tag } from '@shared/components/TagComponent';
import { PostList } from './PostList';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="page page-home">
      <div className="container">
        <section className="section section-banner">
          <div className="section-content">
            <h2 className="section-title">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </h2>
          </div>
        </section>
        <section className="section section-list section-tags">
          <div className="section-header">
            <h2 className="section-title">Our tags</h2>
            <p className="section-subtitle">
              Ideas, trends, and inspiration for a brighter future
            </p>
          </div>
          <ul className="list-tags">
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
          <PostList currentPage={currentPage} onPageChange={handlePageChange} />
        </section>
      </div>
    </div>
  );
};

export default Home;
