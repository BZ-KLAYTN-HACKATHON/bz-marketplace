import { Footer } from 'components/connectkit'
import wagmiConfig from 'configs/wagmi'
import { ConnectKitProvider } from 'connectkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'

import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider
          customTheme={{
            '--ck-border-radius': '10px',
            '--ck-connectbutton-border-radius': '8px',
            '--ck-connectbutton-background': '#6E27DA',
            '--ck-connectbutton-hover-background': '#833DEF'
          }}
          options={{
            disclaimer: <Footer />,
            walletConnectCTA: 'both'
          }}
        >
          <App />
        </ConnectKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
)
reportWebVitals()
