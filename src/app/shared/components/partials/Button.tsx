import React from 'react';

interface IButtonProps {
  className?: string;
  type?: 'button' | 'submit';
  label?: string | '';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const Button: React.FC<IButtonProps> = ({
  className = '',
  type = 'button',
  label,
  onClick,
}) => {
  return (
    <button className={`btn ${className}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
};
