import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { theme } from 'antd'

import classes from './BackIcon.module.scss'

const { useToken } = theme

function BackIcon() {
    const navigate = useNavigate()
    const { token } = useToken()

    return (
        <ArrowRightOutlined
            className={classes.backIcon}
            onClick={() => navigate(-1)}
            style={{ color: token.colorText }}
        />
    )
}

export default BackIcon
