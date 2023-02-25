import { Col, Row, Skeleton } from 'antd'

import classes from './ProductSkeleton.module.scss'

function ProductSkeleton({ num = 4 }) {
    let items: Array<JSX.Element> = []
    for (let index = 0; index < num; index++) {
        items.push(
            <Col span={12}>
                <Skeleton.Image active className={classes.imageSkeleton} />
                <Skeleton paragraph={{ rows: 1, width: '100%' }} active />
            </Col>
        )
    }

    return (
        <Row align="middle" gutter={[16, 16]}>
            {items}
        </Row>
    )
}

export default ProductSkeleton
