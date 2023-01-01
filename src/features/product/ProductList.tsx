import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProductCard from "./ProductCard";

export default observer(function ProductList() {
  const { productStore, categoryStore } = useStore();
  const { branchId, tableNumber, categoryId } = useParams<{
    branchId: string;
    tableNumber: string;
    categoryId: string;
  }>();

  useEffect(() => {
    productStore.setFilterByCategoryId(categoryId);
    productStore.loadProducts();
    categoryStore.loadCategory(categoryId);
  }, [productStore, categoryId, categoryStore]);

  if (categoryStore.loadingInitial || productStore.loadingInitial)
    return <LoadingComponent />;

  return (
    <>
      <Row align="middle">
        <Col span={4}>
          <Link to={`/branch/${branchId}/${tableNumber}`}>
            <ArrowRightOutlined className="back-icon" />
          </Link>
        </Col>
        {/* <Col span={8} offset={12} className="title-icons">
          <Badge size="small" count={2} offset={[-5, 10]}>
            <ShoppingCartOutlined className="header-icon" />
          </Badge>
        </Col> */}
      </Row>
      <h2 className="subtitle-text">
        دسته بندی {categoryStore.selectedCategory?.name}
      </h2>
      <Row align="middle" gutter={[16, 16]} className="category-list">
        {productStore.productList.map((product) => (
          <Col span={12} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
});
