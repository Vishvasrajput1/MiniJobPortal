import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Toggle = ({
  options,
  activeIndex: controlledIndex,
  onChange,
  sizeSmall = false,
}) => {
  // If parent does not control, default to 0
  const [uncontrolledIndex, setUncontrolledIndex] = useState(0)
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const isControlled = controlledIndex !== undefined
  const activeIndex = isControlled ? controlledIndex : uncontrolledIndex

  const [dimensions, setDimensions] = useState({
    width: 0,
    transform: 0,
  })

  const buttonRefs = useRef([])
  const mainParentRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (buttonRefs.current[activeIndex] && mainParentRef.current) {
        const selectedButton = buttonRefs.current[activeIndex]
        const width = selectedButton.offsetWidth + 5
        const transform = selectedButton.offsetLeft

        setDimensions({
          width: width,
          transform: transform - 2,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [activeIndex, options])

  const handleClick = index => {
    if (!isControlled) setUncontrolledIndex(index)
    onChange?.(index)
  }

  return (
    <div
      ref={mainParentRef}
      className={`flex gap-1 text-sm  p-1 rounded-full border ${
        isDarkMode
          ? 'border-gray-600 bg-gray-900 text-white'
          : 'border-gray-200 bg-gray-50'
      } relative overflow-hidden w-fit`}
    >
      {/* highlight bar */}
      <div
        className="absolute left-0 bg-indigo-400 z-0 transition-transform duration-300 ease-ease rounded-full top-0.5 h-[calc(100%-4px)]"
        style={{
          width: `${dimensions.width}px`,
          transform: `translateX(${dimensions.transform}px)`,
        }}
      />
      {/* buttons */}
      {options.map((option, index) => {
        const Tag = option?.url ? Link : 'button'
        const params = {
          ...(option?.url && { to: option?.url }),
        }

        return (
          <Tag
            key={index}
            ref={el => (buttonRefs.current[index] = el)}
            className={`block font-semibold rounded-full transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } ease-in-out z-1 capitalize
              ${activeIndex === index && `text-white z-10`}
              ${sizeSmall ? 'text-xs py-[7px] px-3' : 'py-2 px-4'}`}
            onClick={() => handleClick(index)}
            {...params}
          >
            {option?.title}
          </Tag>
        )
      })}
    </div>
  )
}

export default Toggle
