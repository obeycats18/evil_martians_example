import { Product } from "./../@types/product.types";

const API_BASE_URL = "http://localhost:3001";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);

  return response.json();
};
