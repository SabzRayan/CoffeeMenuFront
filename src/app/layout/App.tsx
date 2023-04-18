import { useEffect } from 'react'

import { ConfigProvider, Layout, theme } from 'antd'
import { observer } from 'mobx-react-lite'
import { RouterProvider } from 'react-router-dom'

import { useStore } from '../stores/store'
import { router } from '../routes'
import './styles.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

function App() {
    const { cartStore } = useStore()
    useEffect(() => {
        cartStore.loadCart()
    }, [])

    return (
      <ConfigProvider
        direction="rtl"
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#f5ad0d",
            borderRadius: 4,
            wireframe: false,
            colorWarning: "#e0e03a",
            colorInfo: "#f5ad0d",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Layout className="main-layout">
            <RouterProvider router={router} />
          </Layout>
        </QueryClientProvider>
      </ConfigProvider>
    );
}

export default observer(App)
