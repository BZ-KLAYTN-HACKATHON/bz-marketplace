import { ROFI_MARKETPLACE_ORDERS } from 'configs/endpoint'
import HttpCommon from 'configs/http-common'

const marketplaceApi = {
  getItems: (params = {}) => {
    const url = ROFI_MARKETPLACE_ORDERS.LIST
    return HttpCommon.get(url, { params })
  },
  getItemByOrderId: (id) => {
    const url = ROFI_MARKETPLACE_ORDERS.DETAIL(id)
    return HttpCommon.get(url)
  },
  getStatistics: () => {
    const url = ROFI_MARKETPLACE_ORDERS.STATISTICS
    return HttpCommon.get(url)
  }
}

export default marketplaceApi
