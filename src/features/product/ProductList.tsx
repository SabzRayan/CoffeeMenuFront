import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";

export default observer(function ProductList() {
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
      <h2 className="subtitle-text">دسته بندی سالاد</h2>
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
