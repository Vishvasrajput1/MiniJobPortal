import React, { useEffect, useState } from 'react'
import {
  certificateOptions,
  educationOptions,
  experienceOptions,
  hobbyOptions,
} from '../../options'
import { IoMdClose } from 'react-icons/io'

export const FilterSidebar = ({ allData, setFilteredData, title = 'Jobs' }) => {
  const [filter, setFilter] = useState({
    education: [],
    hobbies: [],
    certificates: [],
    experience: null,
  })
  const [length, setLength] = useState(0)

  const handleFilterChange = (e, field) => {
    if (e.target.checked) {
      if (field === 'experience') {
        setFilter(prevFilter => ({
          ...prevFilter,
          [field]: e.target.value,
        }))
      } else {
        setFilter(prevFilter => ({
          ...prevFilter,
          [field]: [...prevFilter[field], e.target.value],
        }))
      }
    } else {
      if (field === 'experience') {
        setFilter(prevFilter => ({
          ...prevFilter,
          [field]: null,
        }))
      } else {
        setFilter(prevFilter => ({
          ...prevFilter,
          [field]: prevFilter[field].filter(value => value !== e.target.value),
        }))
      }
    }
  }
  useEffect(() => {
    let filtered = allData
    if (filter.education.length > 0) {
      filtered = filtered.filter(job =>
        filter.education.every(edu => job.education.includes(edu))
      )
    }
    if (filter.hobbies.length > 0) {
      filtered = filtered.filter(job =>
        filter.hobbies.every(hobby => job.hobby.includes(hobby))
      )
    }
    if (filter.certificates.length > 0) {
      filtered = filtered.filter(job =>
        filter.certificates.every(cert => job.certificates.includes(cert))
      )
    }
    if (filter.experience) {
      filtered = filtered.filter(job => job.experience === filter.experience)
    }
    // console.log('filtered', filtered)

    setFilteredData(filtered)
    setLength(filtered.length)
  }, [filter, allData, setFilteredData])
  // console.log(filter)
  return (
    <div className="scrollbar-hide">
      <div className="bg-white p-4">
        {filter.education.length > 0 ||
        filter.hobbies.length > 0 ||
        filter.certificates.length > 0 ||
        filter.experience ? (
          <div className="flex  justify-between item-center">
            <h3 className="font-semibold">
              {' '}
              Filtered {title} ({length})
            </h3>
            <button
              className="ml-4 bg-red-300 text-gray-600 hover:bg-red-400   text-xs rounded-md p-1 cursor-pointer"
              onClick={() =>
                setFilter(prevFilter => ({
                  ...prevFilter,
                  education: [],
                  hobbies: [],
                  certificates: [],
                  experience: null,
                }))
              }
            >
              Clear All
            </button>
          </div>
        ) : (
          <div className="flex  item-center">
            <h3 className="font-semibold">All {title}</h3>
          </div>
        )}
      </div>
      <div className="p-4 hide-scrollbar shadow-lg bg-white  h-[calc(100vh-128px)] scrollbar-hide overflow-y-auto">
        <div className="flex mb-2 item-center">
          <h3 className="font-semibold">Filter by Education</h3>
          {filter.education.length > 0 && (
            <button
              className="ml-4 px-1 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() =>
                setFilter(prevFilter => ({ ...prevFilter, education: [] }))
              }
            >
              <IoMdClose />
            </button>
          )}
        </div>
        {educationOptions.map(option => (
          <label key={option} className="block text-sm">
            <input
              type="checkbox"
              value={option}
              className="mr-2 text-xs"
              checked={filter.education.includes(option)}
              onChange={e => handleFilterChange(e, 'education')}
            />
            {option}
          </label>
        ))}

        <div className="flex mb-2 mt-4 item-center">
          <h3 className="font-semibold">Filter by Hobbies</h3>
          {filter.hobbies.length > 0 && (
            <button
              className="ml-4 px-1 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() =>
                setFilter(prevFilter => ({ ...prevFilter, hobbies: [] }))
              }
            >
              <IoMdClose />
            </button>
          )}
        </div>
        {hobbyOptions.map(option => (
          <label key={option} className="block text-sm">
            <input
              type="checkbox"
              value={option}
              checked={filter.hobbies.includes(option)}
              className="mr-2 text-xs"
              onChange={e => handleFilterChange(e, 'hobbies')}
            />
            {option}
          </label>
        ))}
        <div className="flex mb-2 mt-4 item-center">
          <h3 className="font-semibold">Filter by Certificates</h3>
          {filter.certificates.length > 0 && (
            <button
              className="ml-4 px-1 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() =>
                setFilter(prevFilter => ({
                  ...prevFilter,
                  certificates: [],
                }))
              }
            >
              <IoMdClose />
            </button>
          )}
        </div>
        {certificateOptions.map(option => (
          <label key={option} className="block text-sm">
            <input
              type="checkbox"
              value={option}
              checked={filter.certificates.includes(option)}
              className="mr-2 text-xs"
              onChange={e => handleFilterChange(e, 'certificates')}
            />
            {option}
          </label>
        ))}
        <div className="flex mb-2 mt-4 item-center">
          <h3 className="font-semibold">Filter by Experience</h3>
          {filter.experience && (
            <button
              className="ml-4 px-1 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() =>
                setFilter(prevFilter => ({ ...prevFilter, experience: '' }))
              }
            >
              <IoMdClose />
            </button>
          )}
        </div>
        {experienceOptions.map(option => (
          <label key={option} className="block text-sm">
            <input
              type="checkbox"
              value={option}
              checked={filter.experience === option}
              className="mr-2 text-xs"
              onChange={e => handleFilterChange(e, 'experience')}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}
