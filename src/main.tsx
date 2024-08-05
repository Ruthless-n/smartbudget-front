import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryProvider as QueryClientProvider } from '@libs/react-query'
import { Toaster } from "@/components/ui/sonner"
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { AuthProvider } from './auth/contexts/auth-provider.tsx'
import { LoginPage } from './pages/login/index.tsx'
import { RegisterPage } from './pages/register/index.tsx'
import { HomePage } from './pages/home/index.tsx'
import RequireAuth from './layouts/require-auth.tsx'
import { UsersPage } from './pages/users/index.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/users",
        element: <UsersPage />
      }
    ]
  },
  {
    path: "/login",
    element: < LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
