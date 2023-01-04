import { ConfigProvider } from "antd";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import CategoryPage from "../../features/category/CategoryPage";
import ProductDetail from "../../features/product/ProductDetail";
import ProductList from "../../features/product/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useStore } from "../stores/store";
import "./styles.css";
import { useEffect } from "react";
import CartList from "../../features/cart/CartList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/branch/:branchId/:tableNumber",
    element: <CategoryPage />,
  },
  {
    path: "/branch/:branchId/:tableNumber/cart",
    element: <CartList />,
  },
  {
    path: "/branch/:branchId/:tableNumber/category/:categoryId",
    element: <ProductList />,
  },
  {
    path: "/branch/:branchId/:tableNumber/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/server-error",
    element: <ServerError />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
]);

function App() {
  const { cartStore } = useStore();

  useEffect(() => {
    cartStore.loadCart();
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default observer(App);
