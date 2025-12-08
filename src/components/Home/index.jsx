import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex-1 bg-cover p-5">
      <div className="max-w-xl">
        <h1 className="text-3xl font-roboto">
          Find The Job That Fits Your Life
        </h1>
        <p className="my-5 text-base font-roboto">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            className="px-5 py-2 bg-indigo-400 text-white cursor-pointer border-none outline-none mt-3 rounded-md hover:bg-indigo-500"
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
