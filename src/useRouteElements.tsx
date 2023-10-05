import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import path from './constants/path'
import NotifyLayout from './layouts/NotifyLayout'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import Register from './pages/Register'
import NotifyActive from './pages/NotifyActive'
import Chatting from './pages/Chatting'

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <NotifyLayout>
          <Chatting />
        </NotifyLayout>
      )
    },
    {
      path: path.login,
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: path.register,
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: path.active_account,
      element: (
        <NotifyLayout>
          <NotifyActive />
        </NotifyLayout>
      )
    }
  ])
  return element
}
