import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../feature/jobs/jobsSlice'

export const ToggleThemeButton = () => {
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const dispatch = useDispatch()

  return (
    <div className="flex items-center">
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
          isDarkMode
            ? 'bg-gray-900 border border-gray-700 hover:bg-gray-700  text-white shadow(10px 10px 20px rgba(250, 247, 247))'
            : 'bg-white border border-gray-300 hover:bg-gray-300'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className=" text-white" />
        ) : (
          <Moon className="text-gray-700" />
        )}
      </button>
    </div>
  )
}
