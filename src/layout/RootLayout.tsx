import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <div className="min-h-dvh safe-area">
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  )
}
