export const getCategories = async () => {
  const res = await fetch("http://localhost:3001/category");
  if (!res.ok) {
    throw new Error("Erro ao carregar categorias");
  }
  return res.json();
};
