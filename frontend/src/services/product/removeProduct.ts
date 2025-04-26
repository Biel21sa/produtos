import { mutate } from "swr";

export const removeProduct = async (id: string) => {
  await fetch(`http://localhost:3001/product/${id}`, {
    method: "DELETE",
  });
  mutate("http://localhost:3001/product");
};
