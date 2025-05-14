import React, { forwardRef, useEffect, useState } from 'react';

interface TextareaProps {
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  onInputBlur?: (value: string) => void;
  onInputChange?: (value: string) => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name = '',
      label = '',
      placeholder = '',
      className = '',
      rows = 4,
      maxLength,
      minLength,
      isReadOnly = false,
      isDisabled = false,
      onInputBlur,
      onInputChange,
      onBlur,
      onChange,
      value = '',
      errorMessage = '',
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [error, setError] = useState(errorMessage);

    useEffect(() => {
      setInternalValue(value);
      setError(errorMessage);
    }, [value, errorMessage]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      setError('');

      if (onChange) onChange(e);
      if (onInputChange) onInputChange(newValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (onBlur) onBlur(e);
      if (onInputBlur) onInputBlur(e.target.value);

      // Manual minLength validation
      if (minLength && e.target.value.length < minLength) {
        setError(`Minlength ${minLength}`);
      }
    };

    return (
      <div className={`form-control ${error ? 'has-error' : ''}`}>
        {label && <label className="form-label">{label}</label>}
        <div className="input-group">
          <textarea
            ref={ref}
            id={name}
            name={name}
            placeholder={placeholder}
            className={`textarea ${className} ${error ? 'textarea-error' : ''}`}
            rows={rows}
            maxLength={maxLength}
            minLength={minLength}
            readOnly={isReadOnly}
            disabled={isDisabled}
            onChange={handleChange}
            onBlur={handleBlur}
            value={internalValue}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
);
