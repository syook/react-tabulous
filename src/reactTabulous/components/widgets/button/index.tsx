import React from 'react';

import cx from '../../../helpers/classnames';
import { ButtonStyle } from './buttonStyle';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outline' | 'text';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  size?: 'normal' | 'medium' | 'small';
  color?: 'primary' | 'success' | 'danger' | 'secondary';
  iconClass?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      onClick,
      size = 'normal',
      color = 'primary',
      loading = false,
      variant = 'contained',
      disabled = false,
      orientation = 'horizontal',
      iconClass = '',
      className = '',
      ...props
    }: ButtonProps,
    ref
  ) => {
    const btnClass = cx(
      'buttonV2',
      { [`button-${variant}`]: Boolean(variant) },
      { 'buttonV2-loading': loading },
      { [`btn-${orientation}`]: Boolean(orientation) },
      { [`button-${variant}-${color}`]: Boolean(color) },
      { [`button-size-${size}`]: Boolean(size) },
      className
    );

    const onButtonClick = (e: any) => {
      if (!loading || !disabled) {
        onClick?.(e);
      }
    };

    return (
      <ButtonStyle ref={ref} className={btnClass} {...props} disabled={disabled} onClick={onButtonClick}>
        {/* start icon / text can be used */}
        {loading ? (
          <div className="btnLoader"></div>
        ) : (
          Boolean(icon) && <div className={cx({ buttonV2__icon: Boolean(children) }, iconClass)}>{icon}</div>
        )}

        {children}
      </ButtonStyle>
    );
  }
);
