import { ConfigProvider } from "antd";
import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import CategoryPage from "../../features/category/CategoryPage";
import ProductDetail from "../../features/product/ProductDetail";
import ProductList from "../../features/product/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { store, StoreContext } from "../stores/store";
import "./styles.css";

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
  {
    path: "/not-found",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <ConfigProvider direction="rtl">
      <RouterProvider router={router} />
    </ConfigProvider>
  </StoreContext.Provider>
);

// function App() {
//   return (

//   );
// }

// export default observer(App);
