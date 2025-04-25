import { createBrowserRouter } from "react-router-dom";
import { ProductList } from "../pages/ProductList";
import { ProductForm } from "../pages/ProductForm";

export const router = createBrowserRouter([
  {
    path: "/product",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <ProductForm />,
  },
]);
