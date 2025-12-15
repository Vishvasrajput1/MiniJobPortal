import React from 'react'
import { useSelector } from 'react-redux'

export const RenderField = ({
  field,
  handleChange,
  errors,
  formData,
  isEdit = false,
}) => {
  const { type, name, options, label, required, tag } = field
  const error = errors[name]
  const value = isEdit ? formData[name] : field?.value
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)

  return (
    <div className="mb-4">
      <label
        className={`block ${
          isDarkMode ? 'text-white' : 'text-gray-700'
        } font-semibold mb-2`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {tag === 'input' && (
        <input
          id={name}
          key={name}
          type={type}
          name={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        />
      )}
      {tag === 'textarea' && (
        <textarea
          name={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        />
      )}
      {/* {tag === 'textarea' && (
        <textarea
          name={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
        />
      )} */}
      {tag === 'select' && (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out appearance-none ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          } ${
            value === ''
              ? !isDarkMode
                ? 'text-gray-500'
                : 'text-gray-900'
              : isDarkMode
              ? 'text-white'
              : 'text-gray-700'
          }
       `}
        >
          <option value="" selected disabled>
            {label}
          </option>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {tag === 'checkbox' &&
        options.map((option, index) => (
          <div
            key={index}
            className={`${
              isDarkMode ? 'text-white' : 'text-gray-700'
            } flex items-center mb-2`}
          >
            <input
              type="checkbox"
              id={option}
              name={name}
              value={option}
              onChange={handleChange}
              className="mr-2"
              checked={
                formData[name] && formData[name].includes(option) ? true : false
              }
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
