import { Image, Skeleton, Space, theme } from 'antd'
import { observer } from 'mobx-react-lite'

import CartIcon from '../../../app/layout/CartIcon'
import classes from './Header.module.scss'
interface Props {
    restaurantName: string | undefined
    logo: string | undefined
}

const { useToken } = theme

export default observer(function Header({ restaurantName, logo }: Props) {
    const { token } = useToken()
    return (
        <header className={classes.mainHeader}>
            <Space>
                {restaurantName == undefined ? (
                    <Skeleton.Avatar active shape="square" className={classes.logoSkeleton} />
                ) : (
                    <Image
                        src={`https://coffeemenu.ir${logo}`}
                        preview={false}
                        className={classes.logo}
                    />
                )}
                {restaurantName == undefined ? (
                    <Skeleton.Input size="small" active />
                ) : (
                    <h2 style={{ color: token.colorPrimary }}>{restaurantName}</h2>
                )}
            </Space>
            <div className={classes.cartIcon}>
                <CartIcon />
            </div>
        </header>
    )
})
