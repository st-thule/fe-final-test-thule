import React from 'react';

import { Spinner } from '../common';

interface IButtonProps {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit';
  label?: string | '';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}
export const Button: React.FC<IButtonProps> = ({
  className = '',
  isDisabled = false,
  isLoading = false,
  type = 'button',
  label,
  onClick,
  children,
}) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
      {isLoading ? <Spinner className="spinner-sm" /> : label}
    </button>
  );
};
