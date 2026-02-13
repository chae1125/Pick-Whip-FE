import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

import AuthLayout from '@/layout/AuthLayout'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home'
import Map from '@/pages/Map'
import Login from '@/pages/auth/Login'
import MainLayout from '@/layout/MainLayout'
import CustomizeLayout from '@/layout/CustomizeLayout'
import Order from '@/pages/Order'
import OrderSheet from '@/pages/OrderSheet'
import BlankLayout from '@/layout/BlankLayout'
import Customize from '@/pages/customize/Customize'
import ChatList from '@/pages/chat/ChatList'
import ChatRoom from '@/pages/chat/ChatRoom'
import OrderDetailPage from '@/pages/OrderDetailPage'
import SettingsPage from '@/pages/SettingsPage'
import EditMyInfoPage from '@/pages/EditMyInfoPage'
import PaymentPage from '@/pages/payment/PaymentPage'
import ShopDetailPage from '@/pages/ShopDetailPage'
import DesignGalleryPage from '@/pages/DesignGalleryPage'
import StoreInfoPage from '@/pages/StoreInfoPage'
import ReviewPage from '@/pages/ReviewPage'
import NotificationPage from '@/pages/NotificationPage'
import DraftsOrderPage from '@/pages/DraftsOrderPage'
import OrderRequestListPage from '@/pages/OrderRequestListPage'
import OrderCompleteListPage from '@/pages/OrderCompleteListPage'
import SignupExtraPage from '@/pages/SignupExtraPage'

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
      { path: 'order/detail', element: <OrderDetailPage /> },
    ],
  },
  {
    path: '/chat/:chatId',
    element: <ChatRoom />,
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
  {
    path: '/orders',
    element: <BlankLayout />,
    children: [{ path: ':orderId', element: <OrderSheet /> }],
  },
  {
    path: '/payment',
    element: <BlankLayout />,
    children: [{ index: true, element: <PaymentPage /> }],
  },
  {
    path: '/notifications',
    element: <BlankLayout />,
    children: [{ index: true, element: <NotificationPage /> }],
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
    path: '/signup/extra',
    element: <BlankLayout />,
    children: [{ index: true, element: <SignupExtraPage /> }],
  },
  {
    path: '/drafts',
    element: <BlankLayout />,
    children: [{ index: true, element: <DraftsOrderPage /> }],
  },
  {
    path: '/request-history',
    element: <BlankLayout />,
    children: [{ index: true, element: <OrderRequestListPage /> }],
  },
  {
    path: '/complete-history',
    element: <BlankLayout />,
    children: [{ index: true, element: <OrderCompleteListPage /> }],
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
