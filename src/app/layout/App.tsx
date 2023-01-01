import { ConfigProvider, Layout } from "antd";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom"; //useLocation
import HomePage from "../../features/home/HomePage";
//import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import CategoryPage from "../../features/category/CategoryPage";
import ProductDetail from "../../features/product/ProductDetail";
import ProductList from "../../features/product/ProductList";
// import { useStore } from "../stores/store";
// import LoadingComponent from "./LoadingComponent";
//import ModalContainer from "../common/modals/ModalContainer";
//import PrivateRoute from "./PrivateRoute";
//import RegisterSuccess from "../../features/users/RegisterSuccess";
//import ConfirmEmail from "../../features/users/ConfirmEmail";

function App() {
  const { Content } = Layout;
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
      {/* <ToastContainer position="bottom-right" hideProgressBar /> */}
      {/* <ModalContainer /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Content>
              <Switch> */}
        <Route
          exact
          path="/branch/:branchId/:tableNumber"
          component={CategoryPage}
        />
        <Route
          path="/branch/:branchId/:tableNumber/category/:categoryId"
          component={ProductList}
        />
        <Route
          path="/branch/:branchId/:tableNumber/product/:productId"
          component={ProductDetail}
        />
        <Route path="/server-error" component={ServerError} />
        <Route component={NotFound} />
      </Switch>
      {/* </Switch>
            </Content>
          </>
        )}
      /> */}
    </ConfigProvider>
  );
}

export default observer(App);
