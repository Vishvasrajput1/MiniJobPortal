import React from 'react'

export const InfoItem = ({ label, value, isDarkMode }) => (
  <p className="flex justify-between items-center text-sm font-roboto">
    <span
      className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}
    >
      {label}:
    </span>
    <span
      className={`${
        isDarkMode ? 'text-white' : 'text-gray-800'
      } font-medium text-right ml-4`}
    >
      {value || 'N/A'}
    </span>
  </p>
)
