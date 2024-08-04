import { useState } from 'react'
import Cookies from 'js-cookie'
import { CookieAttributes } from 'node_modules/@types/js-cookie'
import { jwtDecode } from 'jwt-decode'

const useAuthCookies = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const setAuthCookies = (access: string, refresh: string) => {
    const defaultOptions: CookieAttributes = {
      path: '/',
    }

    const decodeAccessToken = jwtDecode(access)
    const decodeRefreshToken = jwtDecode(refresh)

    Cookies.set('access', access, { ...defaultOptions, expires: decodeAccessToken.exp })
    Cookies.set('refresh', refresh, { ...defaultOptions, expires: decodeRefreshToken.exp })

    setAccessToken(access)
    setRefreshToken(refresh)
  }

  const removeAuthCookies = () => {
    Cookies.remove('access')
    Cookies.remove('refresh')

    setAccessToken(null)
    setRefreshToken(null)
  }

  return {
    setAuthCookies,
    removeAuthCookies,
    accessToken,
    refreshToken,
  }
}

export default useAuthCookies
