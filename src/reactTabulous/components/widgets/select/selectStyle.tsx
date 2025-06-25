import styled from '@emotion/styled';

export const SelectStyle = styled.select`
  background: var(--widget-bg, #ffffff);
  color: var(--text-color, #000000);
  border: 1px solid var(--border-color, #e5e7eb);
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
