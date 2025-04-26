import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export interface Product {
  id: string;
  name: string;
  price: number;
  qty: number;
  photo: string;
}

export const useProducts = () => {
  return useSWR<Product[]>("http://localhost:3001/product", fetcher);
};
