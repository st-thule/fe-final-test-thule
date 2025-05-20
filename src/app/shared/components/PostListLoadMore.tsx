import React, { useState } from 'react';

import { Post } from '@shared/models/post';
import { PostComponent } from './Post';
import { Button } from './partials';

interface IPostListLoadMoreProps {
  posts: Post[];
  userInfo?: {
    displayName: string;
    picture?: string;
  };
  className: string;
}

const SIZE_PAGE = 9;

export const PostListLoadMore: React.FC<IPostListLoadMoreProps> = ({
  posts,
  userInfo,
  className,
}) => {
  const [visibleCount, setVisibleCount] = useState(SIZE_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + SIZE_PAGE);
  };

  return (
    <>
      {!posts || posts.length === 0 ? (
        <p className="text-center">No post here</p>
      ) : (
        <>
          <ul className="list list-posts row">
            {posts.slice(0, visibleCount).map((post) => (
              <PostComponent
                key={post.id}
                post={post}
                className={className}
                fallbackUser={userInfo}
              />
            ))}
          </ul>

          {visibleCount < posts.length ? (
            <div className="loading-status">
              <Button
                className="btn btn-primary"
                label="Load more"
                onClick={handleLoadMore}
              />
            </div>
          ) : (
            <p className="text-center">No post more here</p>
          )}
        </>
      )}
    </>
  );
};
