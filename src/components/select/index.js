import React from 'react';
import ReactSelect from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '30px',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '5px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: '14px',
  }),
  indicatorSeparator: (provided, state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    padding: '0px',
    width: 18,
    minHeight: 30,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0px',
    color: 'red',
    svg: {
      transform: 'scale(.5)',
    },
  }),
  input: (provided, state) => ({
    ...provided,
    padding: '0px',
    margin: '0px',
  }),

};

const Select = ({ ...props }) => {
  return <ReactSelect styles={customStyles} {...props} />;
};

export default Select;
