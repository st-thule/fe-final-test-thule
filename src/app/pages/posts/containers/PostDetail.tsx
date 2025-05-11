import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Post } from '@shared/models/post';
import { getPostById } from '@shared/services/post.service';
import { formatDate } from '@shared/utils/formatDate';

import calendarIcon from '@assets/icons/calendar.svg';
import imagePost from '@assets/images/articles/article-travel.png';

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
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostById();
  }, [id]);

  return (
    <div className="page page-post-detail">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <article className="article article-post">
            {loading ? (
              <>
                <div className="article-header">
                  <div className="skeleton-tag mb-2"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-small">
                    <div className="skeleton-circle"></div>
                  </div>
                </div>
                <div className="article-body">
                  <div className="article-thumbnail">
                    <div className="skeleton-image"></div>
                  </div>
                  <div className="skeleton-content"></div>
                </div>
              </>
            ) : post ? (
              <>
                <div className="article-header">
                  {post.tags && post.tags.length > 0 ? (
                    post.tags.map((tag) => (
                      <Link className="article-tag" to="" key={tag}>
                        {tag}
                      </Link>
                    ))
                  ) : (
                    <></>
                  )}
                  <h1 className="article-title">{post.title}</h1>
                  <p className="article-subtitle">{post.description}</p>
                  <div className="article-meta meta">
                    <div className="meta-group">
                      <img
                        className="img meta-img"
                        src={post.user?.picture ?? '/assets/images/author.png'}
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
                  </div>
                </div>
                <div className="article-body">
                  <img
                    className="img article-thumbnail"
                    src={post.cover === 'cover' ? imagePost : post.cover}
                    alt="Post"
                  />
                  <p className="article-content">{post.content}</p>
                </div>
              </>
            ) : (
              <p>Post not found.</p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
