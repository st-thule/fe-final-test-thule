import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tag } from '@shared/components/TagComponent';
import { PostListPagination } from './PostListPagination';
import { optionTags } from '@shared/constants/options';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postListRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageFromUrl = searchParams.get('page');

    if (pageFromUrl) {
      setCurrentPage(Number(pageFromUrl));
    }
  }, [searchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setSearchParams({ page: page.toString(), size: '8' });
      postListRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [setSearchParams]
  );

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
            {optionTags.map((tag) => (
              <Tag key={tag.id} label={tag.label} />
            ))}
          </ul>
        </section>
        <section
          className="section section-list section-posts"
          ref={postListRef}
        >
          <div className="section-header">
            <h2 className="section-title">Latest posts</h2>
            <p className="section-subtitle">
              Discover how innovation and creativity drive meaningful change
            </p>
          </div>
          <PostListPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
