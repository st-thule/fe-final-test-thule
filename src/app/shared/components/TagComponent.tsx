import React from 'react';
import { Link } from 'react-router-dom';

interface ITagProps {
  className?: string;
}
export const Tag: React.FC<ITagProps> = ({ className }) => {
  return (
    <li className={`list-item ${className}`}>
      <Link className="tag" to="">
        <h3 className="tag-title">Technology</h3>
      </Link>
    </li>
  );
};
