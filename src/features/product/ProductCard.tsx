import { HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  title: string;
  price: number;
  likesCount: number;
}

export default observer(function ProductCard(props: Props) {
  const { Meta } = Card;
  const productId = 1;
  const tableNumber = 1;

  return (
    <Link to={`${tableNumber}/product/${productId}`}>
      <Card
        className="food-card"
        hoverable
        cover={<img className="food-card-pic" alt="Food" src={props.image} />}
      >
        <Meta
          title={<h3 className="food-card-title">{props.title}</h3>}
          description={
            <>
              <span className="food-card-price">T{props.price}</span>
              <span className="food-card-like-count">
                <HeartOutlined /> {props.likesCount}
              </span>
            </>
          }
        />
      </Card>
    </Link>
  );
});
