import { useEffect } from 'react'

import { Card, theme } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

import { useStore } from '../../app/stores/store'
import SectionTitle from '../../app/layout/SectionTitle'
import classes from './RestaurantPage.module.scss'

const { useToken } = theme

export default observer(function RestaurantPage() {
    const { branchStore } = useStore()
    const { restaurantId, tableNumber } = useParams<{
        restaurantId: string
        tableNumber: string
    }>()
    const { token } = useToken()

    useEffect(() => {
        branchStore.loadBranches(restaurantId!)
    }, [branchStore, restaurantId])

    return (
        <div className={classes.branchsContainer}>
            <SectionTitle className={classes.branchsContainer_title}>
                مجموعه غذایی کارن
            </SectionTitle>
            {branchStore.branchList.map((a) => (
                <Card
                    className={classes.branchsContainer_branch}
                    bodyStyle={{ padding: '12px' }}
                    key={a.id}
                >
                    <Link
                        to={`/branch/${a.id}/${tableNumber}`}
                        className={classes.branchsContainer_branch_link}
                    >
                        <img
                            src={a.logo}
                            style={{ border: `1px solid ${token.colorBorder}` }}
                        />
                        <span>{a.name}</span>
                    </Link>
                </Card>
            ))}
        </div>
    )
})
