import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './layout/RootLayout'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ShopDetailPage from './pages/ShopDetailPage'
import Map from './pages/Map'

import ChatList from './pages/chat/ChatList'
import ChatRoom from './pages/chat/ChatRoom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <ShopDetailPage />,
      },
      {
        path: 'map',
        element: <Map />,
      },
    ],
  },
  {
    path: '/chat',
    children: [
      {
        index: true,
        element: <ChatList />,
      },
      {
        path: ':id',
        element: <ChatRoom />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
