import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import Category from "./Category";

export default observer(function CategoryList() {
  const { categoryStore } = useStore();
  const { branchId } = useParams<{
    branchId: string;
  }>();

  useEffect(() => {
    categoryStore.setfilterByBranchId(branchId);
    categoryStore.loadCategories();
  }, [categoryStore, branchId]);

  return (
    <>
      <h2 className="subtitle-text">دسته بندی ها</h2>
      <Row align="middle" gutter={[16, 24]} className="category-list">
        {categoryStore.categoryList.map((category) => (
          <Col span={6} key={category.id}>
            <Category
              image={`https://coffeemenu.ir${category.attachments[0].url}`}
              title={category.name}
              categoryId={category.id}
            />
          </Col>
        ))}
        {/* <Col span={6}>
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
        </Col> */}
      </Row>
    </>
  );
});
