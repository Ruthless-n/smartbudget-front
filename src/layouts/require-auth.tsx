/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/auth/contexts/auth-provider'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const RequireAuth = () => {
  const { tokens } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!tokens) {
      const nextRoute = location.pathname

      navigate(`/login?next=${nextRoute}`, { state: { from: location } })
    }

    if (tokens && location.pathname === '/login') {
      navigate('/home', { state: { from: location } })
    }

    if (tokens && location.pathname === '/') {
      navigate('/home', { state: { from: location } })
    }
  }, [location])

  return <Outlet />
}

export default RequireAuth
