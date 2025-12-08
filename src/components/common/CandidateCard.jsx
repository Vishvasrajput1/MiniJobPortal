import { useState } from 'react'

import { FaRegFileLines } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCandidate, selectCandidate } from '../../feature/jobs/jobsSlice'

const CandidateCard = ({ candidateDetails }) => {
  // console.log('jobDetails', jobDetails)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(candidateDetails.isSelected)

  const {
    resume,
    coverLetter,
    previous_company: previousCompany,
    position,
    maritial_status: maritialStatus,
    profile_pic,
    address,
    name,
    email,
    phone,
    certificates,
    hobby,
    education,
    experience,
    id,
  } = candidateDetails

  const handleFileClick = (e, url) => {
    e.stopPropagation()
    e.preventDefault()
    window.open(url, '_blank')
  }

  const handleSelect = e => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(selectCandidate(candidateDetails))
    setSelected(true)
  }
  const handleReject = e => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(removeCandidate(id))
    setSelected(false)
  }
  return (
    <div className="bg-white border border-gray-300 rounded-md cursor-pointer">
      <Link
        // to={`/candidates/${id}`}
        className="text-decoration-none flex flex-col gap-4 p-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={
                profile_pic ||
                'https://cdn.pixabay.com/photo/2016/03/31/19/10/avatar-1294773_1280.png'
              }
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold">{name}</span>
              <span className="text-sm text-indigo-500">{email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selected ? (
              <div className="px-3 py-1 bg-indigo-300 text-white cursor-pointer border-none outline-none rounded-md">
                Selected
              </div>
            ) : (
              <button
                onClick={handleSelect}
                className="px-3 py-1 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
              >
                Select
              </button>
            )}
            <button
              onClick={handleReject}
              className="px-3 py-1 bg-indigo-400 text-white cursor-pointer border-none outline-none rounded-md hover:bg-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-indigo-50 p-3 border border-indigo-200">
          <p className=" font-light text-base font-roboto">
            Phone: <span className="text-gray-800 text-sm">{phone}</span>
          </p>
          <p className=" font-light text-base font-roboto">
            Address: <span className="text-gray-800 text-sm">{address}</span>
          </p>
          <p className="font-light text-base font-roboto">
            Maritial Status:{' '}
            <span className="text-gray-800 text-sm">{maritialStatus}</span>
          </p>
          <p className="font-light text-base font-roboto">
            Previous Company:{' '}
            <span className="text-gray-800 text-sm">{previousCompany}</span>
          </p>
          <p className="font-light text-base font-roboto">
            Position: <span className="text-gray-800 text-sm">{position}</span>
          </p>
        </div>
        <div className="flex  gap-20 bg-indigo-50 p-3 border border-indigo-200">
          <div className="m-0 text-gray-900  gap-2 flex item-center  text-base font-roboto">
            <label htmlFor="resume">Resume:</label>
            <button
              onClick={e => handleFileClick(e, resume.url)}
              target="_blank"
              className="flex items-center gap-2 cursor:pointer hover:text-indigo-400"
            >
              <FaRegFileLines />
              <span className="">View</span>
            </button>
          </div>
          <div className="m-0 text-gray-900 flex item-center gap-2 text-base font-roboto">
            Cover Letter:{' '}
            {coverLetter?.url && (
              <button
                onClick={e => handleFileClick(e, coverLetter.url)}
                target="_blank"
                className="flex items-center gap-2 cursor:pointer hover:text-indigo-400"
              >
                <FaRegFileLines />
                <span className="">View</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex  flex-col gap-2 bg-indigo-50 p-3 border border-indigo-200">
          <p className="font-light text-base font-roboto">
            Education:{' '}
            <span className="text-gray-800 text-sm">
              {education?.join(', ')}
            </span>
          </p>
          <p className="font-light text-base font-roboto">
            Experience:{' '}
            <span className="text-gray-800 text-sm">{experience}</span>
          </p>
          <p className="font-light text-base font-roboto">
            Certificates:{' '}
            <span className="text-gray-800 text-sm">
              {certificates?.join(', ')}
            </span>
          </p>
          <p className="font-light text-base font-roboto">
            Hobbies:{' '}
            <span className="text-gray-800 text-sm">{hobby?.join(', ')}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default CandidateCard
