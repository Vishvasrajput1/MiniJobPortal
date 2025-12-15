import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { arrangeData, generateJob } from '../../data/createjobsdata'
import { addJobs } from '../../feature/jobs/jobsSlice'
import { FilterSidebar } from '../common/FilterSidebar'
import JobCard from '../common/JobCard'

export const Dashboard = () => {
  const [apiData, setApiData] = useState([])
  const [page, setPage] = useState(1)
  const isFiltersOpen = useSelector(state => state.jobManager.isFiltersOpen)

  const jobsData = useSelector(state => state.jobManager.jobs)

  const [filteredJobs, setFilteredJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef(null)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)
  const dispatch = useDispatch()

  const handleLoadMoreData = () => {
    setIsLoading(true)
    const container = containerRef.current

    if (
      container.scrollTop + container.offsetHeight >=
      container.scrollHeight
    ) {
      setPage(prevPage => prevPage + 1)
    }
    if (container.scrollTop === 0) {
      setShowScrollTopButton(false)
    }
    if (container.scrollTop >= 5000) {
      setShowScrollTopButton(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        let arrangedData
        if (jobsData.length === 0 || page > 1) {
          const response = await axios.get(
            `https://jsonfakery.com/jobs/paginated?page=${page}`
          )
          arrangedData = arrangeData(response.data.data)
        } else {
          arrangedData = jobsData.slice(0, 10)
        }
        const uniqueJobs = arrangedData.filter(
          job => !apiData.find(j => j.id === job.id)
        )
        setApiData(prevData => [...prevData, ...uniqueJobs])
        setFilteredJobs(prevJobs => [...prevJobs, ...uniqueJobs])
        dispatch(addJobs([...apiData, ...uniqueJobs]))
      } catch (error) {
        console.error('Error:', error.message)
        const fallbackData = await generateJob()

        setApiData(prevData => [...prevData, ...fallbackData])
        setFilteredJobs(prevJobs => [...prevJobs, ...fallbackData])
        dispatch(addJobs([...apiData, ...fallbackData]))
      } finally {
        setIsLoading(false)
      }
    }

    if (!isFiltersOpen) {
      fetchData()
    }
  }, [page])

  return (
    <>    
      <div className="flex overflow-hidden max-h-[calc(100vh-72px)] bg-gray-100">
        <FilterSidebar
          initialData={apiData}
          setFilteredData={setFilteredJobs}
        />
        <div
          ref={containerRef}
          className="flex-1 p-4 overflow-y-auto hide-scrollbar space-y-4"
          onScroll={handleLoadMoreData}
        >
          {filteredJobs.map(job => (
            <JobCard key={job.id} jobDetails={job} />
          ))}
          {showScrollTopButton && (
            <button
              className="fixed bottom-4 right-4 bg-blue-500 text-white p-2  rounded"
              onClick={() => {
                containerRef.current.scrollTop = 0
                setShowScrollTopButton(false)
              }}
            >
              Scroll to Top
            </button>
          )}
          {isLoading && (
            <p className="text-center">
              {page >= 10 || isFiltersOpen ? 'No more data' : 'Loading...'}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
