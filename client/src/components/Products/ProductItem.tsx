import React from "react";
import { Product } from "../../@types/product.types";
import { Button } from "../Button/Button";

interface ProductItemProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onClick,
}) => {
  return (
    <div className='product'>
      <div className='product__info'>
        <p className='product__category'>{product.category}</p>
        <h2 className='product__name'>{product.name}</h2>
      </div>
      <div className='product__actions'>
        <h2 className='product__price'>
          <span className='currency-symbol'>$</span> {product.price}
        </h2>

        <Button onClick={() => onClick(product)} text='Buy' type='outline' />
      </div>
    </div>
  );
};
