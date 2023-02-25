import { useEffect, useState } from 'react'

import { Col, Row, Skeleton } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

import { PagingParams } from '../../app/models/pagination'
import { useStore } from '../../app/stores/store'
import ProductCard from './ProductCard'
import CartIcon from '../../app/layout/CartIcon'
import BackIcon from '../../app/layout/BackIcon'
import SectionTitle from '../../app/layout/SectionTitle'
import ProductSkeleton from '../../app/layout/ProductSkeleton'

export default observer(function ProductList() {
    const [loadingNext, setLoadingNext] = useState(false)
    const { productStore, categoryStore } = useStore()
    const {
        setFilterByCategoryId,
        loadProducts,
        setPagingParams,
        setFilterBySearchTitle,
        pagination,
        productList,
    } = productStore
    const { categoryId, search } = useParams<{
        categoryId: string
        search: string
    }>()

    useEffect(() => {
        if (categoryId) {
            setFilterByCategoryId(categoryId)
            categoryStore.loadCategory(categoryId!)
        }
        if (search) {
            setFilterBySearchTitle(search)
        }
    }, [categoryId, search])

    const loadMoreData = () => {
        setLoadingNext(true)
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadProducts().then(() => setLoadingNext(false))
    }

    return (
        <>
            <Row align="middle" className="mb-16">
                <Col span={4}>
                    <BackIcon />
                </Col>
                <Col span={8} offset={12} className="text-left">
                    <CartIcon />
                </Col>
            </Row>
            {categoryId &&
                (categoryStore.selectedCategory?.name ? (
                    <SectionTitle>دسته بندی {categoryStore.selectedCategory.name}</SectionTitle>
                ) : (
                    <Skeleton.Input active className='mb-16' />
                ))}
            {search && <h2 className="subtitle-text">جستجوی واژه {search}</h2>}
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMoreData}
                hasMore={
                    !loadingNext && !!pagination && pagination.currentPage < pagination.totalPages
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
                <ProductSkeleton />
            )}
        </>
    )
})
