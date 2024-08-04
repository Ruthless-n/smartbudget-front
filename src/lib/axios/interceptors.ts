/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosInstance,
} from 'axios'
import Cookies from 'js-cookie'
import { api } from './index'
import { toast } from 'sonner'

const onResponse = (response: AxiosResponse) => response

async function onResponseError(error: AxiosError): Promise<AxiosError> {
  const originalRequest = error.config

  if (error.code && error.code === 'ERR_NETWORK') {
    toast.error('Não foi possível conectar ao servidor.')
  }

  if (
    error.response &&
    error.response.status === 401 &&
    error.response.data &&
    (error.response.data as any).messages &&
    (error.response.data as any).messages[0].message === 'Token is invalid or expired'
  ) {
    const refreshToken = Cookies.get('refresh')

    if (refreshToken) {
      try {
        const response = await api.post('/user/refresh/', {
          refresh: refreshToken,
        })

        if (originalRequest && response.data.access) {
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`

          Cookies.set('access', response.data.access)

          return api(originalRequest)
        }
      } catch (error) {
        Cookies.remove('access')
        Cookies.remove('refresh')
      }
    }
  }

  return Promise.reject(error)
}

const onRequest = async (config: AxiosRequestConfig) => {
  const accessToken = Cookies.get('access')

  const { headers } = config

  if (accessToken && headers) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return { ...config, headers: headers as AxiosRequestHeaders }
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
}
