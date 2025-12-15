import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addJobView,
  removeSavedJob,
  saveJob,
} from '../../feature/jobs/jobsSlice'

const JobCard = ({ jobDetails, isSavedJob = false }) => {
  const dispatch = useDispatch()
  const appliedJobs = useSelector(state => state.jobManager.appliedJobs)
  const savedJobs = useSelector(state => state.jobManager.savedJobs)
  const appliedJobsIds = appliedJobs?.map(job => job?.id)

  const loc = useLocation()
  const showRemove = loc.pathname.includes('/my-jobs')
  const navigate = useNavigate()

  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    description: jobDescription,
    job_category: jobCategory,
    is_remote_work: isRemoteWork,
    package_per_annum: packagePerAnnum,
    salary_from: salaryFrom,
    salary_to: salaryTo,
    number_of_opening: numberOfOpenings,
    qualifications,
    company,
    contact,
    application_deadline,
    created_at,
    location,
    rating,
    certificates,
    hobby,
    education,
    experience,
    title,
    skills,
    id,
  } = jobDetails
  const [saved, setSaved] = useState(savedJobs.find(job => job.id === id))

  const handleApplyClick = e => {
    e.stopPropagation()
    e.preventDefault()

    if (!appliedJobsIds.includes(id)) {
      navigate(`/jobs/${id}/apply`)
      return
    }
  }

  const handleSaveJob = e => {
    e.stopPropagation()
    e.preventDefault()

    dispatch(saveJob(jobDetails))
    setSaved(true)
  }
  const handleRemoveJob = e => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(removeSavedJob(id))
    setSaved(false)
  }
  return (
    <div
      id="job-card"
      className="bg-white border w-full border-gray-200 rounded-md"
    >
      <div className="text-decoration-none flex flex-col lg:gap-4 lg:p-3 gap-3 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="size-18 object-cover rounded-md"
            />
            <div className="title-rating-container-card">
              <h1 className="m-0 text-gray-900 font-roboto lg:text-lg text-base font-bold mb-1.5">
                {title}
              </h1>
              <p>{jobCategory}</p>
              <div className="flex items-center gap-2">
                <AiFillStar className="text-#fbbf24 size-4" />
                <p className="m-0 text-gray-400 font-roboto text-base font-medium">
                  {rating}
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-shrink-0 items-center lg:gap-3 gap-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className={`lg:px-3 lg:py-1 lg:h-10 px-2 py-1 h-8   bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500 disabled:bg-indigo-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={e => {
                e.stopPropagation()
                dispatch(addJobView(jobDetails))
                navigate(`/jobs/${id}`)
              }}
            >
              view Details
            </button>

            <button
              type="button"
              disabled={appliedJobsIds.includes(id)}
              className={`lg:px-3 lg:py-1 lg:h-10 px-2 py-1 h-8  bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500 disabled:bg-indigo-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
              onClick={handleApplyClick}
            >
              {appliedJobsIds.includes(id) ? 'Applied' : 'Apply'}
            </button>
            {!saved ? (
              <button
                type="button"
                className=" cursor-pointer border-none outline-none"
                onClick={handleSaveJob}
              >
                <FaRegBookmark size={20} />
              </button>
            ) : showRemove ? (
              <button
                type="button"
                className="lg:px-3 lg:py-1 lg:h-10 px-2 py-1 h-8 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
                onClick={handleRemoveJob}
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                className="cursor-pointer border-none outline-none"
                onClick={handleRemoveJob}
              >
                <FaBookmark size={20} />
              </button>
            )}
          </div>
        </div>
        <div>
          <h2>
            <span className="text-lg font-semibold">Company :</span>{' '}
            <span className="text-gray-900">{company}</span>
          </h2>
          <div>
            Contact:<span> {contact}</span>
          </div>
          <div>
            Deadline: <span>{application_deadline}</span>
          </div>
          <div>
            Number of openings: <span>{numberOfOpenings}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex item-center  gap-1">
            <p className="flex items-center">
              <IoLocationSharp />
            </p>
            <p className=" text-gray-500 font-light text-base font-roboto">
              {location}
            </p>
          </div>
          <div className="flex item-center gap-1">
            <p className="flex items-center">
              <BsFillBriefcaseFill />
            </p>
            <p className="text-gray-500 font-light text-base font-roboto">
              {employmentType} {isRemoteWork === 1 && '(Remote)'}
            </p>
          </div>
          <p className="m-0 text-gray-500 font-light text-base font-roboto ml-auto">
            <span className="text-gray-900 font-semibold">Salary :</span>{' '}
            {packagePerAnnum ? packagePerAnnum : `${salaryFrom}-${salaryTo}`}
          </p>
        </div>
        <div className="flex  flex-col gap-2">
          <p className="m-0 text-gray-900 font-light text-base font-roboto">
            Education:{' '}
            <span className="text-gray-500 text-sm">
              {education?.join(', ')}
            </span>
          </p>
          <p className="m-0 text-gray-900 font-light text-base font-roboto">
            Experience:{' '}
            <span className="text-gray-500 text-sm">{experience}</span>
          </p>
          <p className="m-0 text-gray-900 font-light text-base font-roboto">
            Certificates:{' '}
            <span className="text-gray-500 text-sm">
              {certificates?.join(', ')}
            </span>
          </p>
          <p className="m-0 text-gray-900 font-light text-base font-roboto">
            Hobbies:{' '}
            <span className="text-gray-500 text-sm">{hobby?.join(', ')}</span>
          </p>
          <p className="m-0 text-gray-900 font-light text-base font-roboto">
            Skills:{' '}
            <span className="text-gray-500 text-sm">{skills?.join(', ')}</span>
          </p>
          <p className="m-0 text-gray-900 font-light text-base font-roboto">
            Qualification:{' '}
            <span className="text-gray-500 text-sm">
              {qualifications?.split(', ')}
            </span>
          </p>
        </div>
        <hr className="separator" />
        <div>
          <h1 className="m-0 text-gray-900 font-roboto text-lg font-bold">
            Description
          </h1>
          <p className="m-0 text-gray-500 font-light text-base font-roboto">
            {jobDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

export default JobCard
