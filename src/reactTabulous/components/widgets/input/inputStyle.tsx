import styled from '@emotion/styled';

export const InputStyle = styled.div`
  &.inputV2 {
    position: relative;
    width: 100%;
    height: 36px;
  }

  &.inputV2.input__inline {
    display: flex;
    margin-bottom: 18px;
  }

  &.inputV2 .inputV2__body {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &.inputV2 .inputV2__content {
    width: 100%;
  }

  &.inputV2 .inputV2__label__icon {
    color: #969696;
    margin-left: 5px;
  }

  &.inputV2 textarea,
  &.inputV2 input {
    width: 100%;
    padding: 6px 10px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    border: 1px solid var(--grey-400, #b1b1b1);
    background: #ffffff;
    border-radius: 4px;
    color: #000;
    font-family: var(--font-family);
    box-sizing: border-box;
    &:focus-visible {
      outline-color: var(--primary-400, #115bb2);
    }
  }

  &.inputV2 textarea {
    resize: none;
  }

  &.inputV2 textarea:disabled,
  &.inputV2 input:disabled {
    background: #f2f2f2;
    border-color: #f2f2f2;
    color: #a1a1a1;
  }

  &.inputV2 textarea.input__error,
  &.inputV2 input.input__error {
    color: red;
    border: 1px solid red;
  }

  &.inputV2 textarea:focus-visible {
    outline: #2684ff auto 1px;
  }

  &.inputV2 textarea.startIcon,
  &.inputV2 input.startIcon {
    padding-left: 40px;
  }

  &.inputV2 input.endIcon {
    padding-right: 40px;
  }

  &.inputV2 .startAdornment {
    left: 0;
    width: 40px;
    height: auto;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.inputV2 .endAdornment {
    right: 0;
    width: 40px;
    height: auto;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.inputV2 .startAdornment svg,
  &.inputV2 .endAdornment svg {
    margin: 0;
  }
`;
