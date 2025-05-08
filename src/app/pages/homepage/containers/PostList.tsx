import React, { useEffect, useState } from 'react';

import { Pagination } from '@shared/components/Pagination';
import { PostComponent } from '@shared/components/Post';
import { getPublicPost } from '@shared/services/post.service';

export const PostList = ({ currentPage, onPageChange }) => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPublicPost(currentPage, itemsPerPage);
        setPublicPosts(response.data || []);
        setTotalItems(response.totalItems || 0);
        setTotalPages(response.totalPage || 0);
        setItemsPerPage(response.itemsPerPage || itemsPerPage);
        console.log('Response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchPosts();
  }, [currentPage, itemsPerPage]);
  return (
    <>
      <ul className="list-posts row">
        {publicPosts.length > 0 ? (
          publicPosts.map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              className={'col-12 col-sm-6 col-md-3'}
            />
          ))
        ) : (
          <p>No posts availableF</p>
        )}
      </ul>
      {totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
