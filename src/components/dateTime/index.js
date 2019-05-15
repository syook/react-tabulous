import './dateTime.css';
import DateTime from 'react-datetime';
import React from 'react';

const DateTimeComponent = props => {
  return (
    <DateTime
      className="datatime_select"
      closeOnSelect={true}
      dateFormat={props.dateFormat}
      value={props.value}
      onChange={date => props.onChange(date)}
    />
  );
};

export default DateTimeComponent;
