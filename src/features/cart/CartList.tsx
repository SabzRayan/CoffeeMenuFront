import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, List, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import CartCard from "./CartCard";

export default observer(function CartList() {
  const { cartStore } = useStore();
  const navigate = useNavigate();

  return (
    <>
      <Row align="middle">
        <Col span={4}>
          <ArrowRightOutlined
            className="back-icon"
            onClick={() => navigate(-1)}
          />
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={cartStore.cart.slice()}
        renderItem={(product) => (
          <List.Item>
            <CartCard product={product} />
          </List.Item>
        )}
      />
    </>
  );
});
