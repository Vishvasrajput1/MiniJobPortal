import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import { Home } from '../Home'
import { Dashboard } from '../Dashboard/Dashboard'

export const Layout = ({ children }) => {
  const location = useLocation()
  const isRootPath = location.pathname === '/'
  return (
    <>
      <div className="h-screen block overflow-hidden">
        <Header />
        {isRootPath ? <Dashboard /> : children || <Outlet />}
      </div>
    </>
  )
}
