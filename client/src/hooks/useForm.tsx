import { useState, FormEvent, FocusEvent, ChangeEvent } from "react";

type Rule = (value: any) => boolean;

type Validator = {
  rule: Rule;
  error_message: string;
};

type Validations<T> = Partial<Record<keyof T, Validator[]>>;

type ErrorRecord<T> = Partial<Record<keyof T, string[]>>;
type ValidRecord<T> = Partial<Record<keyof T, boolean>>;

type OnBlurFunction = <T>(
  key: Extract<keyof Record<keyof T, any>, string>
) => (e: FocusEvent<HTMLInputElement>) => void;
type OnSubmitFunction = (e: FormEvent<HTMLFormElement>) => void;
type OnChangeFunction = <T>(
  key: Extract<keyof Record<keyof T, any>, string>
) => (e: ChangeEvent<HTMLInputElement>) => void;

interface UseFormOptions<T> {
  initialValues: Partial<T>;
  validators?: Validations<T>;
  onSubmit?: OnSubmitFunction;
}

export interface UseFormReturnValue<T> {
  values: Partial<T>;
  handleChange: OnChangeFunction;
  handleSubmit: OnSubmitFunction;
  handleBlur: OnBlurFunction;
  errors: ErrorRecord<T> | null;
  valid: ValidRecord<T>;
}

export const useForm = <V extends Record<keyof V, any> = {}>(
  options: UseFormOptions<V>
): UseFormReturnValue<V> => {
  const [values, setValues] = useState<V>(options.initialValues as V);
  const [errors, setErrors] = useState<ErrorRecord<V> | null>({});
  const [valid, setValid] = useState<ValidRecord<V>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>();

  const _validate = (key: Extract<keyof Record<keyof V, any>, string>) => {
    const value = values[key];
    const validators = options.validators![key];

    const errorValidators = validators
      ?.filter(({ rule }) => !rule(value))
      .map(({ error_message }) => error_message);

    return {
      isValid: Boolean(!errorValidators?.length),
      error: errorValidators,
    };
  };

  const removeErrorByKey = (
    key: Extract<keyof Record<keyof V, any>, string>,
    errors: ErrorRecord<V> | null
  ) => {
    if (!errors) {
      return null;
    }
    delete errors[key];
    return errors;
  };

  const handleSubmit: OnSubmitFunction = (event) => {
    event.preventDefault();

    if (!options.validators) {
      setErrors(null);
    }

    const _errors: ErrorRecord<V> = {};
    const _validates: ValidRecord<V> = {};

    for (const key in options.validators) {
      _validates[key] = true;

      const { isValid, error } = _validate(key);

      setIsFormValid(isValid);

      if (!isValid) {
        _errors[key] = error;
        _validates[key] = false;
      }
    }

    if (!isFormValid) {
      setErrors(_errors);
      setValid(_validates);

      return;
    }

    if (options.onSubmit && typeof options.onSubmit === "function") {
      options.onSubmit(event);
    }
  };

  const handleBlur: OnBlurFunction = (key) => (event) => {
    event.preventDefault();

    if (!options.validators) {
      return;
    }

    const { isValid, error } = _validate(key);

    setErrors((_errors) => {
      if (!_errors) {
        return null;
      }

      if (!isValid) {
        return { ..._errors, [key]: error };
      }

      return removeErrorByKey(key, _errors);
    });
    setValid((_valid) => ({ ..._valid, [key]: isValid }));
  };

  const handleChange: OnChangeFunction = (key) => (event) => {
    setErrors((_errors) => removeErrorByKey(key, _errors));
    setValid((_valid) => ({ ..._valid, [key]: undefined }));
    setValues((_values) => ({ ..._values, [key]: event.target.value }));
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    valid,
  };
};
