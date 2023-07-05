import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CheckboxContainer = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const HiddenCheckbox = styled.input`
	display: none;
`;

const StyledCheckbox = styled.span<{ checked?: boolean | 'indeterminate' }>`
	width: 16px;
	height: 16px;
	border: 1px solid #ccc;
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	${({ checked }) =>
		(checked === true || checked === 'indeterminate') &&
		css`
			background-color: var(--primary-400, #115bb2);
		`}
`;

const CheckSymbol = styled.span`
	color: #fff;
`;

const MinusSymbol = styled.span`
	font-weight: bold;
	color: #fff;
`;

interface CheckboxProps {
	checked?: boolean | 'indeterminate';
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
	// const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);

	// const handleCheckboxChange = (): void => {
	// 	if (checked === true) {
	// 		setChecked('indeterminate');
	// 	} else if (checked === 'indeterminate') {
	// 		setChecked(false);
	// 	} else {
	// 		setChecked(true);
	// 	}
	// };

	return (
		<CheckboxContainer>
			<HiddenCheckbox type="checkbox" checked={checked === true} onChange={onChange} />
			<StyledCheckbox checked={checked}>
				{checked === true ? (
					<CheckSymbol>&#10003;</CheckSymbol>
				) : checked === 'indeterminate' ? (
					<MinusSymbol>-</MinusSymbol>
				) : null}
			</StyledCheckbox>
		</CheckboxContainer>
	);
};
