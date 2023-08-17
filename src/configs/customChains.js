export const klaytnChain = {
  id: 8217,
  name: 'Klaytn Mainnet',
  network: 'klaytn',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY'
  },
  rpcUrls: {
    default: {
      http: ['https://klaytn.blockpi.network/v1/rpc/public']
    },
    public: {
      http: ['https://klaytn.blockpi.network/v1/rpc/public']
    }
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
    etherscan: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' }
  }
}

export const klaytnTestnetChain = {
  id: 1001,
  name: 'Klaytn Testnet',
  network: 'klaytn',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn Testnet',
    symbol: 'KLAY'
  },
  rpcUrls: {
    default: {
      http: ['https://api.baobab.klaytn.net:8651']
    },
    public: {
      http: ['https://api.baobab.klaytn.net:8651']
    }
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://baobab.klaytnscope.com' },
    etherscan: { name: 'KlaytnScope', url: 'https://baobab.klaytn.com' }
  },
  testnet: true
}

export const avalancheChain = {
  id: 43_114,
  name: 'Avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX'
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc'
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    snowtrace: { name: 'SnowTrace', url: 'https://snowtrace.io' }
  },
  testnet: false
}
