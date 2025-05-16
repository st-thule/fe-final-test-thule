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
}

const SIZE_PAGE = 8;
export const PostListLoadMore: React.FC<IPostListLoadMoreProps> = ({
  posts,
  userInfo,
}) => {
  const [visibleCount, setVisibleCount] = useState(SIZE_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + SIZE_PAGE);
  };

  if (!posts && posts.length === 0) {
    return <p>No post here</p>;
  }

  return (
    <>
      <ul className="list list-posts row">
        {posts.slice(0, visibleCount).map((post) => (
          <PostComponent
            key={post.id}
            post={post}
            className={'col-12 col-sm-6 com-md-3'}
            fallbackUser={userInfo}
          />
        ))}
      </ul>

      {posts.length > SIZE_PAGE && visibleCount < posts.length && (
        <Button
          className="btn btn-primary"
          label="Load more"
          onClick={handleLoadMore}
        />
      )}
    </>
  );
};
