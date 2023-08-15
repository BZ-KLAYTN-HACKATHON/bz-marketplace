import axios from 'axios'
import queryString from 'query-string'

const HttpCommon = axios.create({
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 30000
})

HttpCommon.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

HttpCommon.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  async (error) => {
    return Promise.reject(error.response.data)
  }
)

export default HttpCommon
