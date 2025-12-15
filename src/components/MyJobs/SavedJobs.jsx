import { useSelector } from 'react-redux'
import JobCard from '../common/JobCard'

export const SavedJobs = () => {
  const savedJob = useSelector(state => state.jobManager.savedJobs)

  return (
    <div className="flex-1  mt-4 overflow-y-auto space-y-4 w-full hide-scrollbar">
      {savedJob.length === 0 ? (
        <div className="p-8 text-center  text-lg">No saved jobs</div>
      ) : (
        <>
          {savedJob.map(job => (
            <JobCard key={job.id} jobDetails={job} isSavedJob={true} />
          ))}
        </>
      )}
    </div>
  )
}
