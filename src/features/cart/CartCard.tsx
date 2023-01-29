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
            src={
              product.product.attachments[0]
                ? `https://coffeemenu.ir${product.product.attachments[0].url}`
                : "https://coffeemenu.ir/attachments/w0qtvcjm.jli/default-food.png"
            }
          />
        }
        title={
          <h3 className="food-cart-title">
            {product.product.title}{" "}
            {product.product.productPrices.length > 1 &&
              `(${product.price.title})`}
          </h3>
        }
        description={
          <>
            <Space direction="vertical" className="food-cart-change-count">
              <Button
                size="small"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() =>
                  cartStore.changeCount(
                    product.productId,
                    product.count + 1,
                    product.price
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
                    product.count - 1,
                    product.price
                  )
                }
              />
            </Space>
            <span className="food-cart-count">{product.count} عدد</span>
            <br />
            <span className="food-cart-price">
              {(product.price.price * product.count).toLocaleString()} تومان
            </span>
          </>
        }
      />
    </Card>
  );
});
