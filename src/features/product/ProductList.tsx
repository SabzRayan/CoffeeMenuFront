import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProductCard from "./ProductCard";

export default observer(function ProductList() {
  const { productStore, categoryStore } = useStore();
  const { categoryId } = useParams<{
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
          <ArrowRightOutlined className="back-icon" />
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
            <ProductCard
              image={`https://coffeemenu.ir${product.attachments[0].url}`}
              title={product.title}
              price={product.price}
              likesCount={product.likeCount}
            />
          </Col>
        ))}
      </Row>
    </>
  );
});
