import 'assets/css/App.css'
import { DefaultLayout } from 'components/layouts'
import Home from 'pages/home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className=''>
      <DefaultLayout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
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
