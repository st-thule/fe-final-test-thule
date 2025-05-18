import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PostListLoadMore } from '@shared/components/PostListLoadMore';
import { Post } from '@shared/models/post';
import { PostService } from '@shared/services/post.service';

const PostsByTag = () => {
  const postService = new PostService();
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPostsByTag = async () => {
      try {
        setIsLoading(true);
        const response = await postService.getPostsByTag(tag);
        setPosts(response.data);
      } catch (error) {
        throw error;
      }
    };

    fetchPostsByTag();
  }, [tag]);
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
          <PostListLoadMore
            posts={posts}
            className="col-12 col-sm-4 col-md-4"
          />
        </section>
      </div>
    </div>
  );
};

export default PostsByTag;
