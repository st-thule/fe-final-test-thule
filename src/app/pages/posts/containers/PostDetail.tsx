import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPostById } from '@shared/services/post.service';
import { Post } from '@shared/models/post';

import calendarIcon from '@assets/icons/calendar.svg';
import imagePost from '@assets/images/articles/article-travel.png';
import { formatDate } from '@shared/utils/formatDate';
import author from '@assets/images/author.png';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostById();
  }, [id]);

  return (
    <div className="page page-post-detail">
      <div className="container">
        <div className="wrapper">
          <section className="section section-post">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>

                <div className="flex items-center space-x-4 mt-4">
                  <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>

                <div className="h-64 w-full bg-gray-200 rounded-lg mt-4"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : post ? (
              <>
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag) => (
                    <Link className="section-tag" to="" key={tag}>
                      {tag}
                    </Link>
                  ))
                ) : (
                  <Link className="section-tag" to="">
                    General
                  </Link>
                )}
                <h2 className="section-title">{post.title}</h2>
                <p className="section-subtitle">{post.description}</p>

                <section className="section-meta meta">
                  <div className="meta-group">
                    <img
                      className="img meta-img"
                      src={post.user?.picture ?? author}
                      alt="Author"
                    />
                    <p className="meta-title">{post.user?.displayName}</p>
                  </div>
                  <div className="meta-group">
                    <img
                      className="img meta-img"
                      src={calendarIcon}
                      alt="Calendar"
                    />
                    <p className="meta-title">{formatDate(post.createdAt)}</p>
                  </div>
                </section>
                <img
                  className="img section-thumbnail"
                  src={post.cover === 'cover' ? imagePost : post.cover}
                  alt="Post"
                />
                <p className="section-content">{post.content}</p>
              </>
            ) : (
              <p>Post not found.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
