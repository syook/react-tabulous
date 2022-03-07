import './index.css';
import React, { useRef, useEffect } from 'react';

const Input = ({ className, disabled, ...props }) => {
  const inputEl = useRef(null);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    inputEl.current.value = 1;
  }, [inputEl, props.max, firstUpdate]);

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
