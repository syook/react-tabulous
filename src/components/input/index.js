import './index.css';
import React from 'react';

const Input = ({ className, disabled, ...props }) => {
  return <input disabled={disabled} className={`rt-input ${className} ${disabled ? 'disabled' : ''}`} {...props} />;
};

export default Input;
