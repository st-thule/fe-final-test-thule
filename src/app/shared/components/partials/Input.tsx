import React, { forwardRef } from 'react';

interface IInputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
  onInputBlur?: (value: string) => void;
  onInputChange?: (value: string) => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  type?: string;
  value?: string | number;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon?: string;
  onIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      name = '',
      label = '',
      className = '',
      type = 'text',
      placeHolder = '',
      maxLength,
      minLength,
      isReadOnly = false,
      isDisabled = false,
      onBlur,
      onChange,
      value,
      errorMessage,
      icon,
      onIconClick,
    },
    ref
  ) => {
    return (
      <>
        {label && <p className="input-label">{label}</p>}
        <div className="input-wrapper">
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            value={value}
            className={`input ${className}`}
            placeholder={placeHolder}
            maxLength={maxLength}
            minLength={minLength}
            readOnly={isReadOnly}
            disabled={isDisabled}
            onBlur={onBlur}
            onChange={onChange}
          />
          {icon && (
            <img className="input-icon" src={icon} onClick={onIconClick} />
          )}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </>
    );
  }
);
