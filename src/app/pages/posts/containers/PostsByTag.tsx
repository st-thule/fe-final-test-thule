import React from 'react';

const PostsByTag = () => {
  return (
    <div className="page page-tags">
      <div className="container">
        <section className="section section-list section-tag">
          <div className="section-header">
            <h1 className="section-title">React</h1>
            <p className="section-desc">
              A popular JavaScript library for building user interfaces using a
              component-based architecture.
            </p>
          </div>
          <div className="line"></div>
          <ul className="list list-posts"></ul>
        </section>
      </div>
    </div>
  );
};

export default PostsByTag;
