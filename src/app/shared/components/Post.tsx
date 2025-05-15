import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import { Post } from '@shared/models/post';
import { formatDate } from '@shared/utils/formatDate';

import imagePost from '@assets/images/articles/article-travel.png';
import author from '@assets/images/author.png';
import { AppRoutes } from '@app/core/constants/app-routes';

interface IPostProps {
  post: Post;
  className: string;
  onClick?: (id: string) => void;
  loading?: boolean;
}

export const PostComponent: React.FC<IPostProps> = ({
  post,
  className,
  onClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <li className={`list-item ${className}`}>
        <div className="card">
          <div className="card-img skeleton" />
          <div className="card-content">
            <div className="skeleton-tag mb-2" />
            <div className="skeleton-text" />
            <div className="skeleton-text mt-1" />
            <div className="card-detail detail">
              <div className="detail-group">
                <div className="skeleton-circle" />
                <div className="skeleton-text" />
              </div>
              <div className="skeleton-text" />
            </div>
          </div>
        </div>
      </li>
    );
  }
  return (
    <li className={`list-item ${className}`}>
      <Link
        className="card"
        to={`${AppRoutes.POSTS}/${post.id}`}
        onClick={() => onClick}
      >
        <div className="card-img">
          <img
            src={post.cover === 'cover' ? imagePost : post.cover}
            alt="card-img"
          />
        </div>
        {post.tags && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <Link className="card-tag" to="" key={tag}>
              {tag}
            </Link>
          ))
        ) : (
          <></>
        )}
        <div className="card-content">
          <h3 className="card-title">{post.title}</h3>
          <div className="card-detail detail">
            <div className="detail-group">
              <img
                className="detail-image"
                src={post.user.picture === null ? author : post.user.picture}
                alt="avatar"
              />
              <p className="detail-value">{post.user.displayName}</p>
            </div>
            <div className="detail-group">
              <p className="detail-value">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
