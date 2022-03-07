import './index.css';
import React from 'react';

const Button = ({ children, variant, className, ...props }) => {
  const btnClass = `rt-button ${className ? className : ''} ${variant ? `btn-${variant}` : ''}`;

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
