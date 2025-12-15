import React from 'react'

export const Button = ({
  text,
  handleClick,
  size = 10,
  disabled,
  customClass,
}) => {
  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        className={
          customClass
            ? customClass
            : `lg:px-3 lg:py-1 lg:h-${size} px-2 py-1 h-8  bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500 disabled:bg-indigo-200 disabled:text-gray-400 disabled:cursor-not-allowed`
        }
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  )
}
