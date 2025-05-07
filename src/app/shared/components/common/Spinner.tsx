import React from 'react';

interface ISpinnerProps {
  className?: string;
}

export const Spinner: React.FC<ISpinnerProps> = ({ className = '' }) => (
  <div className={`spinner ${className}`}>
    {[...Array(3)].map((_, index) => (
      <span key={index} className="bounce"></span>
    ))}
  </div>
);
