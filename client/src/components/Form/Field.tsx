import React, { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";

import classNames from "classnames";

interface FieldProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  errors?: string[] | null;
  className?: string;
  isValid?: boolean;
  name?: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Field: React.FC<FieldProps> = ({
  type,
  placeholder,
  errors,
  className,
  isValid,
  name,
  onBlur,
  onChange,
}) => {
  return (
    <div
      className={classNames(
        "field ",
        className,
        isValid === undefined ? "" : isValid ? "field--success" : "field--error"
      )}>
      <input
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        type={type || "text"}
        className='field__input'
        placeholder={placeholder}
      />

      {errors &&
        errors.map((error) => (
          <span key={error} className='field__error-message'>
            {error}
          </span>
        ))}
    </div>
  );
};
