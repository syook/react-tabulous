import './react-datepicker.css';
import DatePicker from 'react-datepicker';
import React from 'react';

const DateTimeComponent = props => {
  return (
    <DatePicker
      className="rt-input"
      selected={props.value}
      onChange={date => props.onChange(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={1}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeCaption="time"
    />
  );
};

export default DateTimeComponent;
