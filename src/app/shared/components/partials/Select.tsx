import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  name: string;
  label?: string;
  errorMsg?: string;
  options: { label: string; value: string }[];
  register?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  errorMsg,
  options,
  register,
  value,
  onChange,
  onBlur,
}) => {
  const isShowError = !!errorMsg;

  return (
    <div className="input-group">
      <div className="input-wrapper">
        {label && (
          <label className="input-label" htmlFor={name}>
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          className={`input ${isShowError ? 'is-invalid' : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...register}
        >
          <option value="">Gender {label?.toLowerCase()}</option>
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {isShowError && <span className="error-message">{errorMsg}</span>}
    </div>
  );
};
