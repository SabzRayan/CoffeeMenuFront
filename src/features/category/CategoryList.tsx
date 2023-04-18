import { Col, Row, Skeleton } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import SectionTitle from '../../app/layout/SectionTitle'
import { Category } from '../../app/models/category'
import { useStore } from '../../app/stores/store'
import CategoryItem from './CategoryItem'

export default observer(function CategoryList() {
    const { categoryStore } = useStore()
    const { branchId } = useParams<{
        branchId: string
    }>()
    categoryStore.setfilterByBranchId(branchId);
    const { data, isLoading, error } = useQuery<Category[]>(
      ["categories", branchId],
      categoryStore.fetchCategories,
      {
        refetchInterval: 100000, // refetch every 100 seconds
        refetchOnMount: false, // don't refetch on mount
      }
    );

    // useEffect(() => {
    //     categoryStore.setfilterByBranchId(branchId)
    //     categoryStore.loadCategories()
    // }, [categoryStore, branchId])

    if (isLoading)
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
                {data?.map((category) => (
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
