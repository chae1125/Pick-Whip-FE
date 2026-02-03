import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import AuthLayout from '@/layout/AuthLayout'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home'
import Map from '@/pages/Map'
import Login from '@/pages/auth/Login'
import MainLayout from '@/layout/MainLayout'

import Order from '@/pages/Order'
import OrderSheet from '@/pages/OrderSheet'
import BlankLayout from '@/layout/BlankLayout'
import ChatList from '@/pages/chat/ChatList'
import ChatRoom from '@/pages/chat/ChatRoom'
import SettingsPage from '@/pages/SettingsPage'
import EditMyInfoPage from '@/pages/EditMyInfoPage'

import ShopDetailPage from '@/pages/ShopDetailPage'
import DesignGalleryPage from '@/pages/DesignGalleryPage'
import StoreInfoPage from '@/pages/StoreInfoPage'
import ReviewPage from '@/pages/ReviewPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'map', element: <Map /> },
      { path: 'chat', element: <ChatList /> },
      { path: 'order', element: <Order /> },
    ],
  },
  {
    path: '/chat/:chatId',
    element: <ChatRoom />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <Login /> }],
  },
  {
    path: '/orders',
    element: <BlankLayout />,
    children: [{ path: ':orderId', element: <OrderSheet /> }],
  },
  {
    path: '/setting',
    element: <BlankLayout />,
    children: [
      { index: true, element: <SettingsPage /> },
      { path: 'edit-my-info', element: <EditMyInfoPage /> },
    ],
  },
  {
    path: '/store-detail',
    element: <BlankLayout />,
    children: [
      {
        element: <ShopDetailPage />,
        children: [
          { index: true, element: <Navigate to="design" replace /> },
          { path: 'design', element: <DesignGalleryPage /> },
          { path: 'info', element: <StoreInfoPage /> },
          { path: 'review', element: <ReviewPage /> },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
