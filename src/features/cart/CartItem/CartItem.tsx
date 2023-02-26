import { Card } from 'antd'
import { observer } from 'mobx-react-lite'

import { OrderDetail } from '../../../app/models/orderDetail'
import { useStore } from '../../../app/stores/store'
import ItemCounter from '../../../app/layout/ItemCounter'
import classes from './CartItem.module.scss'

interface Props {
    product: OrderDetail
}

export default observer(function CartCard({ product }: Props) {
    const { cartStore } = useStore()

    return (
        <Card
            className={classes.foodCart}
            bodyStyle={{ padding: '12px', width: '100%', display: 'flex' }}
        >
            <div className={classes.foodCart_pic}>
                <img
                    src={
                        product.product.attachments[0]
                            ? `https://coffeemenu.ir${product.product.attachments[0].url}`
                            : 'https://coffeemenu.ir/attachments/w0qtvcjm.jli/default-food.png'
                    }
                />
            </div>
            <div className={classes.title}>
                {product.product.title}{' '}
                {product.product.productPrices.length > 1 && `(${product.price.title})`}
            </div>
            <div className={classes.counter}>
                <ItemCounter
                    count={product.count}
                    plusOnClick={() =>
                        cartStore.changeCount(product.productId, product.count + 1, product.price)
                    }
                    minusOnClick={() =>
                        cartStore.changeCount(product.productId, product.count - 1, product.price)
                    }
                />
            </div>
            <div className={classes.price}>
                {(product.price.price * product.count).toLocaleString()} تومان
            </div>
        </Card>
    )
})
