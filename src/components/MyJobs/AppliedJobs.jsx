import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import JobListItem from '../common/JobListItem'

export const AppliedJobs = () => {
  const appliedJobsIds = useSelector(state => state.jobManager.appliedJobs)
  const jobsData = useSelector(state => state.jobManager.jobs)
  console.log('appliedJobs', appliedJobsIds)
  const [isLoading, setIsLoading] = useState(true)
  const [appliedJobs, setAppliedJobs] = useState([])
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true)

        const jobDetail = await jobsData.filter(job =>
          appliedJobsIds.includes(job.id)
        )
        console.log(jobDetail)
        setAppliedJobs(jobDetail)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobDetails()
  }, [jobsData, appliedJobsIds])

  return (
    <div className="flex-1 w-full mt-4 overflow-y-auto space-y-4 hide-scrollbar">
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : appliedJobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {appliedJobs.map(job => (
            <JobListItem key={job.id} jobDetails={job} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center h-[calc(100vh-72px)] my-auto text-lg bg-gray-100">
          No applied jobs
        </div>
      )}
    </div>
  )
}
