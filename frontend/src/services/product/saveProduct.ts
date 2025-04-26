export const saveProduct = async (
  id: string,
  data: {
    name: string;
    qty: number;
    price: number;
    photo: string;
    categoryIds: string[];
  }
) => {
  const isEdit = id !== "0";

  const url = isEdit
    ? `http://localhost:3001/product/${id}`
    : `http://localhost:3001/product`;

  const method = isEdit ? "PATCH" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao salvar produto");
  }
};
