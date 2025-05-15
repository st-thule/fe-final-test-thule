import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { AuthContext } from '@shared/contexts/auth.context';
import { Post } from '@shared/models/post';
import { formatDate } from '@shared/utils/formatDate';

import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import imagePost from '@assets/images/articles/article-travel.png';
import author from '@assets/images/author.png';

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
  const { user } = useContext(AuthContext);

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
      <div>
        <div className="card-img">
          <img
            src={post.cover === 'cover' ? imagePost : post.cover}
            alt="card-img"
          />
          {user?.id === post?.userId && (
            <div className="card-action">
              <Link
                className="action"
                to={`${AppRoutes.POSTS}/edit/${post.id}`}
              >
                <img className="action-icon" src={editIcon} alt="edit" />
              </Link>
              <Link className="action" to={''}>
                <img className="action-icon" src={deleteIcon} alt="delete" />
              </Link>
            </div>
          )}
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
          <Link to={`${AppRoutes.POSTS}/${post.id}`} onClick={() => onClick}>
            <h3 className="card-title">{post.title}</h3>
          </Link>
          <div className="card-detail detail">
            <div className="detail-group">
              <img
                className="detail-image"
                src={post.user?.picture ?? author}
                alt="avatar"
              />
              <p className="detail-value">
                {post.user?.displayName ?? user.displayName}
              </p>
            </div>
            <div className="detail-group">
              <p className="detail-value">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
