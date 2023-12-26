import React from 'react';
import cx from '../../../helpers/classnames';

import InputLabel from '../inputLabel';
import InputError from '../inputError';
import { InputStyle } from './inputStyle';

interface CustomInputProps {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  labelClass?: string;
  inputClass?: string;
  startAdornmentClass?: string;
  endAdornmentClass?: string;
  helperTextClass?: string;
  helperText?: string;
  infoText?: string;
  error?: boolean;
  inline?: boolean;
  isMultiLine?: boolean;
  isSanitizeValue?: boolean;
  required?: boolean;
}

type InputProps = (
  | (React.InputHTMLAttributes<HTMLInputElement> & { as?: 'input' })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as?: 'textarea' })
) &
  CustomInputProps;

export const Input: React.FC<InputProps> = ({
  name,
  value,
  label,
  onChange = () => {},
  startAdornment = '',
  endAdornment = '',
  className = '',
  labelClass = '',
  inputClass = '',
  startAdornmentClass = '',
  endAdornmentClass = '',
  helperTextClass = '',
  helperText = '',
  infoText = '',
  error = false,
  inline = false,
  isMultiLine = false,
  isSanitizeValue = true,
  required,
  ...rest
}) => {
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e, e.target.value);
  };

  return (
    <InputStyle className={cx('inputV2', { input__inline: inline }, className)}>
      {label && (
        <InputLabel required={required} inline={inline} label={label} infoText={infoText} className={labelClass} />
      )}

      <div className={cx('inputV2__body')}>
        {/* start icon / text can be used */}
        {startAdornment && (
          <div className={cx('startAdornment flex-center', startAdornmentClass)}>{startAdornment}</div>
        )}

        {/* input field */}
        <div className="inputV2__content">
          {isMultiLine ? (
            <textarea
              className={cx(
                'input',
                { input__error: error },
                { startIcon: !!startAdornment },
                { endIcon: !!endAdornment },
                inputClass
              )}
              name={name}
              value={value}
              onChange={onHandleChange}
              {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              className={cx(
                'input',
                { input__error: error },
                { startIcon: !!startAdornment },
                { endIcon: !!endAdornment },
                inputClass
              )}
              name={name}
              value={value}
              onChange={onHandleChange}
              {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          {/* helper text */}
          <InputError className={helperTextClass} helperText={helperText} error={error} />
        </div>

        {/* end icon / text can be used */}
        {endAdornment && <div className={cx('endAdornment flex-center', endAdornmentClass)}>{endAdornment}</div>}
      </div>
    </InputStyle>
  );
};
