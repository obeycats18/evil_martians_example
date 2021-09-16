import {
  isRequired,
  isContainsLetter,
  isContainsDigital,
  isMoreThen,
} from "./common.validators";
export const productFormValidators = {
  name: [
    {
      rule: (value: string) => isRequired(value),
      error_message: "This field in required",
    },
    {
      rule: (value: string) => isContainsLetter(value),
      error_message: "Only letters allowed",
    },
  ],
  phone: [
    {
      rule: (value: string) => isRequired(value),
      error_message: "This field in required",
    },
    {
      rule: (value: string) => isContainsDigital(value),
      error_message: "Only numbers allowed",
    },
    {
      rule: (value: string) => isMoreThen(value, 12),
      error_message: "Should contain 12 characters",
    },
  ],
};
