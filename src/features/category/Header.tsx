import { BellOutlined } from "@ant-design/icons";
import { Col, Row, Image, Badge, Skeleton } from "antd";
import { observer } from "mobx-react-lite";
import CartIcon from "../../app/layout/CartIcon";

interface Props {
  restaurantName: string | undefined;
  logo: string | undefined;
}

export default observer(function Header({ restaurantName, logo }: Props) {
  return (
    <Row align="middle">
      <Col span={4}>
        {restaurantName == undefined ? (
          <Skeleton.Avatar active />
        ) : (
          <Image
            src={`https://coffeemenu.ir${logo}`}
            className="circle-image"
            preview={false}
          />
        )}
      </Col>
      <Col span={12}>
        {restaurantName == undefined ? (
          <Skeleton.Input size="small" active />
        ) : (
          <h1>{restaurantName}</h1>
        )}
      </Col>
      <Col span={8} className="title-icons">
        {/*  <BellOutlined className="header-icon" />*/}
        <CartIcon />
      </Col>
    </Row>
  );
});
