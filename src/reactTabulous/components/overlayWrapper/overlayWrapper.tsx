import styled from '@emotion/styled';

type StyledProps = { width?: number; height?: number } & React.HTMLAttributes<HTMLDivElement>;

const OverlayWrapperInner = styled.div<StyledProps>(props => {
  const { width, height } = props;
  return {
    width: width ?? '100%',
    height: height ?? '-webkit-fill-available',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.02)',
    '.overlayWrapperLoader': {
      width: 40,
      height: 40,
      display: 'inline-block',
      color: 'var(--primary-400, #115bb2)',
      animation: 'spin 1s linear infinite',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }
  };
});

interface OverlayWrapperProps {
  children: React.ReactNode;
}

export const OverlayWrapper: React.FC<OverlayWrapperProps> = ({ children }) => {
  const gridBodyElement = document.querySelector('.gridBodyContainer');
  let extraProps = {};
  if (gridBodyElement) {
    extraProps = {
      width: gridBodyElement.clientWidth,
      height: gridBodyElement.clientHeight - 44
    };
  }

  return <OverlayWrapperInner {...extraProps}>{children}</OverlayWrapperInner>;
};
