import './index.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, variant, className, backgroundColor, ...props }) => {
  const btnClass = `rt-button ${className ? className : ''} ${variant ? `btn-${variant}` : ''}`;

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
