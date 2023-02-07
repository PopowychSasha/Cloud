import axios from 'axios'
import { message } from '../components/Message/Message'

const $api = axios.create({
  withCredentials: true,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 400) {
      error.response.data.errors.forEach(({ param, msg }) => {
        message({ info: `${param} ${msg}`, status: 'error' })
      })
    } else if (
      error.response.status === 401 &&
      error.config &&
      !error.config.isRetry
    ) {
      try {
        originalRequest.isRetry = true
        const { data } = await axios.get('/api/access_token')

        localStorage.setItem('accessToken', data.accessToken)
        return $api.request(originalRequest)
      } catch (err) {
        message({ info: 'Unauthorized', status: 'error' })
      }
    } else {
      throw error.response.data
    }
  }
)

export default $api
