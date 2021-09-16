import { Product } from "./../@types/product.types";

export interface ProductsState {
  products: Product[];
  current: Product | null;
}

export enum ActionTypes {
  SET_PRODUCTS = "PRODUCTS/SET_PRODUCTS",
  SET_CURRENT = "PRODUCTS/SET_CURRENT",
}

type ActionType = {
  type: ActionTypes;
  payload: any;
};

export const getCheapestProduct = (products: Product[]) => {
  const minPrice = Math.min.apply(
    Math,
    products.map((product) => product.price)
  );

  return products.find((product) => product.price === minPrice);
};

export const productState: ProductsState = {
  products: [],
  current: null,
};

export const productReducer = (
  state: ProductsState = productState,
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case ActionTypes.SET_CURRENT: {
      return { ...state, current: action.payload };
    }
    default: {
      return state;
    }
  }
};
