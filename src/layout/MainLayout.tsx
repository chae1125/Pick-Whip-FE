// MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <div className="relative min-h-dvh w-full">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="w-full h-dvh">
        <Outlet />
      </main>
    </div>
  )
}
