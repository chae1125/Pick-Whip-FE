import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './layout/RootLayout'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Home /> }],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
