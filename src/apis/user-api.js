import { ROFI_NFT } from 'configs/endpoint'
import HttpCommon from 'configs/http-common'

const userApi = {
  getInventory: (params = {}) => {
    const url = ROFI_NFT.INVENTORY
    return HttpCommon.get(url, { params })
  },
  getInventoryItem: (id = '') => {
    const url = `${ROFI_NFT.ITEM}/${id}`
    return HttpCommon.get(url)
  }
}

export default userApi
