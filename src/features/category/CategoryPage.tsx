import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useStore } from "../../app/stores/store";
import Header from "./Header";
import CategoryList from "./CategoryList";
import BestProducts from "../product/BestProducts";
import { useEffect } from "react";

export default observer(function CategoryPage() {
  const { branchStore } = useStore();
  const { branchId } = useParams<{
    branchId: string;
  }>();

  useEffect(() => {
    branchStore.loadBranch(branchId!);
  }, [branchStore, branchId]);

  return (
    <>
      <Header
        restaurantName={branchStore.selectedBranch?.name}
        logo={branchStore.selectedBranch?.logo}
      />
      <Input
        className="search-field"
        size="large"
        placeholder="چی میل داری؟"
        prefix={<SearchOutlined />}
      />
      <CategoryList />
      <BestProducts />
    </>
  );
});
