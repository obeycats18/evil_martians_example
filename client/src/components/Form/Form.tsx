import React, {
  FormEvent,
  HTMLInputTypeAttribute,
  PropsWithChildren,
} from "react";
import { UseFormReturnValue } from "../../hooks/useForm";
import { Field } from "./Field";

export type FormField = {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
};

interface FormOptions<T = {}> extends UseFormReturnValue<T> {}

interface FormProps<T> {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  fields: FormField[];
  options: FormOptions<T>;
}

export function Form<T extends { [key: string]: any }>({
  onSubmit,
  children,
  fields,
  options,
}: PropsWithChildren<FormProps<T>>) {
  if (!fields) {
    console.error("Field must be specified!");
    return null;
  }

  const { valid, values, handleBlur, handleChange, errors } = options;

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <Field
          key={field.name}
          value={values[field.name]}
          onChange={handleChange(field.name)}
          onBlur={handleBlur(field.name)}
          errors={errors && errors[field.name]}
          isValid={valid[field.name]}
          type='text'
          className='product-form__field'
          placeholder='Name'
        />
      ))}

      {children}
    </form>
  );
}
