import React from 'react'
import { FaRegFileLines } from 'react-icons/fa6'


export const DocumentLink = ({ label, url, handleFileClick, isDarkMode }) => (
  <div className="flex items-center gap-3">
    <label
      className={`${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      } text-sm font-light`}
    >
      {label}:
    </label>
    {url ? (
      <button
        onClick={e => handleFileClick(e, url)}
        className="flex items-center gap-2 cursor-pointer text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out font-medium text-sm"
      >
        <FaRegFileLines className="w-4 h-4" />
        <span>View Document</span>
      </button>
    ) : (
      <span
        className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}
      >
        Not provided
      </span>
    )}
  </div>
)