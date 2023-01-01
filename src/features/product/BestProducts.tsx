import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProductCard from "./ProductCard";

export default observer(function BestProducts() {
  const { productStore } = useStore();
  const { branchId } = useParams<{
    branchId: string;
  }>();

  useEffect(() => {
    productStore.loadBestProducts(branchId!);
  }, [productStore, branchId]);

  if (productStore.loading) return <LoadingComponent />;

  return (
    <>
      <h2 className="subtitle-text">پیشنهاد سرآشپز</h2>
      <Row align="middle" gutter={[16, 16]} className="category-list">
        {productStore.bestProductList.map((product) => (
          <Col span={12}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
});
