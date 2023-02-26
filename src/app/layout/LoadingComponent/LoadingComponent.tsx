import { Space, Spin } from 'antd'

import classes from './LoadingComponent.module.scss'

export default function LoadingComponent() {
    return (
        <div className={classes.loading}>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    )
}
