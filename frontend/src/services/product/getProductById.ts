import { fetcher } from "../../utils/fetcher";

export const getProductById = (id: string) => {
  return fetcher(`http://localhost:3001/product/${id}`);
};
