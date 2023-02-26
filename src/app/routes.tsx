import { createBrowserRouter } from 'react-router-dom'

import HomePage from '../features/home/HomePage'
import NotFound from '../features/errors/NotFound'
import ServerError from '../features/errors/ServerError'
import CategoryPage from '../features/category/CategoryPage'
import ProductDetail from '../features/product/ProductDetail'
import ProductList from '../features/product/ProductList'
import CartList from '../features/cart/CartList'
import RestaurantPage from '../features/restaurant/RestaurantPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/restaurant/:restaurantId/:tableNumber',
        element: <RestaurantPage />,
    },
    {
        path: '/branch/:branchId/:tableNumber',
        element: <CategoryPage />,
    },
    {
        path: '/branch/:branchId/:tableNumber/cart',
        element: <CartList />,
    },
    {
        path: '/branch/:branchId/:tableNumber/category/:categoryId',
        element: <ProductList />,
    },
    {
        path: '/branch/:branchId/:tableNumber/search/:search',
        element: <ProductList />,
    },
    {
        path: '/branch/:branchId/:tableNumber/product/:productId',
        element: <ProductDetail />,
    },
    {
        path: '/server-error',
        element: <ServerError />,
    },
    {
        path: '/not-found',
        element: <NotFound />,
    },
])
