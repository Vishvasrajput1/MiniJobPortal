import { AiFillHome } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { ToggleThemeButton } from '../common/ToggleThemeButton'
import { useSelector } from 'react-redux'

const Header = () => {
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const activePage = window.location.pathname
  return (
    <nav
      className={`nav flex border-b ${
        isDarkMode
          ? 'bg-gray-800 border-gray-600 text-white shadow(10px 10px 20px rgba(250, 247, 247))'
          : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between w-full p-4 px-8">
        <div className="flex items-center text-2xl">
          <Link to="/">
            Job <span className="text-indigo-400">Portal</span>
          </Link>
        </div>
        <ul className="flex items-center  gap-10">
          <li className="flex flex-col item-center justify-center w-full ">
            <Link
              to="/"
              className={
                activePage === '/' ? 'text-indigo-400' : 'hover:text-indigo-400'
              }
            >
              <AiFillHome className="mx-auto" />
              Home
            </Link>
          </li>
          <li className="flex flex-col item-center">
            <Link
              to="/my-jobs"
              className={
                activePage === '/my-jobs'
                  ? 'text-indigo-400'
                  : 'hover:text-indigo-400'
              }
            >
              <FaBookmark className="mx-auto" />
              <span className="whitespace-nowrap">My Jobs</span>
            </Link>
          </li>
          <li className="flex flex-col item-center">
            <Link
              to="/manage-jobs"
              className={
                activePage === '/manage-jobs'
                  ? 'text-indigo-400'
                  : 'hover:text-indigo-400'
              }
            >
              <BsFillBriefcaseFill className="mx-auto" />
              <span className="whitespace-nowrap">Manage Jobs</span>
            </Link>
          </li>
        </ul>
        <div className="flex gap-2 items-center ">
          <Link
            to="/add-job"
            className="px-5 py-2 bg-indigo-400 text-white cursor-pointer border-none outline-none  rounded-md hover:bg-indigo-500"
          >
            Add Job
          </Link>
          <ToggleThemeButton />
        </div>
      </div>
    </nav>
  )
}

export default Header
