import React from 'react';
import Select, { IndicatorSeparatorProps, MultiValue } from 'react-select';

import { IOption } from '@shared/constants/options';

const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  marginBottom: 8,
  marginTop: 8,
  width: 1,
};

const IndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<IOption, true>) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

interface IMultiSelect {
  options: IOption[];
  label?: string;
  value?: string[];
  onChange?: (selectedValue: string[]) => void;
}

export const MultiSelect: React.FC<IMultiSelect> = ({
  options = [],
  label,
  value = [],
  onChange,
}) => {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleChange = (selected: MultiValue<IOption>) => {
    const values = selected.map((item) => item.value);
    onChange?.(values);
  };

  return (
    <div className="form-control">
      {label && <label className="form-label">{label}</label>}
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        components={{ IndicatorSeparator }}
        classNamePrefix="form-select"
        placeholder="Search and select..."
      />
    </div>
  );
};
