import React from 'react';
import styled from '@emotion/styled';

import { Typography, type variantsMapping } from '../typography';
import cx from '../../../helpers/classnames';

const InputLabelWrapper = styled.div<{ inline?: boolean }>`
  color: var(--grey-500, #5f6368);
  height: 32px;
  display: inline-flex;
  position: relative;
  font-size: 14px;
  max-width: 100%;
  align-items: center;

  &.form_input_inline {
    min-width: 160px;
    width: 160px;
  }
`;

// const InputLabelIcon = styled(Icon)`
// 	color: var(--grey-500, #5f6368);
// 	margin: -5px 0 0 5px;
// `;

// const InputLabelPopup = styled(Popup)`
// 	border-radius: 0.28571429rem;
// `;

const InputLabel: React.FC<{
  label?: string;
  htmlFor?: string;
  infoText?: string;
  className?: string;
  labelClass?: string;
  inline?: boolean;
  required?: boolean;
  variant?: keyof typeof variantsMapping;
}> = ({
  label = '',
  required = false,
  className = '',
  variant = 'subheading2',
  labelClass,
  infoText = '',
  inline = false,
  htmlFor,
  ...rest
}) => {
  if (!label) return null;

  return (
    <InputLabelWrapper className={cx({ form_input_inline: inline }, className)}>
      <Typography variant={variant} htmlFor={htmlFor} className={labelClass} {...rest}>
        {`${label}${required ? '*' : ''}`}
      </Typography>
      {/* {infoText != null && (
				<InputLabelPopup
					// inverted
					// trigger={<InputLabelIcon name="info circle" />}
					// content={infoText}
					// position="top left"
					// className="inputLabelPopup"
				/>
			)} */}
    </InputLabelWrapper>
  );
};

export default InputLabel;
