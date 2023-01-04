import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, List, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartIcon from "../../app/layout/CartIcon";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";

export default observer(function ProductDetail() {
  const navigate = useNavigate();
  const { productStore, cartStore } = useStore();
  const { productId } = useParams<{
    productId: string;
  }>();

  useEffect(() => {
    productStore.loadProduct(productId!);
  }, [productStore, productId]);

  const data = [productStore.selectedProduct?.categoryName ?? ""];

  if (productStore.selectedProduct?.description)
    data.push(productStore.selectedProduct?.description);

  if (productStore.selectedProduct?.recipe)
    data.push(productStore.selectedProduct?.recipe);

  if (productStore.selectedProduct?.calory)
    data.push(`کالری: ${productStore.selectedProduct.calory}`);

  if (productStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      <Carousel autoplay dotPosition="bottom">
        {productStore.selectedProduct?.attachments.map((attachment) => (
          <img
            alt="food"
            src={`https://coffeemenu.ir${attachment.url}`}
            width="100%"
            key={attachment.id}
          />
        ))}
      </Carousel>
      <Row className="product-detail-header" align="middle">
        <Col span={4}>
          <ArrowRightOutlined
            className="back-icon"
            onClick={() => navigate(-1)}
          />
        </Col>
        <Col span={8} offset={12} className="title-icons">
          <CartIcon />
        </Col>
      </Row>

      <List
        className="product-detail-list"
        header={
          <>
            <h2>{productStore.selectedProduct?.title}</h2>
            <hr color="#353535" />
          </>
        }
        dataSource={data}
        renderItem={(item: string) => <List.Item>{item}</List.Item>}
      />

      <Button
        onClick={() => cartStore.addToCart(productStore.selectedProduct!)}
        className="product-detail-add-basket-button"
      >
        افزودن به سبد خرید - T{productStore.selectedProduct?.price}
      </Button>
    </>
  );
});
