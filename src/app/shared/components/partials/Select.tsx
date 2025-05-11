import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  name: string;
  label?: string;
  errorMsg?: string;
  options: { label: string; value: string }[];
  register?: UseFormRegisterReturn;
  value?: string;
  placeHolder?: string;
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
  placeHolder,
  onChange,
  onBlur,
}) => {
  const isShowError = !!errorMsg;

  return (
    <div className="form-control">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="input-group">
        <select
          id={name}
          name={name}
          className={`input ${isShowError ? 'is-invalid' : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...register}
        >
          {placeHolder && (
            <option value="" disabled hidden>
              {placeHolder}
            </option>
          )}
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
