import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import {
  certificateOptions,
  educationOptions,
  experienceOptions,
  hobbyOptions,
  maritalStatusOptions,
} from '../../options'
import { useDispatch, useSelector } from 'react-redux'
import { addCandidate } from '../../feature/jobs/jobsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { FcPrevious } from 'react-icons/fc'
import { validateForm } from '../../helper'
import { RenderField } from '../common/RenderField'

export const ApplyForm = () => {
  const { id } = useParams()

  const initialState = {
    job_id: '',
    id: '',
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    previous_company: '',
    position: '',
    maritial_status: '',
    address: '',
    education: '',
    hobby: '',
    certificates: '',
    experience: '',
  }
  const [formData, setFormData] = useState(initialState)

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'hobby' || name === 'certificates' || name === 'education') {
      setFormData({
        ...formData,
        [name]: formData[name].includes(value)
          ? formData[name].filter(item => item !== value)
          : [...formData[name], value],
      })
    } else if (name === 'resume' || name === 'coverLetter') {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setFormData({
        ...formData,
        [name]: { name: file.name, type: file.type, url },
      })
    } else
      setFormData({
        ...formData,
        [name]: value,
      })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleApplyJob = e => {
    e.preventDefault()
    const validationErrors = validateForm(formData, formConfig)

    if (Object.keys(validationErrors).length === 0) {
      dispatch(addCandidate({ ...formData, job_id: id }))

      setErrors({})
      setFormData(initialState)
      toast.success('Job applied successfully', {
        position: 'top-center',
        autoClose: 2000,
      })
      navigate(-1)
    } else {
      setErrors(validationErrors)
      toast.error('Please fill in all required fields', {
        position: 'top-center',
        autoClose: 2000,
      })
    }
  }

  const formConfig = [
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      paceholder: 'Enter your name',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      paceholder: 'Enter your email',
      type: 'email',
      tag: 'input',
      required: true,
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Phone',
      paceholder: 'Enter your phone number',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'resume',
      name: 'resume',
      label: 'Resume',
      paceholder: 'Upload your resume',
      type: 'file',
      tag: 'input',
      required: true,
    },
    {
      id: 'coverLetter',
      name: 'coverLetter',
      label: 'Cover Letter',
      paceholder: 'Upload your cover letter',
      type: 'file',
      tag: 'input',
    },
    {
      id: 'previous_company',
      name: 'previous_company',
      label: 'Previous Company',
      paceholder: 'Enter your previos company',
      type: 'text',
      tag: 'input',
    },
    {
      id: 'position',
      name: 'position',
      label: 'Position',
      paceholder: 'Enter your position',
      type: 'text',
      tag: 'input',
    },
    {
      id: 'maritial_status',
      name: 'maritial_status',
      label: 'Maritial Status',
      type: 'select',
      options: maritalStatusOptions,
      tag: 'select',
    },
    {
      id: 'address',
      name: 'address',
      label: 'Address',
      paceholder: 'Enter your address',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'education',
      name: 'education',
      label: 'Education',
      type: 'checkbox',
      options: educationOptions,
      tag: 'checkbox',
      required: true,
    },
    {
      id: 'experience',
      name: 'experience',
      label: 'Experience',
      type: 'select',
      options: experienceOptions,
      tag: 'select',
      required: true,
    },
    {
      id: 'certificates',
      name: 'certificates',
      label: 'Certificates',
      type: 'checkbox',
      options: certificateOptions,
      tag: 'checkbox',
      required: true,
    },
    {
      id: 'hobby',
      name: 'hobby',
      label: 'Hobby',
      type: 'checkbox',
      options: hobbyOptions,
      tag: 'checkbox',
      required: true,
    },
  ]

  return (
    <>
      <ToastContainer />
      <div
        className={`max-h-[calc(100vh-72px)] overflow-hidden ${
          isDarkMode ? 'bg-black' : 'bg-gray-100'
        } scrollbar-hide p-4 flex`}
      >
        <div
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-8 hide-scrollbar rounded-lg overflow-y-auto shadow-xl w-full max-w-2xl mx-auto scrollbar-hide`}
        >
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center`}>
            Apply For Job
          </h1>
          <form onSubmit={handleApplyJob} className="space-y-4 scrollbar-hide">
            {formConfig.map((field, index) => (
              <RenderField
                key={index}
                field={field}
                handleChange={handleChange}
                errors={errors}
                formData={formData}
              />
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 ease-in-out mt-4"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
