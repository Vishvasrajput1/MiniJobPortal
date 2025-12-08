import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  certificateOptions,
  educationOptions,
  employmentTypeOptions,
  experienceOptions,
  hobbyOptions,
} from '../../options'
import { addJob, updateJob } from '../../feature/jobs/jobsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const AddJob = () => {
  const initialValues = {
    id: '',
    title: '',
    company: '',
    company_logo_url: '',
    location: '',
    employment_type: '',
    package_per_annum: '',
    rating: '',
    job_description: '',
    education: '',
    experience: '',
    certificates: '',
    hobby: '',
    datePosted: '',
  }

  const loc = useLocation()
  const { id } = useParams()
  const jobsData = useSelector(state => state.jobManager.jobs)
  const isEdit = loc.pathname.includes('edit')
  const navigate = useNavigate()
  const [formData, setFormData] = useState(
    jobsData.find(job => job.id === id) ?? initialValues
  )

  const formConfig = [
    {
      id: 'title',
      name: 'title',
      label: 'Title',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'company',
      name: 'company',
      label: 'Company',
      type: 'text',
      tag: 'input',
      required: false,
    },
    {
      id: 'company_logo_url',
      name: 'company_logo_url',
      label: 'Company Logo URL',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'location',
      name: 'location',
      label: 'Location',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'employment_type',
      name: 'employment_type',
      label: 'Employment Type',
      type: 'select',
      tag: 'select',
      options: employmentTypeOptions,
      required: true,
    },
    {
      id: 'package_per_annum',
      name: 'package_per_annum',
      label: 'Package per Annum',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'rating',
      name: 'rating',
      label: 'Rating',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'description',
      name: 'job_description',
      label: 'Description',
      type: 'text',
      tag: 'textarea',
      required: true,
    },
    {
      id: 'datePosted',
      name: 'datePosted',
      label: 'Date Posted',
      type: 'date',
      tag: 'input',
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

  console.log('formdata', formData)

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const handleChange = e => {
    console.log(e.target.name, e.target.value)

    const { name, value } = e.target
    if (name === 'hobby' || name === 'certificates' || name === 'education') {
      setFormData({
        ...formData,
        [name]: formData[name].includes(value)
          ? formData[name].filter(item => item !== value)
          : [...formData[name], value],
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

  const validateForm = data => {
    const newErrors = {}

    formConfig.forEach(field => {
      if (field.required && !data[field.name]) {
        newErrors[field.name] = `${
          field.label.charAt(0).toUpperCase() + field.label.slice(1)
        } is required.`
      }
    })
    if (!data.hobby || data.hobby.length === 0) {
      newErrors.hobby = 'Hobby is required.'
    }
    if (!data.certificates || data.certificates.length === 0) {
      newErrors.certificates = 'Certificates is required.'
    }
    if (!data.education || data.education.length === 0) {
      newErrors.education = 'Education is required.'
    }

    if (
      data.company_logo_url &&
      !/^(ftp|http|https):\/\/[^ "]+$/.test(data.company_logo_url)
    ) {
      newErrors.company_logo_url = 'Please enter a valid URL.'
    }
    if (
      data.rating &&
      (isNaN(Number(data.rating)) ||
        Number(data.rating) < 0 ||
        Number(data.rating) > 5)
    ) {
      newErrors.rating = 'Rating must be between 0 and 5.'
    }

    return newErrors
  }

  const handleAddJob = e => {
    e.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Payload:', formData)
      const payload = {
        ...formData,
        datePosted: formData.datePosted ? formData.datePosted : new Date(),
      }
      if (isEdit) {
        dispatch(updateJob(payload))
      } else {
        dispatch(addJob(payload))
      }

      setErrors({})
      setFormData({})
      toast.success(`Job ${isEdit ? 'updated' : 'added'} successfully`, {
        position: 'top-center',
        autoClose: 2000,
      })
      if (isEdit) {
        navigate('/manage-jobs')
      } else {
        navigate('/')
      }
    } else {
      setErrors(validationErrors)
      toast.error('Please fill in all required fields', {
        position: 'top-center',
        autoClose: 2000,
      })
      console.error('Validation Errors:', validationErrors)
    }
  }

  const renderFields = (field, index) => {
    const { type, name, options, label, required, tag } = field
    const error = errors[name]
    const value = isEdit ? formData[name] : field.value

    return (
      <div key={index} className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {tag === 'input' && (
          <input
            id={name}
            key={name}
            type={type}
            name={name}
            placeholder={label}
            value={value}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        )}
        {tag === 'textarea' && (
          <textarea
            name={name}
            placeholder={label}
            value={value}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        )}
        {tag === 'select' && (
          <select
            name={name}
            value={value}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-150 ease-in-out appearance-none ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
            } ${value === '' ? 'text-gray-500' : 'text-gray-900'}`}
          >
            <option value="" selected disabled hidden>
              {label}
            </option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {tag === 'checkbox' &&
          options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={option}
                name={name}
                value={option}
                onChange={handleChange}
                className="mr-2"
                checked={
                  formData[name] && formData[name].includes(option)
                    ? true
                    : false
                }
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <div className="max-h-[calc(100vh-72px)] overflow-hidden bg-gray-100 scrollbar-hide p-4 flex ">
        <div className="bg-white p-8 hide-scrollbar rounded-lg overflow-y-auto shadow-xl w-full max-w-2xl mx-auto scrollbar-hide">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Add New Job
          </h1>
          <form onSubmit={handleAddJob} className="space-y-4 scrollbar-hide">
            {formConfig.map((field, index) => renderFields(field, index))}
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 ease-in-out mt-4"
              >
                {isEdit ? 'Update Job' : 'Add Job'}
              </button>
              {isEdit && (
                <button
                  type="button"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 ease-in-out mt-4"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
