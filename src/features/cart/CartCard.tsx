import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space } from "antd";
import { observer } from "mobx-react-lite";
import { OrderDetail } from "../../app/models/orderDetail";
import { useStore } from "../../app/stores/store";

interface Props {
  product: OrderDetail;
}

export default observer(function CartCard({ product }: Props) {
  const { cartStore } = useStore();
  const { Meta } = Card;

  return (
    <Card className="food-cart">
      <Meta
        avatar={
          <Avatar
            className="food-cart-pic"
            size="large"
            src={`https://coffeemenu.ir${product.product.attachments[0].url}`}
          />
        }
        title={<h3 className="food-cart-title">{product.product.title}</h3>}
        description={
          <>
            <Space direction="vertical" className="food-cart-change-count">
              <Button
                size="small"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() =>
                  cartStore.changeCount(product.productId, product.count + 1)
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
                  cartStore.changeCount(product.productId, product.count - 1)
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
  );
});
