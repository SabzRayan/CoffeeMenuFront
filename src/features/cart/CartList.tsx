import { Col, List, Row } from 'antd'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../app/stores/store'
import CartItem from './CartItem'
import BackIcon from '../../app/layout/BackIcon'
import SectionTitle from '../../app/layout/SectionTitle'

export default observer(function CartList() {
    const { cartStore } = useStore()

    return (
        <>
            <Row align="middle" className="mb-16">
                <Col span={4}>
                    <BackIcon />
                </Col>
                <Col span={16}>
                    <SectionTitle style={{ marginBottom: 0, textAlign: 'center' }}>
                        سبد خرید
                    </SectionTitle>
                </Col>
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={cartStore.cart.slice()}
                renderItem={(product) => (
                    <List.Item style={{ padding: 0, marginBottom: '8px' }}>
                        <CartItem product={product} />
                    </List.Item>
                )}
            />
        </>
    )
})
