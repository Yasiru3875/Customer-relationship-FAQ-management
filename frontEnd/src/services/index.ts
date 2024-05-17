import axios from 'axios'
import { exceptionHandler } from '../core'


axios.defaults.baseURL = "http://localhost:9090"

export const axiosPublicInstance = axios.create()
export const axiosPrivateInstance = axios.create()

// Request interceptor to manage authorization & headers
axiosPrivateInstance.interceptors.request.use(async (request: any) => {

  const tokenResponse ={ accessToken:"token"}
  request.headers.Authorization = `Bearer ${tokenResponse?.accessToken}`

  return request
}, (error: any) => {
  console.log('Req interceptor Error', error)
})

// Response interceptor to manage responses & errors
axiosPrivateInstance.interceptors.response.use(async (response: any) => {
  return response
}, async (error: { response: any }) => {
  return Promise.reject(await exceptionHandler(error.response))
})

axiosPublicInstance.interceptors.response.use(async (response: any) => {
  return response
}, async (error: { response: any }) => {
  return Promise.reject(await exceptionHandler(error.response))
})