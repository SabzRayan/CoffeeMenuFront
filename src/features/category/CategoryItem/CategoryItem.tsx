import { Image, Card } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

import classes from './CategoryItem.module.scss'

interface Props {
    image: string
    title: string
    categoryId: string
}

export default observer(function Category({ categoryId, image, title }: Props) {
    const { branchId, tableNumber } = useParams<{
        branchId: string
        tableNumber: string
    }>()

    return (
        <Link to={`/branch/${branchId}/${tableNumber}/category/${categoryId}`}>
            <Card className={classes.imageContainer}>
                <Image preview={false} src={image} />
            </Card>
            <div className={classes.title}>{title}</div>
        </Link>
    )
})
