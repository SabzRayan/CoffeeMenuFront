import { Col, Row, Skeleton } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SectionTitle from '../../app/layout/SectionTitle'
import { useStore } from '../../app/stores/store'
import CategoryItem from './CategoryItem'

export default observer(function CategoryList() {
    const { categoryStore } = useStore()
    const { branchId } = useParams<{
        branchId: string
    }>()

    useEffect(() => {
        categoryStore.setfilterByBranchId(branchId)
        categoryStore.loadCategories()
    }, [categoryStore, branchId])

    if (categoryStore.loadingInitial)
        return (
            <Row align="middle" gutter={[16, 16]} className="mb-16">
                <Col span={6}>
                    <Skeleton.Image active />
                    <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} active />
                </Col>
                <Col span={6}>
                    <Skeleton.Image active />
                    <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} active />
                </Col>
                <Col span={6}>
                    <Skeleton.Image active />
                    <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} active />
                </Col>
                <Col span={6}>
                    <Skeleton.Image active />
                    <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} active />
                </Col>
            </Row>
        )

    return (
        <>
            <SectionTitle>دسته بندی ها</SectionTitle>
            <Row align="middle" gutter={[10, 24]} className="category-list mb-16">
                {categoryStore.categoryList.map((category) => (
                    <Col span={6} key={category.id}>
                        <CategoryItem
                            image={`https://coffeemenu.ir${category.attachments[0].url}`}
                            title={category.name}
                            categoryId={category.id}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
})
