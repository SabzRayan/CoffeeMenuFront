import { ConfigProvider } from "antd";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom"; //useLocation
import HomePage from "../../features/home/HomePage";
//import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import CategoryPage from "../../features/category/CategoryPage";
import ProductDetail from "../../features/product/ProductDetail";
import ProductList from "../../features/product/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useStore } from "../stores/store";
// import LoadingComponent from "./LoadingComponent";
//import ModalContainer from "../common/modals/ModalContainer";
//import PrivateRoute from "./PrivateRoute";
//import RegisterSuccess from "../../features/users/RegisterSuccess";
//import ConfirmEmail from "../../features/users/ConfirmEmail";

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
  //const location = useLocation();
  //const { commonStore } = useStore(); //userStore

  // useEffect(() => {
  //if (commonStore.token) {
  //  userStore.getUser().finally(() => commonStore.setAppLoaded());
  //} else {
  //  commonStore.setAppLoaded();
  //}
  // }, [commonStore, userStore]);

  // if (!commonStore.appLoaded) return <LoadingComponent />;

  return (
    <ConfigProvider direction="rtl">
      <RouterProvider router={router} />
      {/* <ToastContainer position="bottom-right" hideProgressBar /> */}
      {/* <ModalContainer /> */}
      {/* <Route path="/" element={<HomePage />} /> */}
      {/* <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Content>
              <Switch> */}
      {/* <Route path="/branch/:branchId/:tableNumber" element={<CategoryPage />} /> */}
      {/* <Route
        path="/branch/:branchId/:tableNumber/category/:categoryId"
        element={<ProductList />}
      /> */}
      {/* <Route
        path="/branch/:branchId/:tableNumber/product/:productId"
        element={<ProductDetail />}
      /> */}
      {/* <Route path="/server-error" element={<ServerError />} /> */}
      {/* <Route element={<NotFound />} /> */}
      {/* </Switch>
            </Content>
          </>
        )}
      /> */}
    </ConfigProvider>
  );
}

export default observer(App);
