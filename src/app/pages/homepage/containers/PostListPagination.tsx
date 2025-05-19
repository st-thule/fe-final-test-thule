import React from 'react';

import { Pagination } from '@shared/components/Pagination';
import { PostComponent } from '@shared/components/Post';
import { PostResponse } from '@shared/models/post';

const SIZE_PAGE = 8;

interface PostListPaginationProps {
  postResponse: PostResponse;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  error: string;
}

export const PostListPagination: React.FC<PostListPaginationProps> = ({
  currentPage,
  onPageChange,
  postResponse,
  loading,
  error,
}) => {
  // console.log('data', postResponse.data);
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
        ) : postResponse?.data && postResponse.data.length > 0 ? (
          postResponse.data.map((post) => (
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

      {!loading && postResponse?.data && postResponse.data.length > 0 && (
        <Pagination
          totalItems={postResponse.totalItems}
          itemsPerPage={SIZE_PAGE}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
