import styled from '@emotion/styled';

import { Icon, type Icons } from './icon';
import { Typography } from './typography';

// menu
export const Menu = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 0',
  padding: 0,
  hr: { margin: '8px 0' }
});

// menu item
const StyledMenuItem = styled.li({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 12px',
  cursor: 'pointer',
  color: 'var(--grey-600, #2c2e30)',
  userSelect: 'none',
  '&[aria-disabled=true]': {
    color: 'var(--grey-400, #b1b1b1)',
    cursor: 'default',
    '.listItemIcon': {
      color: 'var(--grey-400, #b1b1b1)'
    },
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  '&:hover': {
    backgroundColor: '#f5f5f5'
  },
  '&:active': {
    backgroundColor: '#e0e0e0'
  },
  '&[data-selected=true]': {
    backgroundColor: '#f5f5f5'
  },
  '&:first-of-type': {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  '&:last-of-type': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  '.listItemIcon': {
    minWidth: 36,
    display: 'flex',
    alignItems: 'center',
    color: 'var(--grey-500, #5f6368)',
    '.pinLeft': {
      transform: 'rotate(30deg)'
    },
    '.pinRight': {
      transform: 'rotate(-30deg)'
    }
  }
});

type MenuItemProps = React.HTMLAttributes<HTMLLIElement> & {
  disabled?: boolean;
  icon?: Icons;
  iconClass?: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
};

const fn = () => {};
export const MenuItem: React.FC<MenuItemProps> = ({
  disabled = false,
  selected = false,
  label,
  icon,
  onClick,
  iconClass = '',
  ...rest
}) => {
  return (
    <StyledMenuItem
      tabIndex={0}
      onClick={disabled ? fn : onClick}
      data-selected={selected}
      {...rest}
      aria-disabled={disabled}
    >
      {icon && (
        <div className="listItemIcon">
          <Icon className={iconClass} name={icon} size={18} />
        </div>
      )}
      <Typography variant="subheading1">{label}</Typography>
    </StyledMenuItem>
  );
};
