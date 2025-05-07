import React from 'react';

import { Spinner } from '../common';

interface IButtonProps {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit';
  label?: string | '';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const Button: React.FC<IButtonProps> = ({
  className = '',
  isDisabled = false,
  isLoading = false,
  type = 'button',
  label,
  onClick,
}) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
      {isLoading && <Spinner className="spinner-sm" />}
    </button>
  );
};
