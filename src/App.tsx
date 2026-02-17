import AppRouter from '@/routes/AppRouter'
import { useTokenRefresh } from '@/hooks/useTokenRefresh'

function App() {
  useTokenRefresh()
  return <AppRouter />
}

export default App
