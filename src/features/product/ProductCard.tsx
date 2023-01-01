import { HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default observer(function ProductCard({ product }: Props) {
  const { Meta } = Card;
  const { branchId, tableNumber } = useParams<{
    branchId: string;
    tableNumber: string;
  }>();

  return (
    <Link to={`/branch/${branchId}/${tableNumber}/product/${product.id}`}>
      <Card
        className="food-card"
        hoverable
        cover={
          <img
            className="food-card-pic"
            alt="Food"
            src={`https://coffeemenu.ir${product.attachments[0].url}`}
          />
        }
      >
        <Meta
          title={<h3 className="food-card-title">{product.title}</h3>}
          description={
            <>
              <span className="food-card-price">T{product.price}</span>
              <span className="food-card-like-count">
                <HeartOutlined /> {product.likeCount}
              </span>
            </>
          }
        />
      </Card>
    </Link>
  );
});
