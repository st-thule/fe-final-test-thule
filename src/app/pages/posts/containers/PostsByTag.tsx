import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { getPostsByTagThunk } from '@app/store/post/thunk/postThunk';
import { PostListPagination } from '@shared/components/PostListPagination';
import { optionTags } from '@shared/constants/options';

const SIZE_PAGE = 8;

const PostsByTag = () => {
  const { tag } = useParams<{ tag: string }>();
  const postListRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
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
      setSearchParams({ page: page.toString() });
      postListRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [setSearchParams]
  );

  const { posts, loading, error } = useAppSelector((state) => ({
    posts: state.post?.posts,
    loading: state.post?.loading.fetch,
    error: state.post?.error.fetch,
  }));

  useEffect(() => {
    dispatch(
      getPostsByTagThunk({ tagName: tag, page: currentPage, size: SIZE_PAGE })
    );
  }, [tag, currentPage, dispatch]);

  return (
    <div className="page page-tags">
      <div className="container">
        <section className="section section-list section-tag" ref={postListRef}>
          <div className="section-header">
            <h1 className="section-title">{tag}</h1>
            {optionTags.map((option) => {
              if (option.label === tag) {
                return <p className="section-desc">{option.description}</p>;
              }
            })}
          </div>
          <div className="line"></div>
          <PostListPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            postResponse={posts}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </div>
  );
};

export default PostsByTag;
