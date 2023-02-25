import { useEffect } from 'react'

import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import SectionTitle from '../../app/layout/SectionTitle'
import { useStore } from '../../app/stores/store'
import ProductCard from './ProductCard'
import ProductSkeleton from '../../app/layout/ProductSkeleton'

export default observer(function BestProducts() {
    const { productStore } = useStore()
    const { branchId } = useParams<{
        branchId: string
    }>()

    useEffect(() => {
        productStore.loadBestProducts(branchId!)
    }, [productStore, branchId])

    if (productStore.loading) return <ProductSkeleton num={2} />

    return (
        <>
            <SectionTitle>پیشنهاد سرآشپز</SectionTitle>
            <Row align="middle" gutter={[16, 16]} className="category-list">
                {productStore.bestProductList.map((product) => (
                    <Col span={12} key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
})
