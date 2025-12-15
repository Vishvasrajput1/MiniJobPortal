import { useMemo, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  addJobView,
  removeJob,
  removeSavedJob,
  saveJob,
} from '../../feature/jobs/jobsSlice'
import { DeletePopUp } from '../common/DeletePopUp'
import { Button } from '../common/Button'

const JobDetails = () => {
  const { id } = useParams()
  const loc = useLocation()
  const isRemove = loc.state

  const jobsData = useSelector(state => state.jobManager.jobs)
  const savedJobs = useSelector(state => state.jobManager.savedJobs)
  const appliedJobs = useSelector(state => state.jobManager.appliedJobs)
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)

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
    is_remote_work: isRemoteWork,
    experience,
    certificates,
    skills,
    hobby,
    title,
  } = jobDetails || {}
  const handleSaveJob = () => {
    dispatch(saveJob(jobDetails))
    setSaved(true)
  }
  const handleRemoveSavedJob = () => {
    dispatch(removeSavedJob(id))
    setSaved(false)
  }
  const handleRemoveJobClick = () => {
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
          setShowDeletePopUp={() => setShowDeleteModal(false)}
          handleDelete={handleRemoveJob}
          isDarkMode={isDarkMode}
        />
      )}
      <div
        className={`${
          isDarkMode ? 'bg-black text-white' : 'bg-gray-100'
        } w-full p-4 flex max-h-[calc(100vh-72px)] h-[calc(100vh-76px)] hide-scrollbar overflow-hidden`}
      >
        {!jobDetails ? (
          <p className="mx-auto text-center h-full">Job not found</p>
        ) : (
          <div
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } mx-auto overflow-y-auto w-full flex flex-col  rounded-lg hide-scrollbar`}
          >
            <div
              className={`flex justify-between sticky top-0 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } z-10  p-6 mb-6`}
            >
              <div className="flex items-center gap-6">
                <img
                  src={companyLogoUrl}
                  alt="company logo"
                  className="size-24 object-cover rounded-full shadow-md"
                />
                <div>
                  <h1
                    className={`lg:text-3xl text-xl lg:font-extrabold font-bold  mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {title}
                  </h1>
                  <p>{jobCategory}</p>
                  <div className="flex items-center gap-2">
                    <AiFillStar className="text-yellow-500 size-6" />
                    <p
                      className={`lg:text-xl text-base font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {rating}
                    </p>
                  </div>
                </div>
              </div>
              {isRemove ? (
                <div className="flex items-center gap-2">
                  <Button text={'Remove'} handleClick={handleRemoveJobClick} />
                  <Button
                    text={'Edit'}
                    handleClick={() => {
                      navigate(`/jobs/${id}/edit`)
                      dispatch(addJobView(jobDetails))
                    }}
                  />
                </div>
              ) : appliedJobs?.find(job => job.id === id) ? (
                <p className="h-10 text-center p-2 bg-indigo-300 text-white cursor-pointer rounded-md">
                  Applied
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    text="Apply"
                    handleClick={() => {
                      navigate(`/jobs/${id}/apply`)
                      dispatch(addJobView(jobDetails))
                    }}
                  />
                  {!saved ? (
                    <Button text="Save" handleClick={handleSaveJob} size="10" />
                  ) : (
                    <Button
                      text="Saved"
                      handleClick={handleRemoveSavedJob}
                      size="10"
                    />
                  )}
                </div>
              )}
            </div>
            <div className=" rounded-lg lg:p-6 lg:mb-6 p-4 mb-4">
              <h2>
                <span className="text-lg font-semibold">Company :</span>{' '}
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {company}
                </span>
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
                  <span className={`${isDarkMode ? 'text-white' : ''} text-lg`}>
                    {location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <BsFillBriefcaseFill className="size-5 text-indigo-600" />
                  <span className={`${isDarkMode ? 'text-white' : ''} text-lg`}>
                    {' '}
                    {employmentType} {isRemoteWork === 1 && '(Remote)'}
                  </span>
                </div>
              </div>
              <p
                className={`text-xl font-bold mt-4 md:mt-0 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Package :{' '}
                <span
                  className={`${
                    isDarkMode ? 'text-yellow-400' : 'text-green-600'
                  } font-bold`}
                >
                  {packagePerAnnum
                    ? packagePerAnnum
                    : `${salaryFrom}-${salaryTo}`}
                </span>
              </p>
            </div>

            <div className=" rounded-lg lg:p-6 lg:mb-6 p-4 mb-4">
              <h2
                className={`text-2xl font-bold  mb-4 border-b pb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Description
              </h2>
              <p
                className={`mb-6 text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                {jobDescription}
              </p>
            </div>

            <div className="lg:p-6 p-4">
              <h2
                className={`text-2xl font-bold mb-4 border-b pb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Candidate Requirements
              </h2>
              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}
              >
                <span className="font-semibold">Education:</span>{' '}
                {education?.map(edu => (
                  <span
                    key={`edu-${edu}`}
                    className={`inline-block ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-700'
                    } px-2 py-0.5 rounded-full text-sm font-medium mr-2 mb-1`}
                  >
                    {edu}
                  </span>
                ))}
              </p>

              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}
              >
                <span className="font-semibold">Experience:</span>{' '}
                <span
                  className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {experience}
                </span>
              </p>

              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}
              >
                <span className="font-semibold">Skills:</span>{' '}
                {skills?.map((skill, index) => (
                  <span
                    key={`skill-${skill}-${index}`}
                    className={`inline-block ${
                      isDarkMode
                        ? 'bg-blue-900 text-blue-100'
                        : 'bg-blue-100 text-blue-800'
                    } px-2 py-0.5 rounded-full text-sm font-medium mr-2 mb-1`}
                  >
                    {skill}
                  </span>
                ))}
              </p>
              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}
              >
                <span className="font-semibold">Hobbies:</span>{' '}
                {hobby?.map((hb, index) => (
                  <span
                    key={`edu-${hb}-${index}`}
                    className={`inline-block ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-700'
                    } px-2 py-0.5 rounded-full text-sm font-medium mr-2 mb-1`}
                  >
                    {hb}
                  </span>
                ))}
              </p>
              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}
              >
                <span className="font-semibold">Certificates:</span>{' '}
                {certificates?.map((certificate, index) => (
                  <span
                    key={`edu-${certificate}-${index}`}
                    className={`inline-block ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-700'
                    } px-2 py-0.5 rounded-full text-sm font-medium mr-2 mb-1`}
                  >
                    {certificate}
                  </span>
                ))}
              </p>
              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}
              >
                <span className="font-semibold">Languages:</span>{' '}
                <span
                  className={`inline-block ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-100 text-gray-700'
                  } px-2 py-0.5 rounded-full text-sm font-medium mr-2 mb-1`}
                >
                  {qualifications?.split('/ ')}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default JobDetails
