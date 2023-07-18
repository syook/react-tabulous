import React from 'react';
import styled from '@emotion/styled';
import classnames from '../../helpers/classnames';

// Defining the HTML tag that the component will support
export const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheading1: 'p',
  subheading2: 'p',
  subheading3: 'p',
  subheading4: 'p',
  bodyMedium: 'p',
  bodySmall: 'p',
  tooltip: 'span'
  // buttonLarge: 'p',
  // buttonMedium: 'p',
  // buttonSmall: 'p'
};

interface TypographyProps {
  element?: keyof JSX.IntrinsicElements;
  variant?: keyof typeof variantsMapping;
  className?: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  htmlFor?: string;
  color?: 'primary' | 'error';
  style?: React.CSSProperties;
}

const fontMapping = {
  h1: { fontSize: 28, fontWeight: 700 },
  h2: { fontSize: 16, fontWeight: 700 },
  h3: { fontSize: 14, fontWeight: 600 },
  h4: { fontSize: 14, fontWeight: 500 },
  h5: { fontSize: 12, fontWeight: 600 },
  h6: { fontSize: 11, fontWeight: 600 },
  subheading1: { fontSize: 14, fontWeight: 400 },
  subheading2: { fontSize: 12, fontWeight: 500 },
  subheading3: { fontSize: 11, fontWeight: 500 },
  subheading4: { fontSize: 10, fontWeight: 500 },
  bodyMedium: { fontSize: 12, fontWeight: 400 },
  bodySmall: { fontSize: 11, fontWeight: 400 },
  tooltip: { fontSize: 10, fontWeight: 400 },
  button1: { fontSize: 14, fontWeight: 500 },
  button2: { fontSize: 12, fontWeight: 500 },
  button3: { fontSize: 10, fontWeight: 500 }
};

export const Typography: React.FC<TypographyProps> = ({
  element,
  variant = 'subheading1',
  className = '',
  children,
  align = 'left',
  htmlFor,
  color,
  style,
  ...props
}) => {
  // If the variant exists in variantsMapping, we use it.
  // Otherwise, use p tag instead.
  const Component: any = element ?? variantsMapping?.[variant] ?? 'p';

  const customProps = htmlFor != null ? { htmlFor } : {};

  const StyledC = styled(Component)({
    '&.SuiTypography': {
      margin: '0',
      padding: '0',
      fontFamily: 'var(--font-family)',
      fontSize: fontMapping[variant].fontSize,
      fontWeight: fontMapping[variant].fontWeight,
      ...(color ? { color } : {})
    },
    '&.SuiTypography-right': { textAlign: 'right' },
    '&.SuiTypography-left': { textAlign: 'left' },
    '&.SuiTypography-center': { textAlign: 'center' }
  });

  const variantTypography = `SuiTypography-${variant}`;
  const alignTypography = `SuiTypography-${align}`;

  return (
    <StyledC
      className={classnames('SuiTypography', variantTypography, alignTypography, className)}
      {...props}
      {...customProps}
    >
      {children}
    </StyledC>
  );
};
