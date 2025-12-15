import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { addJob, updateJob } from '../../feature/jobs/jobsSlice'
import { validateForm } from '../../helper'
import {
  certificateOptions,
  educationOptions,
  employmentTypeOptions,
  experienceOptions,
  hobbyOptions,
} from '../../options'
import { RenderField } from '../common/RenderField'

export const AddJob = ({ isEdit, jobId: id }) => {
  const initialValues = {
    id: '',
    title: '',
    company: '',
    company_logo_url: '',
    location: '',
    employment_type: '',
    package_per_annum: '',
    rating: '',
    description: '',
    education: '',
    experience: '',
    certificates: '',
    hobby: '',
    datePosted: '',
    application_deadline: '',
    contact: '',
    number_of_opening: '',
  }

  const jobsData = useSelector(state => state.jobManager.jobs)
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)

  const [formData, setFormData] = useState(
    isEdit ? jobsData?.find(job => job.id === id) : initialValues
  )
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      required: true,
    },
    {
      id: 'contact',
      name: 'contact',
      label: 'Contact',
      type: 'text',
      tag: 'input',
      required: true,
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
    !isEdit && {
      id: 'package_per_annum',
      name: 'package_per_annum',
      label: 'Package Per Annum',
      type: 'text',
      tag: 'input',
      required: true,
    },
    {
      id: 'number_of_opening',
      name: 'number_of_opening',
      label: 'Number of Opening',
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
      name: 'description',
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
    !isEdit && {
      id: 'application_deadline',
      name: 'application_deadline',
      label: 'Application Deadline',
      type: 'date',
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

  const handleChange = e => {
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

  const handleAddJob = e => {
    e.preventDefault()
    const validationErrors = validateForm(formData, formConfig)

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        ...formData,
        datePosted: formData.datePosted
          ? formData.datePosted
          : new Date().toISOString(),
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
    }
  }

  if (isEdit && !formData) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <h1>No job found</h1>
      </div>
    )
  }

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
          <h1
            className={`text-3xl font-bold mb-6  text-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {isEdit ? 'Update Job' : 'Add Job'}
          </h1>
          <form onSubmit={handleAddJob} className="space-y-4 scrollbar-hide">
            {formConfig.map((field, index) => (
              <RenderField
                key={index}
                field={field}
                isEdit={isEdit}
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            ))}
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
