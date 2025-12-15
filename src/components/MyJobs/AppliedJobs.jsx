import { useSelector } from 'react-redux'
import JobListItem from '../common/JobListItem'

export const AppliedJobs = () => {
  const appliedJobs = useSelector(state => state.jobManager.appliedJobs)

  return (
    <div className="flex-1 w-full mt-4 overflow-y-auto space-y-4 hide-scrollbar">
      {appliedJobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {appliedJobs.map(job => (
            <JobListItem key={job.id} jobDetails={job} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center  text-lg ">
          No applied jobs
        </div>
      )}
    </div>
  )
}
