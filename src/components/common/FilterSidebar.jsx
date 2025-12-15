import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import useFilterData from '../../hooks/useFilterData'
import {
  certificateOptions,
  educationOptions,
  experienceOptions,
  hobbyOptions,
} from '../../options'
import axios from 'axios'
import { arrangeData } from '../../data/createjobsdata'
import { useSelector } from 'react-redux'

export const FilterSidebar = ({
  initialData,
  setFilteredData,
  title = 'Jobs',
}) => {
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const [jobsData, setJobsData] = useState([])
  const [filter, setFilter] = useState({
    education: [],
    hobbies: [],
    certificates: [],
    experience: null,
  })
  const [search, setSearch] = useState('')
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
  const debounce = (func, delay = 500) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (jobsData.length > 0 || title !== 'Jobs') return
        const response = await axios.get('https://jsonfakery.com/jobs')
        setJobsData(arrangeData(response.data))
      } catch (error) {
        console.error(error)
      }
    }

    fetchAllData()
  }, [])

  debounce(
    useFilterData(
      jobsData.length === 0 ? initialData : jobsData,
      initialData,
      filter,
      setFilteredData,
      setLength,
      search
    )
  )

  return (
    <div className="scrollbar-hide">
      <div
        className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-4`}
      >
        {filter.education.length > 0 ||
        filter.hobbies.length > 0 ||
        filter.certificates.length > 0 ||
        filter.experience ||
        search ? (
          <div className="flex  justify-between item-center">
            <h3 className="font-semibold">
              {' '}
              {title} ({length})
            </h3>
            <button
              className={`ml-4 ${
                isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-300 text-gray-600 hover:bg-red-400 '
              } text-xs rounded-md p-1 cursor-pointer`}
              onClick={() => {
                setFilter(prevFilter => ({
                  ...prevFilter,
                  education: [],
                  hobbies: [],
                  certificates: [],
                  experience: null,
                }))
                setSearch('')
              }}
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
      <div
        className={`${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
        } p-4  flex items-center`}
      >
        <input
          type="text"
          id="search"
          placeholder="Search by title , description or location ..."
          className={`w-full p-2 border border-gray-1200 rounded-lg focus:shadow-sm focus:border-indigo-300 focus:outline-none transition duration-150 ease-in-out ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            className={`ml-4 ${
              isDarkMode
                ? 'text-white hover:text-gray-300'
                : 'text-gray-700 hover:text-gray-900'
            }  rounded-md p-1 cursor-pointer`}
            onClick={() => setSearch('')}
          >
            <IoMdClose />
          </button>
        )}
      </div>
      <div
        className={`${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
        } p-4 hide-scrollbar shadow-lg  h-[calc(100vh-200px)] scrollbar-hide overflow-y-auto`}
      >
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
              type="radio"
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
