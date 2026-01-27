import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './layout/RootLayout'
import BlankLayout from './layout/BlankLayout'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Map from './pages/Map'
import OrderSheet from './pages/OrderSheet'

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
        path: 'map',
        element: <Map />,
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: 'orders/:orderId', element: <OrderSheet /> }],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
