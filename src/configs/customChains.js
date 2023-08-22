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

export const bnbChain = {
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB'
  },
  network: 'bsc',
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed2.binance.org']
    },
    public: {
      http: ['https://bsc-dataseed2.binance.org']
    }
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
    etherscan: { name: 'BscScan', url: 'https://bscscan.com' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 15921452
    }
  },
  testnet: false
}
