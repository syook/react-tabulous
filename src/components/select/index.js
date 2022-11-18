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
  menuPortal: (provided, state) => ({
    ...provided,
    left: 'auto',
    top: 'auto',
    position: 'fixed',
    zIndex: 9999,
  }),
  select: base => ({
    ...base,
    position: 'relative',
  }),
};

const Select = ({ ...props }) => {
  const refSelectContainer = React.useRef(null);

  return (
    <div ref={refSelectContainer} style={{ position: 'relative' }}>
      <ReactSelect styles={customStyles} menuPortalTarget={refSelectContainer.current} {...props} />
    </div>
  );
};

export default Select;
