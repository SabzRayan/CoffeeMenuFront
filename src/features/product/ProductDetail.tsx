import { useEffect, useState } from 'react'

import { Button, Carousel, Col, List, Radio, RadioChangeEvent, Row, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import CartIcon from '../../app/layout/CartIcon'
import BackIcon from '../../app/layout/BackIcon'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useStore } from '../../app/stores/store'
import SectionTitle from '../../app/layout/SectionTitle'

export default observer(function ProductDetail() {
    const { productStore, cartStore } = useStore()
    const { productId } = useParams<{
        productId: string
    }>()
    const [selectedPrice, setSelectedPrice] = useState(
        productStore.selectedProduct?.productPrices[0]
    )

    useEffect(() => {
        productStore.loadProduct(productId!)
        return () => {
            setSelectedPrice(undefined)
            productStore.clearSelectedProduct()
        }
    }, [productStore, productId])

    const data = [productStore.selectedProduct?.categoryName ?? '']

    if (productStore.selectedProduct?.description)
        data.push(productStore.selectedProduct?.description)

    if (productStore.selectedProduct?.recipe) data.push(productStore.selectedProduct?.recipe)

    if (productStore.selectedProduct?.calory)
        data.push(`کالری: ${productStore.selectedProduct.calory}`)

    const priceChange = (e: RadioChangeEvent) => {
        console.log(e.target.value)
        let selectedPrice = productStore.selectedProduct?.productPrices.find(
            (a) => a.id === e.target.value
        )
        setSelectedPrice(selectedPrice)
    }

    if (productStore.loadingInitial) return <LoadingComponent />

    return (
        <>
            <Row align="middle" className="mb-16">
                <Col span={4}>
                    <BackIcon />
                </Col>
                <Col span={16}>
                    <SectionTitle size="small" style={{ marginBottom: 0, textAlign: 'center' }}>
                        جزییات محصول
                    </SectionTitle>
                </Col>
                <Col span={4} className="text-left">
                    <CartIcon />
                </Col>
            </Row>
            <Carousel autoplay dotPosition="bottom">
                {productStore.selectedProduct?.attachments.length ? (
                    productStore.selectedProduct?.attachments.map((attachment) => (
                        <img
                            alt="food"
                            src={`https://coffeemenu.ir${attachment.url}`}
                            width="100%"
                            key={attachment.id}
                        />
                    ))
                ) : (
                    <img
                        alt="food"
                        src="https://coffeemenu.ir/attachments/w0qtvcjm.jli/default-food.png"
                        width="100%"
                    />
                )}
            </Carousel>

            <List
                className="product-detail-list"
                header={
                    <>
                        <h2>{productStore.selectedProduct?.title}</h2>
                        <hr color="#353535" />
                    </>
                }
                dataSource={data}
                renderItem={(item: string) => <List.Item>{item}</List.Item>}
            />

            <div className="product-detail-price-container">
                {productStore.selectedProduct &&
                    productStore.selectedProduct.productPrices.length > 1 && (
                        <Radio.Group
                            className="product-detail-radio-group"
                            onChange={priceChange}
                            defaultValue={productStore.selectedProduct?.productPrices[0].id}
                            value={selectedPrice?.id}
                        >
                            <Space direction="vertical">
                                {productStore.selectedProduct?.productPrices.map((price) => (
                                    <Radio className="product-detail-radio" value={price.id}>
                                        {price.title}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                <br />
                <Button
                    onClick={() =>
                        cartStore.addToCart(
                            productStore.selectedProduct!,
                            selectedPrice ?? productStore.selectedProduct!.productPrices[0]
                        )
                    }
                    className="product-detail-add-basket-button"
                >
                    افزودن به سبد خرید -{' '}
                    {selectedPrice
                        ? selectedPrice?.price.toLocaleString()
                        : productStore.selectedProduct?.price.toLocaleString()}{' '}
                    تومان
                </Button>
            </div>
        </>
    )
})
