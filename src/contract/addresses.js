import { klaytnChain } from 'configs/customChains'
import env from 'configs/env'

export const RG02_TOKEN_ADDRESS = {
  [klaytnChain.id]: env.REACT_APP_RG02_TOKEN_ADDRESS || ''
}

export const RG02_NFT_SHOP_ADDRESS = {
  [klaytnChain.id]: env.REACT_APP_RG02_NFT_SHOP_ADDRESS || ''
}

export const RG02_NFT_MARKET_ADDRESS = {
  [klaytnChain.id]: env.REACT_APP_RG02_NFT_MARKET_ADDRESS || ''
}

export const RG02_NFT_ADDRESS = {
  [klaytnChain.id]: env.REACT_APP_RG02_NFT_ADDRESS || ''
}
