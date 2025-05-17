import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
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
