import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useStore } from "../../app/stores/store";
import Header from "./Header";
import CategoryList from "./CategoryList";
import BestProducts from "../product/BestProducts";
import { useEffect } from "react";
// import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function CategoryPage() {
  const { branchStore } = useStore();
  const { branchId, tableNumber } = useParams<{
    branchId: string;
    tableNumber: string;
  }>();

  useEffect(() => {
    branchStore.loadBranch(branchId);
  }, [branchStore, branchId]);

  //if (!branchStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      {/* Header */}
      <Header
        restaurantName={branchStore.selectedBranch?.name}
        logo={branchStore.selectedBranch?.logo}
      />
      {/* Search Bar */}
      <Input
        className="search-field"
        size="large"
        placeholder="چی میل داری؟"
        prefix={<SearchOutlined />}
      />
      {/* Category List */}
      <CategoryList />
      {/* Best Products */}
      <BestProducts />
    </>
  );
});
