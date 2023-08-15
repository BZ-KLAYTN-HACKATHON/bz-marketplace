import { ROFI_STORE } from 'configs/endpoint'
import HttpCommon from 'configs/http-common'

const storeApi = {
  getItems: (params = {}) => {
    const url = ROFI_STORE.GET_ITEMS
    return HttpCommon.get(url, {
      params: 'page' in params ? params : { ...params, page: 1 }
    })
  },
  getItemByPackId: (id) => {
    const url = ROFI_STORE.GET_ITEM_BY_PACKID(id)
    return HttpCommon.get(url)
  },
  getSignature: (data) => {
    const url = ROFI_STORE.GET_SIGNATURE
    return HttpCommon.post(url, data)
  },
  getStatistics: () => {
    const url = ROFI_STORE.STATISTICS
    return HttpCommon.get(url)
  }
}

export default storeApi
