import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

import { useStore } from '../../stores/store'
import classes from './CartIcon.module.scss'

export default observer(function CartIcon() {
    const { cartStore } = useStore()
    const { branchId, tableNumber } = useParams<{
        branchId: string
        tableNumber: string
    }>()

    return (
        <Link to={`/branch/${branchId}/${tableNumber}/cart`} className={classes.cartIconContainer}>
            <Badge size="small" count={cartStore.cartCount}>
                <ShoppingCartOutlined className={classes.cartIcon} />
            </Badge>
        </Link>
    )
})
