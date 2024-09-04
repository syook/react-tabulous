import React from 'react';
import styled from '@emotion/styled';

interface SwitchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  size: number;
}

interface SwitchSliderProps {
  size: number;
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
}

const SwitchContainer = styled.label<{ size: number }>`
  display: inline-block;
  position: relative;
  width: ${props => props.size * 2}px;
  height: ${props => props.size}px;
`;

const SwitchInput = styled.input<SwitchInputProps>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: var(--primary-400, #115bb2);
  }

  &:focus + span {
    box-shadow: 0 0 1px var(--primary-400, #115bb2);
  }

  &:checked + span:before {
    transform: translateX(${props => props.size}px);
  }
`;

const SwitchSlider = styled.span<SwitchSliderProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--grey-400, #b1b1b1);
  transition: 0.4s;
  border-radius: ${props => props.size}px;

  &:before {
    position: absolute;
    content: '';
    height: ${props => props.size - 6}px;
    width: ${props => props.size - 6}px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const Switch: React.FC<SwitchProps> = ({ size = 16, checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <SwitchContainer size={size}>
      <SwitchInput type="checkbox" checked={checked} onChange={handleChange} size={size} />
      <SwitchSlider size={size} />
    </SwitchContainer>
  );
};
