import React from 'react';
import { Link } from 'react-router-dom';

import { Post } from '@shared/models/post';
import { formatDate } from '@shared/utils/formatDate';

import imagePost from '@assets/images/articles/article-travel.png';
import author from '@assets/images/author.png';

interface IPostProps {
  post: Post;
  className: string;
  onClick?: (id: string) => void;
}

export const PostComponent: React.FC<IPostProps> = ({
  post,
  className,
  onClick,
}) => {
  return (
    <li className={`list-item ${className}`}>
      <Link className="card" to={`/post/${post.id}`} onClick={() => onClick}>
        <div className="card-img">
          <img
            src={post.cover === 'cover' ? imagePost : post.cover}
            alt="card-img"
          />
        </div>
        <div className="card-content">
          {post.tags.map((tag) => (
            <Link className="card-tag" to="">
              {tag}
            </Link>
          ))}
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
