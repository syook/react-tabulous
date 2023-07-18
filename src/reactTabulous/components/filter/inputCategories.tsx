/* eslint-disable no-case-declarations */
import React from 'react';

import { Input, Select } from '../widgets';

interface InputCategoriesProps {
  attribute?: any;
  type: any;
  value: any;
  rowIndex: any;
  query: any;
  onChange: any;
  options: any;
  className?: string;
}

const booleanOptions = ['true', 'false'];

export const InputCategories: React.FC<InputCategoriesProps> = ({
  attribute,
  options,
  type,
  value,
  rowIndex,
  query,
  className = '',
  onChange
}) => {
  switch (type) {
    case 'string':
    case 'number':
      return (
        <Input
          className={className}
          type={type === 'number' ? 'number' : 'text'}
          value={value || ''}
          onChange={(e: { target: { value: any } }) => onChange(e.target.value, rowIndex)}
        />
      );
    case 'singleSelect':
    case 'MultiSelect':
      const isMultiSelect = !['is', 'is not'].includes(query);
      const selectValue = isMultiSelect
        ? (value || []).length
          ? value.map((v: any) => ({ value: v, label: v }))
          : []
        : (value || []).length === 1
        ? { value: value[0], label: value[0] }
        : null;
      return (
        <Select
          // isMulti={isMultiSelect}
          options={options}
          value={selectValue}
          className={className}
          onChange={e => {
            const newValue = e.target.value;
            // isMultiSelect
            // 	? value.map(({ label }) => label)
            // 	: (value || {}).hasOwnProperty('label')
            // 	? [value.label]
            // 	: [];
            onChange(newValue, rowIndex);
          }}
        />
      );
    case 'boolean':
      return (
        // <Checkbox
        // 	checked={value}
        // 	onChange={(e: any, { checked }: any) => onChange(checked, rowIndex)}
        // />
        <Select
          options={booleanOptions}
          value={value ?? 'true'}
          className={className}
          onChange={e => {
            const newValue = e.target.value;
            onChange(newValue, rowIndex);
          }}
        />
      );
    case 'dateTime':
    case 'date':
      return (
        <Input
          type={type === 'dateTime' ? 'datetime-local' : 'date'}
          value={value || ''}
          className={className}
          onChange={(e: { target: { value: any } }) => onChange(e.target.value, rowIndex)}
        />
      );
    default:
      return null;
  }
};
