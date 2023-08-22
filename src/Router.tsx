import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layout/Default'
import { Home } from './pages/Home'
import { CompleteOrderPage } from './pages/CompleteOrder'
import { OrderConfirmedPage } from './pages/OrderConfirmed'
import Login from './pages/Login'
import Register from './pages/Register'
import { useUser } from './hooks/useUser'

export function Router() {
  const { user } = useUser()
  
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/completeOrder" element={<CompleteOrderPage />} />
        <Route path="/orderConfirmed" element={<OrderConfirmedPage />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/register" element={!user ? <Register /> : <Home /> } />
      </Route>
    </Routes>
  )
}
