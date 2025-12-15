import { AiFillStar } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const JobListItem = ({ jobDetails }) => {
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    location,
    job_category: jobCategory,
    package_per_annum: packagePerAnnum,
    rating,
    company,
    title,
    salary_from: salaryFrom,
    salary_to: salaryTo,
    id,
  } = jobDetails

  return (
    <div
      className={` border ${
        isDarkMode
          ? 'bg-gray-800 border-gray-600 text-white'
          : 'bg-white border-gray-200'
      } rounded-md cursor-pointer`}
    >
      <Link
        to={`/jobs/${id}`}
        className="text-decoration-none flex flex-col gap-4 p-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="size-18 object-cover rounded-2xl"
            />
            <div className="title-rating-container-card">
              <h1
                className={`m-0 font-roboto text-lg font-bold mb-1.5 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
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
          <p>{company}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex item-center gap-1">
            <p className="flex items-center">
              <IoLocationSharp />
            </p>
            <p
              className={`font-light text-base font-roboto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {location}
            </p>
          </div>
          <div className="flex item-center gap-1">
            <p className="flex items-center">
              <BsFillBriefcaseFill />
            </p>
            <p
              className={`font-light text-base font-roboto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {employmentType}
            </p>
          </div>
          <p
            className={`font-light text-base font-roboto m-0 ml-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {packagePerAnnum ? packagePerAnnum : `${salaryFrom}-${salaryTo}`}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default JobListItem
