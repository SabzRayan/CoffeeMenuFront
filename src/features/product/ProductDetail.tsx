import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Carousel, Col, List, Row } from "antd";
import { observer } from "mobx-react-lite";

export default observer(function ProductDetail() {
  const imageList = [
    "/assets/images/food-detail.png",
    "/assets/images/food-detail.png",
    "/assets/images/food-detail.png",
  ];
  const title = "سالاد سزار";
  const data = ["شامل آب، نان، مرغ، تخم مرغ", "320 کالری", ""];

  return (
    <>
      <Carousel autoplay dotPosition="bottom">
        {imageList.map((url, index) => (
          <img alt="food" src={url} width="100%" key={index} />
        ))}
      </Carousel>
      <Row className="product-detail-header" align="middle">
        <Col span={4}>
          <ArrowRightOutlined className="back-icon" />
        </Col>
        {/* <Col span={8} offset={12} className="title-icons">
          <Badge size="small" count={2} offset={[-5, 10]}>
            <ShoppingCartOutlined className="header-icon" />
          </Badge>
        </Col> */}
      </Row>

      <List
        className="product-detail-list"
        header={
          <>
            <h2>{title}</h2>
            <hr color="#353535" />
          </>
        }
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />

      <Button className="product-detail-add-basket-button">
        افزودن به سبد خرید - T150,000
      </Button>
    </>
  );
});
