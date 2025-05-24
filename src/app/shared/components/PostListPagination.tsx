import React from 'react';

import { Pagination } from '@shared/components/Pagination';
import { PostComponent } from '@shared/components/Post';
import { PostResponse } from '@shared/models/post';
import { SkeletonPost } from './partials/Skeleton';

const SIZE_PAGE = 6;

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
  return (
    <>
      <ul className="list list-posts row">
        {loading ? (
          Array.from({ length: SIZE_PAGE }).map((_, index) => (
            <SkeletonPost
              key={`skeleton-${index}`}
              className="col-12 col-sm-6 col-md-4"
            />
          ))
        ) : postResponse?.data && postResponse.data.length > 0 ? (
          postResponse.data.map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              className="col-12 col-sm-6 col-md-4"
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
