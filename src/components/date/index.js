import './react-datepicker.css';

import DatePicker from 'react-datepicker';
import React from 'react';

const DateComponent = props => {
  return (
    <DatePicker
      className="rt-input"
      selected={props.value}
      onChange={date => props.onChange(date)}
      dateFormat="MMMM d, yyyy"
    />
  );
};

export default DateComponent;
