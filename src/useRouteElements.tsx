import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import path from './constants/path'
import NotifyLayout from './layouts/NotifyLayout'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import Register from './pages/Register'
import NotifyActive from './pages/NotifyActive'
import Chatting from './pages/Chatting'
import PageNotFound from './pages/PageNotFound'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import ForgetPassword from './pages/ForgetPassword'
import SetNewPassword from './pages/SetNewPassword'
import MainLayout from './layouts/MainLayout'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='*' />
}

interface Props {
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsViewImageVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useRouteElements({ setIsOverlayVisible, setIsViewImageVisible }: Props) {
  const element = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          index: true,
          element: (
            <MainLayout>
              <Chatting setIsOverlayVisible={setIsOverlayVisible} setIsViewImageVisible={setIsViewImageVisible} />
            </MainLayout>
          )
        }
      ]
    },
    // {
    //   path: '',
    //   index: true,
    //   element: (
    //     <MainLayout>
    //       <Chatting />
    //     </MainLayout>
    //   )
    // },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
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
        },
        {
          path: path.forget_password,
          element: (
            <NotifyLayout>
              <ForgetPassword />
            </NotifyLayout>
          )
        },
        {
          path: path.set_new_password,
          element: (
            <NotifyLayout>
              <SetNewPassword />
            </NotifyLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <NotifyLayout>
          <PageNotFound />
        </NotifyLayout>
      )
    }
  ])
  return element
}
