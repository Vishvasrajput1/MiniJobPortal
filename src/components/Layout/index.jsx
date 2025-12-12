import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { toggleFilters } from '../../feature/jobs/jobsSlice'
import { Dashboard } from '../Dashboard/Dashboard'
import Header from '../Header/Header'

export const Layout = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const isRootPath = location.pathname === '/'

  if (!isRootPath) {
    dispatch(toggleFilters(false))
  }

  return (
    <>
      <div className="h-screen block overflow-hidden">
        <Header />
        {isRootPath ? <Dashboard /> : children || <Outlet />}
      </div>
    </>
  )
}
