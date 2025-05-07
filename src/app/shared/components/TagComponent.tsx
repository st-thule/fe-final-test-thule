import React from 'react';
import { Link } from 'react-router-dom';

interface ITagProps {
  className?: string;
}
export const TagComponent: React.FC<ITagProps> = ({ className }) => {
  return (
    <li className={`list-item ${className}`}>
      <Link className="tag" to="">
        <h3 className="tag-title"></h3>
      </Link>
    </li>
  );
};
