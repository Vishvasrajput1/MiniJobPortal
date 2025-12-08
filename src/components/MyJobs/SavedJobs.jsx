import { useSelector } from 'react-redux'
import JobCard from '../common/JobCard'

export const SavedJobs = () => {
  const savedJob = useSelector(state =>
    state.jobManager.jobs.filter(job => job.isSaved)
  )
  console.log('SavedjobsData', savedJob)
  if (savedJob.length === 0) {
    return (
      <div className="p-8 text-center h-[calc(100vh-72px)] my-auto text-lg bg-gray-100">
        No saved jobs
      </div>
    )
  }
  return (
    <div className="flex-1  mt-4 overflow-y-auto space-y-4 hide-scrollbar">
      {savedJob.map(job => (
        <JobCard key={job.id} jobDetails={job} isSavedJob={true} />
      ))}
    </div>
  )
}
