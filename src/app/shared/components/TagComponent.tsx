import { AppRoutes } from '@app/core/constants/app-routes';
import React from 'react';
import { Link } from 'react-router-dom';

interface ITagProps {
  className?: string;
  label: string;
}

export const Tag: React.FC<ITagProps> = ({ className, label }) => {
  return (
    <li className={`list-item ${className}`}>
      <Link className="tag" to={`${AppRoutes.POSTS}/tags/${label}`}>
        <h3 className="tag-title">{label}</h3>
      </Link>
    </li>
  );
};
