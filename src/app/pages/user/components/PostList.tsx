import React from 'react';

import { Post } from '@shared/models/post';
import { PostComponent } from '../../../shared/components/Post';

interface IPostListProps {
  posts: Post[];
  userInfo?: {
    displayName: string;
    picture?: string;
  };
  className: string;
}

export const PostList: React.FC<IPostListProps> = ({
  posts,
  userInfo,
  className,
}) => {
  return (
    <>
      {!posts || posts.length === 0 ? (
        <p className="text-center">No post here</p>
      ) : (
        <>
          <ul className="list list-posts row">
            {posts.map((post) => (
              <PostComponent
                key={post.id}
                post={post}
                className={className}
                fallbackUser={userInfo}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
