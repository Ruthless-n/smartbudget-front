import { keyCurrentUser } from '@/services/user/keys'
import { Auth, User } from '@/services/user/types'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthContextProps {
  tokens: Auth | undefined
  setTokens: (tokens: Auth | undefined) => void
  user: User | undefined
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const accessToken = Cookies.get('access')
  const refreshToken = Cookies.get('refresh')

  const { data: user } = useQuery<User>({
    queryKey: keyCurrentUser(),
    staleTime: Infinity,
  })

  const [tokens, setTokens] = useState<Auth | undefined>(
    accessToken && refreshToken && accessToken !== '' && refreshToken !== ''
      ? { access: accessToken, refresh: refreshToken }
      : undefined,
  )

  useEffect(() => {
    const accessToken = Cookies.get('access')
    const refreshToken = Cookies.get('refresh')

    if (accessToken && refreshToken) {
      setTokens({ access: accessToken, refresh: refreshToken })
    }

    if (!accessToken || !refreshToken) {
      setTokens(undefined)
    }
  }, [])

  const value = {
    tokens,
    setTokens,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
