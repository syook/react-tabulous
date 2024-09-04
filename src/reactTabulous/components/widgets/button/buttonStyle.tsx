import styled from '@emotion/styled';

export const ButtonStyle = styled.button`
  &.buttonV2 {
    cursor: pointer;
    border: none;
    padding: 10px;
    display: inline-flex;
    font-size: 14px;
    box-sizing: border-box;
    font-weight: 600;
    border-radius: 4px;
    line-height: 16px;
    position: relative;
    font-family: var(--font-family);
    align-items: center;
  }

  &.buttonV2[disabled],
  &.buttonV2.buttonV2-loading {
    cursor: not-allowed;
  }

  &.buttonV2[disabled] .buttonV2__icon svg {
    fill: var(--grey-400, #b1b1b1) !important;
  }

  &.buttonV2.button-size-normal {
    padding: 10px 20px;
  }
  &.buttonV2.button-size-medium {
    padding: 6px 12px;
  }
  &.buttonV2.button-size-small {
    padding: 6px 12px;
  }

  /* contained button */
  &.buttonV2.button-contained {
    color: var(--white-600, #ffffff);
  }

  &.buttonV2.button-contained[disabled] {
    background-color: var(--grey-400, #b1b1b1) !important;
  }

  /* outline button - primary */

  &.buttonV2.button-contained-primary {
    background-color: var(--primary-400, #115bb2);
  }

  &.buttonV2.button-contained-primary:hover {
    background-color: var(--primary-500, #0e4b92);
  }

  /* outline button - secondary */

  &.buttonV2.button-contained-secondary {
    background-color: var(--grey-500, #5f6368);
  }

  &.buttonV2.button-contained-secondary:hover {
    background-color: var(--grey-600, #2c2e30);
  }

  /* outline button - success */

  &.buttonV2.button-contained-success {
    background-color: var(--success-400, #05951b);
  }

  &.buttonV2.button-contained-success:hover {
    background-color: var(--success-500, #047a16);
  }

  /* outline button - danger */

  &.buttonV2.button-contained-danger {
    background-color: var(--danger-400, #ed505f);
  }

  &.buttonV2.button-contained-danger:hover {
    background-color: var(--danger-500, #c2424e);
  }

  /* primary button - loading */
  &.buttonV2-loading svg {
    opacity: 0;
  }

  &.buttonV2-loading .btnLoader {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    position: relative;
  }

  &.buttonV2-loading .btnLoader::before {
    position: absolute;
    content: '';
    top: 60%;
    left: 60%;
    margin: -0.64285714em 0 0 -0.64285714em;
    width: 14px;
    height: 14px;
    border-radius: 500rem;
    border: 0.2em solid var(--white-600, #ffffff);
    opacity: 0.5;
  }

  &.buttonV2-loading .btnLoader::after {
    position: absolute;
    content: '';
    top: 60%;
    left: 60%;
    margin: -0.64285714em 0 0 -0.64285714em;
    width: 14px;
    height: 14px;
    animation: button-spin 0.6s linear;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: var(--white-600, #ffffff) transparent transparent;
    border-style: solid;
    border-width: 0.2em;
    box-shadow: 0 0 0 1px transparent;
  }

  &.buttonV2.button-contained-primary.buttonV2-loading,
  &.buttonV2.button-contained-primary.buttonV2-loading:hover {
    background-color: var(--primary-300, #588cc9);
  }

  &.buttonV2.button-contained-success.buttonV2-loading,
  &.buttonV2.button-contained-success.buttonV2-loading:hover {
    background-color: var(--success-300, #50b55f);
  }

  &.buttonV2.button-contained-danger.buttonV2-loading,
  &.buttonV2.button-contained-danger.buttonV2-loading:hover {
    background-color: var(--danger-300, #f2858f);
  }

  &.buttonV2.button-contained-secondary.buttonV2-loading,
  &.buttonV2.button-contained-secondary.buttonV2-loading:hover {
    background-color: var(--grey-400, #b1b1b1);
  }

  &.buttonV2.button-primary .btn-loading .btnLoader circle {
    stroke: var(--white-600, #ffffff);
  }

  /* outline button */

  &.buttonV2.button-outline {
    background-color: var(--white-600, #ffffff);
    outline-color: transparent;
  }

  &.buttonV2.button-outline[disabled] {
    color: var(--grey-400, #b1b1b1) !important;
    box-shadow:
      0 0 0 1px var(--grey-400, #b1b1b1) inset,
      0 0 0 0 var(--grey-400, #b1b1b1) inset !important;
    background-color: var(--white-600, #ffffff) !important;
  }

  /* outline button - primary */
  &.buttonV2.button-outline-primary {
    color: var(--primary-400, #115bb2);
    box-shadow:
      0 0 0 1px var(--primary-400, #115bb2) inset,
      0 0 0 0 var(--primary-400, #115bb2) inset;
  }

  &.buttonV2.button-outline-primary:hover {
    color: var(--primary-500, #0e4b92);
    background-color: var(--primary-100, #f5f8fc);
    box-shadow:
      0 0 0 1px var(--primary-500, #0e4b92) inset,
      0 0 0 0 var(--primary-500, #0e4b92) inset;
  }

  &.buttonV2.button-outline-primary.buttonV2-loading {
    color: var(--primary-300, #588cc9);
    box-shadow:
      0 0 0 1px var(--primary-300, #588cc9) inset,
      0 0 0 0 var(--primary-300, #588cc9) inset;
  }

  &.buttonV2.button-outline-primary.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--primary-300, #588cc9);
  }

  &.buttonV2.button-outline-primary.buttonV2-loading .btnLoader::after {
    border-color: var(--primary-300, #588cc9) transparent transparent;
  }

  /* outline button - secondary */

  &.buttonV2.button-outline-secondary {
    color: var(--grey-500, #5f6368);
    box-shadow:
      0 0 0 1px var(--grey-500, #5f6368) inset,
      0 0 0 0 var(--grey-500, #5f6368) inset;
  }

  &.buttonV2.button-outline-secondary:hover {
    color: var(--grey-600, #2c2e30);
    background-color: var(--grey-100, #fafafa);
    box-shadow:
      0 0 0 1px var(--grey-600, #2c2e30) inset,
      0 0 0 0 var(--grey-600, #2c2e30) inset;
  }

  &.buttonV2.button-outline-secondary.buttonV2-loading {
    color: var(--grey-300, #e5e5e5);
    box-shadow:
      0 0 0 1px var(--grey-300, #e5e5e5) inset,
      0 0 0 0 var(--grey-300, #e5e5e5) inset;
  }

  &.buttonV2.button-outline-secondary.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--grey-300, #e5e5e5);
  }

  &.buttonV2.button-outline-secondary.buttonV2-loading .btnLoader::after {
    border-color: var(--grey-300, #e5e5e5) transparent transparent;
  }

  /* outline button - success */

  &.buttonV2.button-outline-success {
    color: var(--success-400, #05951b);
    box-shadow:
      0 0 0 1px var(--success-400, #05951b) inset,
      0 0 0 0 var(--success-400, #05951b) inset;
  }

  &.buttonV2.button-outline-success:hover {
    color: var(--success-500, #047a16);
    background-color: var(--success-100, #f5fbf6);
    box-shadow:
      0 0 0 1px var(--success-500, #047a16) inset,
      0 0 0 0 var(--success-500, #047a16) inset;
  }

  &.buttonV2.button-outline-success.buttonV2-loading {
    color: var(--success-300, #50b55f);
    box-shadow:
      0 0 0 1px var(--success-300, #50b55f) inset,
      0 0 0 0 var(--success-300, #50b55f) inset;
  }

  &.buttonV2.button-outline-success.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--success-300, #50b55f);
  }

  &.buttonV2.button-outline-success.buttonV2-loading .btnLoader::after {
    border-color: var(--success-300, #50b55f) transparent transparent;
  }

  /* outline button - danger */

  &.buttonV2.button-outline-danger {
    color: var(--danger-400, #ed505f);
    box-shadow:
      0 0 0 1px var(--danger-400, #ed505f) inset,
      0 0 0 0 var(--danger-400, #ed505f) inset;
  }

  &.buttonV2.button-outline-danger:hover {
    color: var(--danger-500, #c2424e);
    background-color: var(--danger-100, #fef8f9);
    box-shadow:
      0 0 0 1px var(--danger-500, #c2424e) inset,
      0 0 0 0 var(--danger-500, #c2424e) inset;
  }

  &.buttonV2.button-outline-danger.buttonV2-loading {
    color: var(--danger-300, #f2858f);
    box-shadow:
      0 0 0 1px var(--danger-300, #f2858f) inset,
      0 0 0 0 var(--danger-300, #f2858f) inset;
  }

  &.buttonV2.button-outline-danger.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--danger-300, #f2858f);
  }

  &.buttonV2.button-outline-danger.buttonV2-loading .btnLoader::after {
    border-color: var(--danger-300, #f2858f) transparent transparent;
  }

  /* text button */

  &.buttonV2.button-text {
    border: none;
    background-color: transparent;
  }

  &.buttonV2.button-text[disabled] {
    color: var(--grey-400, #b1b1b1) !important;
    border: none !important;
    background-color: transparent !important;
  }

  /* text button - primary */

  &.buttonV2.button-text-primary:hover {
    background-color: var(--primary-100, #f5f8fc);
  }

  &.buttonV2.button-text-primary {
    color: var(--primary-400, #115bb2);
  }

  &.buttonV2.button-text-primary.buttonV2-loading {
    color: var(--primary-300, #588cc9);
    background: transparent !important;
  }

  &.buttonV2.button-text-primary.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--primary-300, #588cc9);
  }

  &.buttonV2.button-text-primary.buttonV2-loading .btnLoader::after {
    border-color: var(--primary-300, #588cc9) transparent transparent;
  }

  /* text button - secondary */

  &.buttonV2.button-text-secondary:hover {
    background-color: var(--grey-100, #fafafa);
  }

  &.buttonV2.button-text-secondary {
    color: var(--grey-500, #5f6368);
  }

  &.buttonV2.button-text-secondary.buttonV2-loading {
    color: var(--grey-500, #5f6368);
    background: transparent !important;
  }

  &.buttonV2.button-text-secondary.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--grey-400, #b1b1b1);
  }

  &.buttonV2.button-text-secondary.buttonV2-loading .btnLoader::after {
    border-color: var(--grey-500, #5f6368) transparent transparent;
  }

  /* text button - success */

  &.buttonV2.button-text-success:hover {
    background-color: var(--success-100, #f5fbf6);
  }

  &.buttonV2.button-text-success {
    color: var(--success-400, #05951b);
  }

  &.buttonV2.button-text-success.buttonV2-loading {
    color: var(--success-300, #50b55f);
    background: transparent !important;
  }

  &.buttonV2.button-text-success.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--success-300, #50b55f);
  }

  &.buttonV2.button-text-success.buttonV2-loading .btnLoader::after {
    border-color: var(--success-300, #50b55f) transparent transparent;
  }

  /* text button - danger */

  &.buttonV2.button-text-danger:hover {
    background-color: var(--danger-100, #fef8f9);
  }

  &.buttonV2.button-text-danger {
    color: var(--danger-400, #ed505f);
  }

  &.buttonV2.button-text-danger.buttonV2-loading {
    color: var(--danger-300, #f2858f);
    background: transparent !important;
  }

  &.buttonV2.button-text-danger.buttonV2-loading .btnLoader::before {
    border: 0.2em solid var(--danger-300, #f2858f);
  }

  &.buttonV2.button-text-danger.buttonV2-loading .btnLoader::after {
    border-color: var(--danger-300, #f2858f) transparent transparent;
  }

  &.buttonV2.btn-vertical {
    flex-direction: column;
  }

  &.buttonV2:focus-visible,
  &.buttonV2:focus,
  &.buttonV2:active,
  &.buttonV2:hover {
    outline-color: var(--primary-400, #115bb2);
  }

  & .buttonV2__icon {
    margin-right: 4px;
    line-height: normal;
    height: 16px;
    width: 16px;
    display: flex;
    align-items: center;
  }

  &.buttonV2.btn-vertical .buttonV2__icon {
    margin: 0 0 4px;
  }

  &.buttonV2.btn-vertical .buttonV2__icon i {
    margin: 0;
  }
`;
