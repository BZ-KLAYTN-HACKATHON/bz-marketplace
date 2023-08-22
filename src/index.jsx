import { Footer } from 'components/connectkit'
import wagmiConfig from 'configs/wagmi'
import { ConnectKitProvider } from 'connectkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'

import App from './App'
import reportWebVitals from './reportWebVitals'

// eslint-disable-next-line no-extend-native
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n
}

const customConnectKitTheme = {
  '--ck-primary-button-background': 'hsl(var(--primary-foreground))',
  '--ck-primary-button-hover-background': 'hsl(var(--primary))',
  '--ck-secondary-button-background': 'hsl(var(--primary-foreground))',
  '--ck-secondary-button-hover-background': 'hsl(var(--primary))',
  '--ck-tertiary-button-background': 'hsl(var(--primary))',
  '--ck-tertiary-button-hover-background': '#833DEF',
  '--ck-body-background-tertiary': 'hsl(var(--primary-foreground))',
  '--ck-tooltip-color': 'hsl(var(--background))',
  '--ck-tooltip-background': 'hsl(var(--secondary))',
  '--ck-body-background': 'hsl(var(--background))',
  '--ck-connectbutton-balance-background': 'hsl(var(--background))',
  '--ck-connectbutton-balance-hover-background': 'transparent',
  '--ck-body-disclaimer-background': 'hsl(var(--primary-foreground))',
  '--ck-qr-border-color': 'hsl(var(--border))',
  '--ck-font-family': "'Bai Jamjuree', 'sans-serif'",
  '--ck-border-radius': '10px',
  '--ck-connectbutton-border-radius': '8px',
  '--ck-connectbutton-background': '#6E27DA',
  '--ck-connectbutton-hover-background': '#833DEF',
  '--ck-body-color-muted': '#ffffff99',
  '--ck-body-divider': '#ffffff99'
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider
          mode='dark'
          customTheme={customConnectKitTheme}
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
