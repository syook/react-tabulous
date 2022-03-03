import './index.css';
import React from 'react';

const Input = ({ className, disabled, ...props }) => {
  return (
    <input
      disabled={disabled}
      className={`rt-input ${className ? className : ''} ${disabled ? 'disabled' : ''}`}
      {...props}
      min="1"
    />
  );
};

export default Input;
