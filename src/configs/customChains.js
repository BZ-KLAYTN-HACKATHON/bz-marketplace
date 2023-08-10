export const klaytnChain = {
	id: 8217,
	name: 'Klaytn',
	network: 'klaytn',
	nativeCurrency: {
		decimals: 18,
		name: 'Klaytn',
		symbol: 'KLAY'
	},
	rpcUrls: {
		default: {
			http: [
				'https://public-node-api.klaytnapi.com/v1/cypress',
				'https://klaytn.blockpi.network/v1/rpc/public	'
			]
		},
		public: {
			http: [
				'https://public-node-api.klaytnapi.com/v1/cypress',
				'https://klaytn.blockpi.network/v1/rpc/public	'
			]
		}
	},
	blockExplorers: {
		default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
		etherscan: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' }
	}
}
