import { api } from "./api";

export interface Category {
  id: string;
  name: string;
  parent?: Category | null;
}

export interface Product {
  id: string;
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: Category[];
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};
