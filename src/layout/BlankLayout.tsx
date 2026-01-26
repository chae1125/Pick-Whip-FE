import { Outlet } from 'react-router-dom'

export default function BlankLayout() {
  return (
    <div className="min-h-dvh safe-area">
      <Outlet />
    </div>
  )
}
