import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AuthLayout from '@/layout/AuthLayout'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home'
import Map from '@/pages/Map'
import Login from '@/pages/auth/Login'
import MainLayout from '@/layout/MainLayout'
import CustomizeLayout from '@/layout/CustomizeLayout'

import Chat from '@/pages/Chat'
import Order from '@/pages/Order'
import Customize from '@/pages/customize/Customize'
import SettingsPage from '@/pages/SettingsPage'
import EditMyInfoPage from '@/pages/EditMyInfoPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'map', element: <Map /> },
      { path: 'chat', element: <Chat /> },
      { path: 'order', element: <Order /> },
    ],
  },
  {
    element: <CustomizeLayout />,
    children: [
      { path: 'setting', element: <SettingsPage /> },
      { path: 'edit-my-info', element: <EditMyInfoPage /> },
    ],
  },
  {
    path: '/customize',
    element: <CustomizeLayout />,
    children: [
      { index: true, element: <Customize /> },
      { path: ':cakeId', element: <Customize /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <Login /> }],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
