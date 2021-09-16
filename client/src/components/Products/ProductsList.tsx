import React, { useEffect, useReducer, useState } from "react";

import classNames from "classnames";

import { Product } from "../../@types/product.types";

import { ProductItem } from "./ProductItem";
import { ProductModal } from "./ProductModal";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import {
  ActionTypes,
  getCheapestProduct,
  productReducer,
  productState,
} from "../../state/products";
import { getProducts } from "../../API/productAPI";

export const ProductList: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [state, dispatch] = useReducer(productReducer, productState);

  const handleProductClick = (product: Product) => {
    dispatch({ type: ActionTypes.SET_CURRENT, payload: product });
    setModalOpened(true);
  };

  const handleCheapestButtonClick = () => {
    dispatch({
      type: ActionTypes.SET_CURRENT,
      payload: getCheapestProduct(state.products),
    });
    setModalOpened(true);
  };

  const handleModalClose = () => {
    dispatch({ type: ActionTypes.SET_CURRENT, payload: null });
    setModalOpened(false);
  };

  const fetchProducts = async () => {
    const products = await getProducts();
    dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className='product-list'>
        {state.products.map((product: Product) => (
          <ProductItem
            key={product.name}
            onClick={handleProductClick}
            product={product}
          />
        ))}
      </div>

      <div className={classNames("content--hidden", { visible: modalOpened })}>
        <Modal onClose={handleModalClose} opened={modalOpened}>
          <ProductModal onClose={handleModalClose} product={state.current} />
        </Modal>
      </div>

      <div className='tools'>
        <Button
          type='filled'
          text='Buy cheapest'
          onClick={handleCheapestButtonClick}
          minWidth='235px'
        />
      </div>
    </>
  );
};
