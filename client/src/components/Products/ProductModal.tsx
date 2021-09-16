import React from "react";

import { Product } from "../../@types/product.types";
import { ProductForm } from "./ProductForm";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  return (
    product && (
      <div className='product-modal'>
        <div className='product__info'>
          <p className='product__category'>{product.category}</p>
          <h2 className='product__name'>{product.name}</h2>
          <h2 className='product__price'>
            <span className='currency-symbol'>$</span> {product.price}
          </h2>
        </div>

        <ProductForm onClose={onClose} />
      </div>
    )
  );
};
