import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
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

  if (categoryStore.loadingInitial) return <LoadingComponent />;

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
      </Row>
    </>
  );
});
