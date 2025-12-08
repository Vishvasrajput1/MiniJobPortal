import { AiFillHome } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'

import { Link } from 'react-router-dom'

const Header = () => {
  const activePage = window.location.pathname
  return (
    <nav className="nav flex border-b border-gray-200">
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
        <div>
          <Link
            to="/add-job"
            className="px-5 py-2 bg-indigo-400 text-white cursor-pointer border-none outline-none mt-3 rounded-md hover:bg-indigo-500"
          >
            Add Job
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
