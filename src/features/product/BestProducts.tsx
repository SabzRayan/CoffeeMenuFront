import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";

export default observer(function BestProducts() {
  return (
    <>
      <h2 className="subtitle-text">پیشنهاد سرآشپز</h2>
      <Row align="middle" gutter={[16, 16]} className="category-list">
        <Col span={12}>
          <ProductCard
            image="/assets/images/salad-plate.png"
            title="سالاد سزار"
            price={150000}
            likesCount={8}
          />
        </Col>
        <Col span={12}>
          <ProductCard
            image="/assets/images/salad-plate.png"
            title="سالاد تزار"
            price={120000}
            likesCount={5}
          />
        </Col>
        <Col span={12}>
          <ProductCard
            image="/assets/images/salad-plate.png"
            title="سالاد سزار"
            price={150000}
            likesCount={3}
          />
        </Col>
        <Col span={12}>
          <ProductCard
            image="/assets/images/salad-plate.png"
            title="سالاد تزار"
            price={120000}
            likesCount={2}
          />
        </Col>
      </Row>
    </>
  );
});
