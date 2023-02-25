import { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useStore } from '../../app/stores/store'
import Header from './Header'
import CategoryList from './CategoryList'
import BestProducts from '../product/BestProducts'

export default observer(function CategoryPage() {
    const { branchStore } = useStore()
    const { branchId, tableNumber } = useParams<{
        branchId: string
        tableNumber: string
    }>()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        branchStore.loadBranch(branchId!)
    }, [branchStore, branchId])

    return (
        <>
            <Header
                restaurantName={branchStore.selectedBranch?.name}
                logo={branchStore.selectedBranch?.logo}
            />
            <Input
                className="mb-16"
                size="large"
                value={searchValue}
                onPressEnter={() => {
                    if (searchValue)
                        navigate(`/branch/${branchId}/${tableNumber}/search/${searchValue}`)
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="چی میل داری؟"
                prefix={<SearchOutlined />}
            />
            <CategoryList />
            <BestProducts />
        </>
    )
})
