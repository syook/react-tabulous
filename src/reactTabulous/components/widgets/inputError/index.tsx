import React from 'react';
import { Typography } from '../typography';
import styled from '@emotion/styled';
import cx from '../../../helpers/classnames';

const StyledTypography = styled(Typography)(() => ({
	color: 'rgba(0, 0, 0, 0.6)',
	fontSize: 12,
	fontWeight: 500,
	marginTop: 4,
	'&.inputError': {
		color: 'var(--danger-400, #ed505f)'
	}
}));

interface InputErrorProps {
	helperText?: string;
	error?: boolean;
	className?: string;
}

const InputError: React.FC<InputErrorProps> = ({ helperText, className = '', error }) => {
	if (!helperText) return null;

	return (
		<StyledTypography className={cx(className, { inputError: error ?? false })}>
			{helperText}
		</StyledTypography>
	);
};

export default InputError;
