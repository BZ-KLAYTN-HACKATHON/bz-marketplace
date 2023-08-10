import wagmiConfig from 'configs/wagmi'
import './App.css'

import { ConnectKitButton, ConnectKitProvider } from 'connectkit'
import { WagmiConfig, useAccount } from 'wagmi'

function App() {
	return (
		<div className=''>
			<WagmiConfig config={wagmiConfig}>
				<ConnectKitProvider
					customTheme={{
						'--ck-border-radius': '10px',
						'--ck-connectbutton-border-radius': '8px'
					}}
					options={{
						disclaimer: (
							<>
								By connecting your wallet you agree to the{' '}
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://en.wikipedia.org/wiki/Terms_of_service'
								>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://en.wikipedia.org/wiki/Privacy_policy'
								>
									Privacy Policy
								</a>
							</>
						)
					}}
				>
					<div className=''>Hi</div>
					<MyComponent />
					<ConnectKitButton />
				</ConnectKitProvider>
			</WagmiConfig>
		</div>
	)
}

export default App

const MyComponent = () => {
	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connecting...</div>
	if (isDisconnected) return <div>Disconnected</div>
	return <div>Connected Wallet: {address}</div>
}
