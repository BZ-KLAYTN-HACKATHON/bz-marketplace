import { ROFI_EVENT } from 'configs/endpoint'
import HttpCommon from 'configs/http-common'

const eventApi = {
  getData: () => {
    const url = ROFI_EVENT.CONFIG
    return HttpCommon.get(url)
  },
  airdropItem: () => {
    const url = ROFI_EVENT.AIRDROP_ITEM
    return HttpCommon.get(url)
  },
  spin: () => {
    const url = ROFI_EVENT.SPIN
    return HttpCommon.post(url, {})
  },
  claimable: () => {
    const url = ROFI_EVENT.SPIN
    return HttpCommon.get(url)
  },
  userIngame: () => {
    const url = ROFI_EVENT.USER_INGAME
    return HttpCommon.get(url)
  },
  poolLeaderboard: () => {
    const url = ROFI_EVENT.POOL_LEADERBOARD
    return HttpCommon.get(url)
  },
  topRankLeaderboard: () => {
    const url = ROFI_EVENT.TOP_RANK_LEADERBOARD
    return HttpCommon.get(url)
  },
  getRank: () => {
    const url = ROFI_EVENT.GET_RANK_LEADERBOARD
    return HttpCommon.get(url)
  },
  getFreeNfts: () => {
    const url = ROFI_EVENT.GET_FREE_NFTS
    return HttpCommon.get(url)
  }
}

export default eventApi
