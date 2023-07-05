import styled from '@emotion/styled';

export const SelectStyle = styled.select`
	background: #ffffff;
	border: 1px solid var(--grey-400, #b1b1b1);
	border-radius: 4px;
	box-sizing: border-box;
	font-size: 14px;
	font-weight: 400;
	font-family: var(--font-family);
	padding: 6px 10px;
	&:focus-visible {
		outline-color: var(--primary-400, #115bb2);
	}
`;
