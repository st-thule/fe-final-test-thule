import React, { forwardRef, useEffect, useState } from 'react';

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
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
      onKeyDown,
      onBlur,
      onChange,
      onFocus,
      value,
      errorMessage,
      icon,
      onIconClick,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    return (
      <div className="form-control">
        {label && (
          <label
            className={`form-label ${isFocused || hasValue ? 'focused' : ''}`}
          >
            {label}
          </label>
        )}
        <div
          className={`input-group ${isFocused ? 'focused' : ''} ${
            hasValue ? 'has-value' : ''
          }`}
        >
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
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
              if (e.target.value) setHasValue(true);
              else setHasValue(false);
            }}
            onChange={(e) => {
              if (onChange) onChange(e);
              setHasValue(!!e.target.value);
            }}
            onKeyDown={onKeyDown}
          />
          {icon && (
            <img className="form-icon" src={icon} onClick={onIconClick} />
          )}
        </div>
        {errorMessage && (
          <p className={`error-message ${errorMessage ? 'visible' : ''}`}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
