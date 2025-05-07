import React from 'react';

import { Spinner } from '../common';

interface IButtonProps {
  title: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  onClick: () => void;
  btnRef?: React.Ref<HTMLButtonElement>;
}
export const Button: React.FC<IButtonProps> = ({
  title,
  isDisabled = false,
  isLoading = false,
  className = 'btn btn-primary',
  onClick,
  type = 'submit',
  btnRef,
}) => {
  return (
    <button
      className={`btn ${className}`}
      ref={btnRef}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span>{title}</span>
      {isLoading && <Spinner className="spinner-sm" />}
    </button>
  );
};
