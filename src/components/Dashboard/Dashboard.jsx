import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterSidebar } from '../common/FilterSidebar'
import JobCard from '../common/JobCard'

export const Dashboard = () => {
  const jobsData = useSelector(state => state.jobManager.jobs)

  const [filteredJobs, setFilteredJobs] = useState(jobsData)

  return (
    <>
      <div className="flex overflow-hidden max-h-[calc(100vh-72px)] bg-gray-100">
        <FilterSidebar allData={jobsData} setFilteredData={setFilteredJobs} />
        <div className="flex-1 p-4 overflow-y-auto hide-scrollbar space-y-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} jobDetails={job} />
          ))}
        </div>
      </div>{' '}
    </>
  )
}
