import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import classes from './ItemCounter.module.scss'

interface Props {
    count: number
    plusOnClick: React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLButtonElement>
    minusOnClick: React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLButtonElement>
}

function ItemCounter({ count, plusOnClick, minusOnClick }: Props) {
    return (
        <div className={classes.counter}>
            <Button
                ghost
                size="small"
                type="primary"
                icon={<PlusOutlined style={{ transform: 'scale(1)' }} />}
                style={{ width: '22px', height: '22px' }}
                onClick={plusOnClick}
            />
            <div className={classes.count}>{count}</div>
            <Button
                ghost
                size="small"
                type="primary"
                danger={count == 1}
                style={{ width: '22px', height: '22px' }}
                icon={
                    count == 1 ? (
                        <DeleteOutlined color="red" style={{ transform: 'scale(1)' }} />
                    ) : (
                        <MinusOutlined />
                    )
                }
                onClick={minusOnClick}
            />
        </div>
    )
}

export default ItemCounter
