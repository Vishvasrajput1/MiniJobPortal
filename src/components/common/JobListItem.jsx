import { AiFillStar } from 'react-icons/ai'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const JobListItem = ({ jobDetails }) => {
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
    <div className="bg-white border border-gray-200 rounded-md cursor-pointer">
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
              <h1 className="m-0 text-gray-900 font-roboto text-lg font-bold mb-1.5">
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
            <p className="text-gray-500 font-light text-base font-roboto">
              {location}
            </p>
          </div>
          <div className="flex item-center gap-1">
            <p className="flex items-center">
              <BsFillBriefcaseFill />
            </p>
            <p className="m-0 text-gray-500 font-light text-base font-roboto">
              {employmentType}
            </p>
          </div>
          <p className="m-0 text-gray-500 font-light text-base font-roboto ml-auto">
            {packagePerAnnum ? packagePerAnnum : `${salaryFrom}-${salaryTo}`}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default JobListItem
