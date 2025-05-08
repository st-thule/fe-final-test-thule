import React from 'react';
import { Link } from 'react-router-dom';

interface IPostProps {
  className: string;
  onClick?: (id: string) => void;
}

export const Post: React.FC<IPostProps> = ({ onClick, className }) => {
  return (
    <li className={`list-item ${className}`}>
      <Link className="card" to="" onClick={() => onClick}>
        <div className="card-img">
          <img src="/assets/images/articles/article-image.png" alt="card-img" />
        </div>
        <div className="card-content">
          <Link className="card-tag" to="">
            Technology
          </Link>
          <h3 className="card-title">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h3>
          <div className="card-detail detail">
            <div className="detail-group">
              <img
                className="detail-image"
                src="/assets/images/author.png"
                alt="avatar"
              />
              <p className="detail-value">Tracey Wilson</p>
            </div>
            <div className="detail-group">
              <p className="detail-value">August 20, 2022</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
