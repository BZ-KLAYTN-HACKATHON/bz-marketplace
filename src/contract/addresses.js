import { bnbChain } from 'configs/customChains'
import env from 'configs/env'

export const RG02_TOKEN_ADDRESS = {
  [bnbChain.id]: env.REACT_APP_RG02_TOKEN_ADDRESS || ''
}

export const RG02_NFT_SHOP_ADDRESS = {
  [bnbChain.id]: env.REACT_APP_RG02_NFT_SHOP_ADDRESS || ''
}
