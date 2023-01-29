import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  List,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
} from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
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
  const [selectedPrice, setSelectedPrice] = useState(
    productStore.selectedProduct?.productPrices[0]
  );

  useEffect(() => {
    productStore.loadProduct(productId!);
    return () => {
      setSelectedPrice(undefined);
      productStore.clearSelectedProduct();
    };
  }, [productStore, productId]);

  const data = [productStore.selectedProduct?.categoryName ?? ""];

  if (productStore.selectedProduct?.description)
    data.push(productStore.selectedProduct?.description);

  if (productStore.selectedProduct?.recipe)
    data.push(productStore.selectedProduct?.recipe);

  if (productStore.selectedProduct?.calory)
    data.push(`کالری: ${productStore.selectedProduct.calory}`);

  const priceChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    let selectedPrice = productStore.selectedProduct?.productPrices.find(
      (a) => a.id === e.target.value
    );
    setSelectedPrice(selectedPrice);
  };

  if (productStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      <Carousel autoplay dotPosition="bottom">
        {productStore.selectedProduct?.attachments.length ? (
          productStore.selectedProduct?.attachments.map((attachment) => (
            <img
              alt="food"
              src={`https://coffeemenu.ir${attachment.url}`}
              width="100%"
              key={attachment.id}
            />
          ))
        ) : (
          <img
            alt="food"
            src="https://coffeemenu.ir/attachments/w0qtvcjm.jli/default-food.png"
            width="100%"
          />
        )}
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

      <div className="product-detail-price-container">
        {productStore.selectedProduct &&
          productStore.selectedProduct.productPrices.length > 1 && (
            <Radio.Group
              className="product-detail-radio-group"
              onChange={priceChange}
              defaultValue={productStore.selectedProduct?.productPrices[0].id}
              value={selectedPrice?.id}
            >
              <Space direction="vertical">
                {productStore.selectedProduct?.productPrices.map((price) => (
                  <Radio className="product-detail-radio" value={price.id}>
                    {price.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          )}
        <br />
        <Button
          onClick={() =>
            cartStore.addToCart(
              productStore.selectedProduct!,
              selectedPrice ?? productStore.selectedProduct!.productPrices[0]
            )
          }
          className="product-detail-add-basket-button"
        >
          افزودن به سبد خرید -{" "}
          {selectedPrice
            ? selectedPrice?.price.toLocaleString()
            : productStore.selectedProduct?.price.toLocaleString()}{" "}
          تومان
        </Button>
      </div>
    </>
  );
});
