import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Col, Row, Skeleton } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PagingParams } from "../../app/models/pagination";
import { useStore } from "../../app/stores/store";
import ProductCard from "./ProductCard";
import InfiniteScroll from "react-infinite-scroller";
import CartIcon from "../../app/layout/CartIcon";

export default observer(function ProductList() {
  const navigate = useNavigate();
  const [loadingNext, setLoadingNext] = useState(false);
  const { productStore, categoryStore } = useStore();
  const {
    setFilterByCategoryId,
    loadProducts,
    setPagingParams,
    pagination,
    productList,
  } = productStore;
  const { categoryId } = useParams<{
    categoryId: string;
  }>();

  useEffect(() => {
    setFilterByCategoryId(categoryId);
    categoryStore.loadCategory(categoryId!);
  }, [categoryId]);

  const loadMoreData = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadProducts().then(() => setLoadingNext(false));
  };

  return (
    <>
      <Row align="middle">
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
      <h2 className="subtitle-text">
        دسته بندی{" "}
        {categoryStore.selectedCategory?.name ? (
          categoryStore.selectedCategory.name
        ) : (
          <Skeleton.Input active />
        )}
      </h2>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreData}
        hasMore={
          !loadingNext &&
          !!pagination &&
          pagination.currentPage < pagination.totalPages
        }
        initialLoad={false}
      >
        <Row align="middle" gutter={[16, 16]} className="category-list">
          {productList.map((product) => (
            <Col span={12} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
      {(loadingNext || productStore.loadingInitial) && (
        <Row align="middle" gutter={[16, 16]} className="category-list">
          <Col span={12}>
            <Skeleton avatar paragraph={{ rows: 2 }} active />
          </Col>
          <Col span={12}>
            <Skeleton avatar paragraph={{ rows: 2 }} active />
          </Col>
        </Row>
      )}
    </>
  );
});
