import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Pagination } from '@shared/components/Pagination';
import { PostComponent } from '@shared/components/Post';
import { fetchPostsThunk } from '@app/store/post/thunk/postThunk';
import { RootState } from '@app/store';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';

const SIZE_PAGE = 8;

interface PostListPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PostListPagination: React.FC<PostListPaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const dispatch = useAppDispatch();

  const { posts, loading, error } = useSelector((state: RootState) => ({
    posts: state.post?.posts,
    loading: state.post?.loading.fetch,
    error: state.post?.error.fetch,
  }));

  useEffect(() => {
    dispatch(fetchPostsThunk({ page: currentPage, size: SIZE_PAGE }));
  }, [currentPage, dispatch]);

  return (
    <>
      <ul className="list list-posts row">
        {loading ? (
          Array.from({ length: SIZE_PAGE }).map((_, index) => (
            <PostComponent
              key={`skeleton-${index}`}
              className="col-12 col-sm-6 col-md-3"
              loading={true}
              post={undefined}
            />
          ))
        ) : posts?.data && posts.data.length > 0 ? (
          posts.data.map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              className="col-12 col-sm-6 col-md-3"
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>

      {!loading && posts?.data && posts.data.length > 0 && (
        <Pagination
          totalItems={posts.totalItems}
          itemsPerPage={SIZE_PAGE}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
