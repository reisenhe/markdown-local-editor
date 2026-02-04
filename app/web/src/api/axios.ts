import axios from 'axios'

const baseUrl = import.meta.env.VITE_ENV === 'development' ? '/proxyApi' : '/'

const axiosService = axios.create({
  baseURL: '/proxyApi',
  timeout: 100 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-secret-api-key-here',
  },
})

axiosService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosService.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosService
