import { AnimatePresence } from 'framer-motion'
import { cloneElement } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'

import 'assets/css/App.css'
import { DefaultLayout } from 'components/layouts'
import Event from 'pages/event'
import Home from 'pages/home'
import Marketplace from 'pages/marketplace'
import MarketplaceItemPage from 'pages/marketplace-item'
import StoreItemPage from 'pages/store-item'

function App() {
  const element = useRoutes([
    { path: '/event', element: <Event /> },
    {
      path: '/marketplace/:orderId',
      element: <MarketplaceItemPage />
    },
    { path: '/marketplace', element: <Marketplace /> },
    { path: '/store/item/:packId', element: <StoreItemPage /> },
    { path: '/', element: <Home /> },
    { path: '*', element: <Home /> }
  ])

  const location = useLocation()

  return (
    <DefaultLayout>
      <AnimatePresence mode='wait' initial={false}>
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </DefaultLayout>
  )
}

export default App

// const MyComponent = () => {
// 	const { address, isConnecting, isDisconnected } = useAccount()
// 	if (isConnecting) return <div>Connecting...</div>
// 	if (isDisconnected) return <div>Disconnected</div>
// 	return <div>Connected Wallet: {address}</div>
// }
