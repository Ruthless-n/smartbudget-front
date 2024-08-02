import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { LoginPage } from './pages/login';
import { HomePage } from './pages/home';
import { RegisterPage } from './pages/register';
const router = createBrowserRouter([
  {
    path: "/login",
    element: < LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/home",
    element: <HomePage />
  }
])

function App() { 
  return (
    <RouterProvider router={router}/>
  )
}
export default App
