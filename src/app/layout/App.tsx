import { ConfigProvider } from "antd";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import CategoryPage from "../../features/category/CategoryPage";
import ProductDetail from "../../features/product/ProductDetail";
import ProductList from "../../features/product/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);

function App() {
  return (
    <ConfigProvider direction="rtl">
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default observer(App);
