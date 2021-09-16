import React from "react";
import { useForm } from "../../hooks/useForm";
import { productFormValidators } from "../../validators/product.validator";

import { Button } from "../Button/Button";
import { Form, FormField } from "../Form/Form";

type ProductFormValues = { name: string; phone: string };

interface ProductFormProps {
  onClose: () => void;
}

const fields: FormField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Name",
    className: "product-form__field",
  },
  {
    name: "phone",
    type: "text",
    placeholder: "Number",
    className: "product-form__field",
  },
];

export const ProductForm: React.FC<ProductFormProps> = ({ onClose }) => {
  const form = useForm<ProductFormValues>({
    initialValues: { name: "", phone: "" },
    validators: productFormValidators,
    onSubmit: (e) => {
      console.log(form.values);
      onClose();
    },
  });

  return (
    <Form<ProductFormValues>
      onSubmit={form.handleSubmit}
      fields={fields}
      options={form}>
      <Button
        text='Order'
        type='filled'
        className='product-form__button'
        minWidth='100%'>
        <div className='arrow-icon'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M4.16663 10H15.8333'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10 4.16666L15.8333 9.99999L10 15.8333'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </Button>
    </Form>
  );
};
