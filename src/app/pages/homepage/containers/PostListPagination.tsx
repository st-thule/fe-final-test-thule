import React, { useEffect, useState } from 'react';

import { Pagination } from '@shared/components/Pagination';
import { PostComponent } from '@shared/components/Post';
import { PostService } from '@shared/services/post.service';

const SIZE_PAGE = 8;

export const PostListPagination = ({ currentPage, onPageChange }) => {
  const postService = new PostService();
  const [publicPosts, setPublicPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postService.getPublicPost(
          currentPage,
          SIZE_PAGE
        );
        setPublicPosts(response.data || []);
        setTotalItems(response.totalItems || 0);
        setTotalPages(response.totalPage || 0);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage, 8]);

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
        ) : publicPosts.length > 0 ? (
          publicPosts.map((post) => (
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
      {totalItems > 0 && !loading && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={SIZE_PAGE}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
