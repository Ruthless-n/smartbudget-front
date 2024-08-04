import axios from 'axios'
import { API_URL } from '@config/environment'
import { setupInterceptors } from './interceptors'

export const api = axios.create({
  baseURL: API_URL,
})

setupInterceptors(api)
