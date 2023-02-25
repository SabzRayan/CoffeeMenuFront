import { HeartOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

import { Product } from '../../../app/models/product'
import classes from './ProductCard.module.scss'

interface Props {
    product: Product
}

export default observer(function ProductCard({ product }: Props) {
    const { Meta } = Card
    const { branchId, tableNumber } = useParams<{
        branchId: string
        tableNumber: string
    }>()

    return (
        <Link to={`/branch/${branchId}/${tableNumber}/product/${product.id}`}>
            <Card
                className={classes.foodCard}
                bodyStyle={{ padding: '12px' }}
                hoverable
                cover={
                    <img
                        alt="Food"
                        src={
                            product.attachments[0]
                                ? `https://coffeemenu.ir${product.attachments[0].url}`
                                : 'https://coffeemenu.ir/attachments/w0qtvcjm.jli/default-food.png'
                        }
                    />
                }
            >
                <Meta
                    title={<h3 className={classes.title}>{product.title}</h3>}
                    description={
                        <Row align="middle">
                            <Col span={15}>
                                <div className={classes.price}>
                                    {product.price.toLocaleString()} تومان
                                </div>
                            </Col>
                            <Col span={9}>
                                <div className={classes.likeCount}>
                                    <HeartOutlined /> {product.likeCount}
                                </div>
                            </Col>
                        </Row>
                    }
                />
            </Card>
        </Link>
    )
})
