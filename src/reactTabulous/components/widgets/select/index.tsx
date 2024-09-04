import React from 'react';

import { SelectStyle } from './selectStyle';

type optionType = { value: string; label: string } | string | number;

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: optionType[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, disabled = false, ...rest }) => {
  return (
    <SelectStyle value={value} onChange={onChange} disabled={disabled} {...rest}>
      {options.map((option: optionType) => {
        const value = typeof option === 'object' ? option.value : option;
        const label = typeof option === 'object' ? option.label : option;

        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </SelectStyle>
  );
};
