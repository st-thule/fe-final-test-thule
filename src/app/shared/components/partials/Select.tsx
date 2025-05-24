import React from 'react';
import Select, { IndicatorSeparatorProps, SingleValue } from 'react-select';

import { IOption } from '@shared/constants/options';

const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  marginBottom: 8,
  marginTop: 8,
  width: 1,
};

const IndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<IOption, false>) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

interface ISingleSelect {
  options: IOption[];
  label?: string;
  value?: string;
  onChange?: (selectedValue: string, name?: string) => void;
  errorMsg?: string;
  placeholder?: string;
  name?: string;
}

export const SingleSelect: React.FC<ISingleSelect> = ({
  options = [],
  label,
  value,
  onChange,
  errorMsg,
  placeholder = 'Select...',
  name,
}) => {
  const isError = !!errorMsg;
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleChange = (selected: SingleValue<IOption>) => {
    if (selected) {
      onChange?.(selected.value, name);
    }
  };

  return (
    <div className="form-control">
      {label && <label className="form-label">{label}</label>}
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        components={{ IndicatorSeparator }}
        classNamePrefix={`form-select${isError ? ' is-invalid' : ''}`}
        placeholder={placeholder}
      />
      {isError && <span className="error-message">{errorMsg}</span>}
    </div>
  );
};
