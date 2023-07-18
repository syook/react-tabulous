import React from 'react';
import styled from '@emotion/styled';

import cx from '../../../helpers/classnames';

import { Icon, type Icons } from '../icon';

const TYPES = {
  circular: 'circular',
  transparent: 'transparent'
};

const StyledIconButton = styled.div((props: any) => ({
  cursor: 'pointer',
  width: props.size ?? 24,
  height: props.size ?? 24,
  // padding: 4,
  background: props.type === TYPES.transparent ? 'transparent' : 'var(--white-600, #ffffff)',
  border: props.type === TYPES.transparent ? 'none' : `1px solid var(--grey-400, #b1b1b1)`,
  borderRadius: props?.type ? '50%' : 5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:focus-visible': {
    outlineColor: 'var(--primary-400, #115bb2)'
  },
  ':hover': {
    background: 'rgba(0, 0, 0, 0.04)'
  },
  '&.disabled': {
    cursor: 'default',
    border: props.type === TYPES.transparent ? 'none' : `1px solid var(--grey-300, #e5e5e5) !important`,
    color: 'var(--grey-400, #b1b1b1) !important',
    ':hover': {
      background: 'var(--white-600, #ffffff) !important'
    },
    svg: {
      fill: 'var(--grey-400, #b1b1b1) !important'
    }
  }
}));

type IconButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: keyof typeof TYPES;
  size?: number;
  className?: string;
  onClick?: (event: any) => void;
  name: Icons;
  fill?: string;
  title?: string;
  disabled?: boolean;
};

export const IconButton = React.forwardRef(
  (
    {
      type = 'circular',
      size = 24,
      className = '',
      onClick = () => {},
      name,
      fill,
      title,
      disabled = false,
      ...rest
    }: IconButtonProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const handleClick = (e: any) => {
      if (!disabled) {
        onClick(e);
      }
    };

    return (
      <StyledIconButton
        ref={ref}
        role="button"
        size={size}
        onClick={handleClick}
        className={cx('iconButton', className, { disabled })}
        type={type}
        {...rest}
        title={title}
      >
        <Icon name={name} fill={fill} size={size} />
      </StyledIconButton>
    );
  }
);
