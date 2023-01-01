import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import Category from "./Category";

export default observer(function CategoryList() {
  return (
    <>
      <h2 className="subtitle-text">دسته بندی ها</h2>
      <Row align="middle" gutter={[16, 24]} className="category-list">
        <Col span={6}>
          <Category
            image="/assets/images/burger.png"
            title="برگر"
            categoryId="123"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/pizza.png"
            title="پیتزا"
            categoryId="124"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/meat.png"
            title="گوشت قرمز"
            categoryId="125"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/drink.png"
            title="نوشیدنی"
            categoryId="126"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/dessert.png"
            title="دسر"
            categoryId="127"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/salad.png"
            title="سالاد"
            categoryId="128"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/sandwich.png"
            title="ساندویچ"
            categoryId="129"
          />
        </Col>
        <Col span={6}>
          <Category
            image="/assets/images/icecream.png"
            title="بستنی"
            categoryId="130"
          />
        </Col>
      </Row>
    </>
  );
});
