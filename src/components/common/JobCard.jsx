import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { removeSavedJob, saveJob } from '../../feature/jobs/jobsSlice'
import { useSelector } from 'react-redux'

const JobCard = ({ jobDetails }) => {
  // console.log('jobDetails', jobDetails)
  const dispatch = useDispatch()
  const appliedJobsIds = useSelector(state => state.jobManager.appliedJobs)

  const [saved, setSaved] = useState(jobDetails.isSaved)
  const loc = useLocation()
  const showRemove = loc.pathname.includes('/my-jobs')
  const navigate = useNavigate()

  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    job_description: jobDescription,
    location,
    package_per_annum: packagePerAnnum,
    rating,
    certificates,
    hobby,
    education,
    experience,
    title,
    id,
  } = jobDetails

  const handleApplyClick = e => {
    e.stopPropagation()
    e.preventDefault()
    console.log('appliedJobsIds', appliedJobsIds)

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
    console.log('e', e, 'jobDetails', jobDetails)
  }
  const handleRemoveJob = e => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(removeSavedJob(id))
    setSaved(false)
  }
  return (
    <div className="bg-white border w-full border-gray-200 rounded-md cursor-pointer">
      <Link
        to={`/jobs/${id}`}
        className="text-decoration-none flex flex-col gap-4 p-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="size-18 object-cover"
            />
            <div className="title-rating-container-card">
              <h1 className="m-0 text-gray-900 font-roboto text-lg font-bold mb-1.5">
                {title}
              </h1>
              <div className="flex items-center gap-2">
                <AiFillStar className="text-#fbbf24 size-4" />
                <p className="m-0 text-gray-400 font-roboto text-base font-medium">
                  {rating}
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-3"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              disabled={appliedJobsIds.includes(id)}
              className={`px-3 py-1 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500 disabled:bg-indigo-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
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
                className="px-3 py-1 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
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
              {employmentType}
            </p>
          </div>
          <p className="m-0 text-gray-500 font-light text-base font-roboto ml-auto">
            {packagePerAnnum}
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
      </Link>
    </div>
  )
}

export default JobCard
