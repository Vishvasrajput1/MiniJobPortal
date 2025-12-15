import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCandidate, selectCandidate } from '../../feature/jobs/jobsSlice'
import { Button } from './Button'
import { InfoItem } from './InfoItem'
import { DocumentLink } from './DocumentLink'

const CandidateCard = ({ candidateDetails }) => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
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
    <div
      className={`${
        isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-xl'
      } rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                profile_pic ||
                'https://cdn.pixabay.com/photo/2016/03/31/19/10/avatar-1294773_1280.png'
              }
              alt="user avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="flex flex-col">
              <span
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {name}
              </span>
              <span className="text-sm text-blue-500">{email}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selected ? (
              <div className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-md">
                Selected
              </div>
            ) : (
              <Button text="Select" handleClick={handleSelect} />
            )}
            <Button text="Reject" handleClick={handleReject} />
          </div>
        </div>

        <div
          className={`flex flex-col gap-3 p-5 rounded-lg ${
            isDarkMode
              ? 'border border-gray-700 bg-gray-700/50'
              : 'border border-gray-200 bg-gray-50'
          }`}
        >
          <InfoItem key={phone} label="Phone" value={phone} isDarkMode={isDarkMode} />
          <InfoItem key={address} label="Address" value={address} isDarkMode={isDarkMode} />
          <InfoItem
            key={maritialStatus}
            label="Marital Status"
            value={maritialStatus}
            isDarkMode={isDarkMode}
          />
          <InfoItem
            key={previousCompany}
            label="Previous Company"
            value={previousCompany}
            isDarkMode={isDarkMode}
          />
          <InfoItem key={position} label="Position" value={position} isDarkMode={isDarkMode} />
        </div>

        <div
          className={`flex flex-wrap gap-6 p-5 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <DocumentLink
            key={resume?.url}
            label="Resume"
            url={resume?.url}
            handleFileClick={handleFileClick}
            isDarkMode={isDarkMode}
          />
          <DocumentLink
            key={coverLetter?.url}
            label="Cover Letter"
            url={coverLetter?.url}
            handleFileClick={handleFileClick}
            isDarkMode={isDarkMode}
          />
        </div>

        <div
          className={`flex flex-col gap-4 p-5 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700/50 border border-gray-700'
              : 'bg-gray-50 border border-gray-200'
          }`}
        >
          <InfoItem
            label="Education"
            value={education?.join(', ')}
            isDarkMode={isDarkMode}
          />
          <InfoItem
            label="Experience"
            value={experience}
            isDarkMode={isDarkMode}
          />
          <InfoItem
            label="Certificates"
            value={certificates?.join(', ')}
            isDarkMode={isDarkMode}
          />
          <InfoItem
            label="Hobbies"
            value={hobby?.join(', ')}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
