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
import { Button } from './Button'

const JobCard = ({ jobDetails, isSavedJob = false }) => {
  const dispatch = useDispatch()
  const appliedJobs = useSelector(state => state.jobManager.appliedJobs)
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
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
      dispatch(addJobView(jobDetails))
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
      className={`${
        isDarkMode
          ? 'bg-gray-800 border-gray-700 shadow-lg'
          : 'bg-white border-gray-200 shadow-md'
      } border w-full rounded-xl p-4 lg:p-6 transition duration-300 hover:shadow-xl`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="size-16 object-cover rounded-lg shadow-sm"
            />
            <div>
              <h1
                className={`m-0 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } font-semibold text-xl mb-1`}
              >
                {title}
              </h1>
              <p
                className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } text-sm mb-1`}
              >
                {company}
              </p>
              <p
                className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                } text-sm`}
              >
                {jobCategory}
              </p>
              <div
                className={` ${
                  isDarkMode ? 'text-white' : 'text-gray-700'
                } flex items-center gap-2 mt-1`}
              >
                <AiFillStar className="text-yellow-400 size-4" />
                <p className="m-0 text-sm font-medium">{rating}</p>
              </div>
            </div>
          </div>

          <div
            className="flex shrink-0 items-center gap-3"
            onClick={e => e.stopPropagation()}
          >
            <Button text="View" handleClick={() => navigate(`/jobs/${id}`)} />

            <Button
              text={appliedJobsIds.includes(id) ? 'Applied' : 'Apply'}
              handleClick={handleApplyClick}
              disabled={appliedJobsIds.includes(id)}
            />
            {!saved ? (
              <Button
                text={<FaRegBookmark size={20} />}
                handleClick={handleSaveJob}
                customClass={`cursor-pointer border p-2 rounded-lg ${
                  isDarkMode
                    ? 'text-white border-gray-600 hover:bg-gray-700'
                    : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                }`}
              />
            ) : showRemove ? (
              <Button text={'Remove'} handleClick={handleRemoveJob} />
            ) : (
              <Button
                text={<FaBookmark size={20} />}
                handleClick={handleRemoveJob}
                customClass={`cursor-pointer border p-2 rounded-lg ${
                  isDarkMode
                    ? 'text-yellow-400 border-yellow-400/50'
                    : 'text-yellow-500 border-yellow-500/50'
                }`}
              />
            )}
          </div>
        </div>

        <div
          className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          } grid grid-cols-3 gap-2 text-sm`}
        >
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-gray-400" />
            <p className="m-0 font-light">{location}</p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillBriefcaseFill className="text-gray-400" />
            <p className="m-0 font-light">
              {employmentType} {isRemoteWork === 1 && '(Remote)'}
            </p>
          </div>
          <div className="flex justify-end">
            <p
              className={`m-0 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              } font-semibold text-lg`}
            >
              Salary :{' '}
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
          <div>
            <p>
              <span className="font-semibold">Deadline:</span>{' '}
              <span>{application_deadline}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Openings:</span>{' '}
              <span>{numberOfOpenings}</span>
            </p>
          </div>
        </div>

        <hr className={isDarkMode ? 'border-gray-700' : 'border-gray-200'} />

        <div className="flex flex-col gap-3">
          <h3
            className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Requirements
          </h3>

          <p
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}
          >
            <span className="font-semibold">Education:</span>{' '}
            {education?.map(edu => (
              <span
                key={`edu-${edu}`}
                className={`inline-block ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-700'
                } px-2 py-0.5 rounded-full text-xs font-medium mr-2 mb-1`}
              >
                {edu}
              </span>
            ))}
          </p>

          <p
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}
          >
            <span className="font-semibold">Experience:</span>{' '}
            <span
              className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {experience}
            </span>
          </p>

          <p
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}
          >
            <span className="font-semibold">Skills:</span>{' '}
            {skills?.map((skill, index) => (
              <span
                key={`skill-${skill}-${index}`}
                className={`inline-block ${
                  isDarkMode
                    ? 'bg-blue-900 text-blue-100'
                    : 'bg-blue-100 text-blue-800'
                } px-2 py-0.5 rounded-full text-xs font-medium mr-2 mb-1`}
              >
                {skill}
              </span>
            ))}
          </p>
          <p
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}
          >
            <span className="font-semibold">Hobbies:</span>{' '}
            {hobby?.map((hb, index) => (
              <span
                key={`edu-${hb}-${index}`}
                className={`inline-block ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-700'
                } px-2 py-0.5 rounded-full text-xs font-medium mr-2 mb-1`}
              >
                {hb}
              </span>
            ))}
          </p>
          <p
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}
          >
            <span className="font-semibold">Certificates:</span>{' '}
            {certificates?.map((certificate, index) => (
              <span
                key={`edu-${certificate}-${index}`}
                className={`inline-block ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-700'
                } px-2 py-0.5 rounded-full text-xs font-medium mr-2 mb-1`}
              >
                {certificate}
              </span>
            ))}
          </p>
        </div>

        <hr className={isDarkMode ? 'border-gray-700' : 'border-gray-200'} />

        <div>
          <h3
            className={`m-0 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } font-semibold mb-2`}
          >
            Description
          </h3>
          <p
            className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } m-0 text-sm line-clamp-3`}
          >
            {jobDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

export default JobCard
