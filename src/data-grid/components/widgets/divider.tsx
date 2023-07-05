import React from 'react';
import styled from '@emotion/styled';

const StyledDivider = styled.hr(() => ({
	margin: 0,
	flexShrink: 0,
	borderWidth: 0,
	borderStyle: 'solid',
	borderColor: 'rgba(0, 0, 0, 0.12)',
	borderBottomWidth: 'thin'
}));

export const Divider: React.FC = ({ ...rest }) => {
	return <StyledDivider {...rest} />;
};
