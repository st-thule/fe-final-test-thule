import React, { useEffect, useState } from 'react';

import { IOption, OptionTag } from '@shared/constants/optionGender';
import { Input } from './partials';

import searchIcon from '@assets/icons/search-icon.svg';

interface IMultiSelect {
  options?: IOption[];
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
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValue] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      setIsOpen(true);
    }
  }, [query]);

  const filteredOptions = options?.filter(
    (option) =>
      option?.label
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim()) &&
      !selectedValues.includes(option.value)
  );

  const handleSelect = (value: string) => {
    const newSelected = [...selectedValues, value];
    setSelectedValue(newSelected);
    onChange?.(newSelected);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelect(filteredOptions[0].value);
    }
  };

  const handleRemove = (value: string) => {
    const updated = selectedValues.filter((val) => val !== value);
    setSelectedValue(updated);
    onChange?.(updated);
  };

  return (
    <>
      <div className="form-control">
        {selectedValues?.length ? (
          <div className="form-option">
            {selectedValues.map((selected) => {
              return (
                <li className="" key={selected}>
                  {selected}
                  <p className="" onClick={() => handleRemove(selected)}>
                    X
                  </p>
                </li>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {label && <label className="form-label">{label}</label>}
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={searchIcon}
          onIconClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {isOpen ? (
          <div className="dropdown">
            <ul className="list list-dropdowns">
              {filteredOptions?.length ? (
                filteredOptions.map((option) => (
                  <li
                    className="list-item"
                    key={option.id}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="list-item">No option available</li>
              )}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
