import { theme } from 'antd'

import classes from './SectionTitle.module.scss'

interface Props {
    children: React.ReactNode
    size?: 'small' | 'large'
    weight?: string
    colorType?: 'dependTheme' | 'base'
    style?: object
    className?: string
}

const { useToken } = theme

function SectionTitle({
    children,
    size = 'large',
    weight = 'bold',
    colorType = 'base',
    style,
    className
}: Props) {
    const { token } = useToken()

    return (
        <div
            className={`${classes.title} ${size === 'small' ? classes.smallTitle : ''} ${className}`}
            style={{
                ...style,
                fontWeight: weight,
                color: colorType === 'dependTheme' ? token.colorPrimary : token.colorText,
            }}
        >
            {children}
        </div>
    )
}

export default SectionTitle
