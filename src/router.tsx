import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {loader as productsLoader, action as updateAvailabilityAction} from "./pages/Products";
import NewProduct, {action as NewProductAction} from "./pages/NewProduct"; 
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./pages/EditProduct";
import {action as deleteProductAction} from "./components/AlertMessage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: NewProductAction
      },
      {
        path: "productos/:id/editar",
        element: <EditProduct />,
        action: editProductAction,
        loader: editProductLoader
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction
      }
    ]
  }
], {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  }
});
