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
          <img src="" alt="card-img" />
        </div>
        <div className="card-content">
          <Link className="card-tag" to=""></Link>
          <h3 className="card-title"></h3>
          <div className="card-detail detail">
            <div className="detail-group">
              <img className="detail-image" src="" alt="avatar" />
              <p className="detail-value"></p>
            </div>
            <div className="detail-group">
              <p className="detail-value"></p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
