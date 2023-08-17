import 'assets/css/App.css'
import { DefaultLayout } from 'components/layouts'
import { AnimatePresence } from 'framer-motion'
import Home from 'pages/home'
import StoreItemPage from 'pages/store-item'
import { cloneElement } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'

function App() {
  const element = useRoutes([
    { path: '/store/item/:packId', element: <StoreItemPage /> },
    { path: '/', element: <Home /> },
    { path: '*', element: <Home /> }
  ])

  const location = useLocation()

  return (
    <div className=''>
      <DefaultLayout>
        <AnimatePresence mode='wait'>
          {cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </DefaultLayout>
    </div>
  )
}

export default App

// const MyComponent = () => {
// 	const { address, isConnecting, isDisconnected } = useAccount()
// 	if (isConnecting) return <div>Connecting...</div>
// 	if (isDisconnected) return <div>Disconnected</div>
// 	return <div>Connected Wallet: {address}</div>
// }
