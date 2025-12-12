import { useMemo, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  removeJob,
  removeSavedJob,
  saveJob,
} from '../../feature/jobs/jobsSlice'
import { DeletePopUp } from '../common/DeletePopUp'

const JobDetails = () => {
  const { id } = useParams()
  const loc = useLocation()
  const isRemove = loc.state

  const jobsData = useSelector(state => state.jobManager.jobs)
  const savedJobs = useSelector(state => state.jobManager.savedJobs)
  const appliedJobs = useSelector(state => state.jobManager.appliedJobs)
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const jobDetails = useMemo(() => {
    return (
      jobsData.find(job => job.id === id) ||
      appliedJobs.find(job => job.id === id) ||
      savedJobs.find(job => job.id === id)
    )
  }, [jobsData, id, appliedJobs, savedJobs])
  const [saved, setSaved] = useState(savedJobs.find(job => job.id === id))

  const dispatch = useDispatch()

  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    description: jobDescription,
    location,
    qualifications,
    salary_from: salaryFrom,
    salary_to: salaryTo,
    package_per_annum: packagePerAnnum,
    rating,
    education,
    company,
    contact,
    application_deadline,
    number_of_opening: numberOfOpenings,
    job_category: jobCategory,
    created_at,
    is_remote_work: isRemoteWork,
    experience,
    certificates,
    skills,
    hobby,
    title,
  } = jobDetails || {}
  const handleSaveJob = e => {
    e.stopPropagation()
    e.preventDefault()

    dispatch(saveJob(jobDetails))
    setSaved(true)
  }
  const handleRemoveSavedJob = e => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(removeSavedJob(id))
    setSaved(false)
  }
  const handleRemoveJobClick = e => {
    e.stopPropagation()
    e.preventDefault()
    setShowDeleteModal(true)
  }

  const handleRemoveJob = () => {
    dispatch(removeJob(id))
    setShowDeleteModal(false)
    navigate('/manage-jobs')
  }
  return (
    <>
      {showDeleteModal && (
        <DeletePopUp
          showDeletePopUp={showDeleteModal}
          setShowDeletePopUp={setShowDeleteModal}
          handleDelete={handleRemoveJob}
        />
      )}
      <div className="bg-gray-100 w-full p-4 flex max-h-[calc(100vh-72px)] h-[calc(100vh-76px)] hide-scrollbar overflow-hidden">
        {!jobDetails ? (
          <p className="mx-auto text-center h-full">Job not found</p>
        ) : (
          <div className="mx-auto overflow-y-auto w-full flex flex-col bg-white rounded-lg hide-scrollbar">
            <div className=" flex justify-between sticky top-0 bg-white z-10  p-6 mb-6">
              <div className="flex items-center gap-6">
                <img
                  src={companyLogoUrl}
                  alt="company logo"
                  // Slightly larger logo for a full page view
                  className="size-24 object-cover rounded-full shadow-md"
                />
                <div>
                  {/* Larger title for main page prominence */}
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
                    {title}
                  </h1>
                  <p>{jobCategory}</p>
                  <div className="flex items-center gap-2">
                    <AiFillStar className="text-yellow-500 size-6" />
                    <p className="text-xl font-semibold text-gray-700">
                      {rating}
                    </p>
                  </div>
                </div>
              </div>
              {isRemove ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 h-10 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
                    onClick={handleRemoveJobClick}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 h-10 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
                    onClick={() => navigate(`/jobs/${id}/edit`)}
                  >
                    Edit
                  </button>
                </div>
              ) : appliedJobs?.find(job => job.id === id) ? (
                <p className="px-3 py-2 h-10 bg-indigo-300 text-white cursor-pointer rounded-md">
                  Applied
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 h-10 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
                    onClick={() => navigate(`/jobs/${id}/apply`)}
                  >
                    Apply
                  </button>
                  {!saved ? (
                    <button
                      type="button"
                      className="px-3 h-10 py-1 text-indigo-400 cursor-pointer border border-indigo-400 rounded-lg hover:bg-indigo-50"
                      onClick={handleSaveJob}
                    >
                      save
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="px-3 h-10 py-1 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
                      onClick={handleRemoveSavedJob}
                    >
                      saved
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className=" rounded-lg p-6 mb-6">
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
            <div className="  p-6 mb-6 flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-8 text-gray-600">
                <div className="flex items-center gap-3">
                  <IoLocationSharp className="size-5 text-indigo-600" />
                  <span className="text-lg">{location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BsFillBriefcaseFill className="size-5 text-indigo-600" />
                  <span className="text-lg">
                    {' '}
                    {employmentType} {isRemoteWork === 1 && '(Remote)'}
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-green-700 mt-4 md:mt-0">
                Package :{' '}
                {packagePerAnnum
                  ? packagePerAnnum
                  : `${salaryFrom}-${salaryTo}`}
              </p>
            </div>

            <div className=" rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                Description
              </h2>
              <p className="text-gray-700  mb-6 text-lg">{jobDescription}</p>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                Candidate Requirements
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex flex-col md:flex-row">
                  <span className="font-semibold w-40">Education:</span>{' '}
                  <span className="text-gray-600 mt-1 md:mt-0">
                    {education?.join(', ')}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row">
                  <span className="font-semibold w-40">Experience:</span>{' '}
                  <span className="text-gray-600 mt-1 md:mt-0">
                    {experience}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row">
                  <span className="font-semibold w-40">Certificates:</span>{' '}
                  <span className="text-gray-600 mt-1 md:mt-0">
                    {certificates?.join(', ')}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row">
                  <span className="font-semibold w-40">Hobbies:</span>{' '}
                  <span className="text-gray-600 mt-1 md:mt-0">
                    {hobby?.join(', ')}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row">
                  <span className="font-semibold w-40">Skills:</span>{' '}
                  <span className="text-gray-600 mt-1 md:mt-0">
                    {skills?.join(', ')}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row">
                  <span className="font-semibold w-40">Qualifications:</span>{' '}
                  <span className="text-gray-600 mt-1 md:mt-0">
                    {qualifications?.split(', ')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default JobDetails
