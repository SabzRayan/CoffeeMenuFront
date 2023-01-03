import {
  ArrowRightOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, List, Row, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";

export default observer(function CartList() {
  const { cartStore } = useStore();
  const { Meta } = Card;
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
            <Card style={{ width: "calc(100% - 30px)" }} className="food-cart">
              <Meta
                avatar={
                  <Avatar
                    className="food-cart-pic"
                    size="large"
                    src={`https://coffeemenu.ir${product.product.attachments[0].url}`}
                  />
                }
                title={
                  <h3 className="food-cart-title">{product.product.title}</h3>
                }
                description={
                  <>
                    <Space
                      direction="vertical"
                      className="food-cart-change-count"
                    >
                      <Button
                        size="small"
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          cartStore.changeCount(
                            product.productId,
                            product.count + 1
                          )
                        }
                      />
                      <Button
                        size="small"
                        type="primary"
                        shape="circle"
                        danger={product.count == 1}
                        icon={
                          product.count == 1 ? (
                            <DeleteOutlined color="red" />
                          ) : (
                            <MinusOutlined />
                          )
                        }
                        onClick={() =>
                          cartStore.changeCount(
                            product.productId,
                            product.count - 1
                          )
                        }
                      />
                    </Space>
                    <span className="food-cart-count">{product.count} عدد</span>
                    <br />
                    <span className="food-cart-price">
                      T{product.price * product.count}
                    </span>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
});
