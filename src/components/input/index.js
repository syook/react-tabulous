import './index.css';
import React, { useEffect, useRef } from 'react';

const Input = ({ className, disabled, ...props }) => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl) {
      if (inputEl.current.value > props.max) {
        inputEl.current.value = props.max;
      }
    }
  }, [inputEl, props.max]);

  return (
    <input
      ref={inputEl}
      disabled={disabled}
      className={`rt-input ${className ? className : ''} ${disabled ? 'disabled' : ''}`}
      {...props}
    />
  );
};

export default Input;
