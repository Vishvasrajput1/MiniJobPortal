import { BiEdit } from 'react-icons/bi'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FcBusinessman } from 'react-icons/fc'
import { IoEye } from 'react-icons/io5'
import { LuSquareArrowOutUpRight } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeJob } from '../../feature/jobs/jobsSlice'
import { DeletePopUp } from '../common/DeletePopUp'
import { useEffect, useState } from 'react'

export const ManageJobs = () => {
  const jobsData = useSelector(state => state.jobManager.jobs)
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const [deleteModal, setDeleteModal] = useState({
    showDeleteModal: false,
    jobId: null,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isRemove = true
  const handleRemoveJob = () => {
    dispatch(removeJob(deleteModal.jobId))
    setDeleteModal({
      showDeleteModal: false,
      jobId: null,
    })
  }
  const handleCloseDeleteModal = () => {
    setDeleteModal({
      showDeleteModal: false,
      jobId: null,
    })
  }
  useEffect(() => {
    if (jobsData.length === 0) {
      navigate('/')
    }
  }, [jobsData, navigate])

  return (
    <>
      {deleteModal.showDeleteModal && (
        <DeletePopUp
          showDeletePopUp={deleteModal.showDeleteModal}
          setShowDeletePopUp={handleCloseDeleteModal}
          handleDelete={() => {
            handleRemoveJob()
          }}
          isDarkMode={isDarkMode}
        />
      )}
      <div
        className={`${
          isDarkMode ? 'bg-black text-white' : 'bg-gray-100'
        } max-h-[calc(100vh-72px)] relative p-4  w-full overflow-hidden h-[calc(100vh-76px)] space-y-4 hide-scrollbar`}
      >
        <div className="text-lg font-semibold text-center">ManageJobs</div>
        {jobsData.length === 0 ? (
          <div
            className={`p-8 text-center h-[calc(100vh-72px)] my-auto text-lg ${
              isDarkMode ? 'bg-black text-white' : 'bg-gray-100'
            }`}
          >
            No jobs
          </div>
        ) : (
          <div
            className={`${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'
            } overflow-x-auto max-h-[calc(100vh-128px)]  hide-scrollbar `}
          >
            <table
              className={`table w-full overflow-x-auto border ${
                isDarkMode ? 'border-gray-600' : 'border-gray-200'
              }`}
            >
              <thead
                className={`${
                  isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-600'
                } sticky top-0 `}
              >
                <tr>
                  <th className="text-center p-3">No</th>
                  <th className="text-center p-3">Title</th>
                  <th className="text-center p-3">Company</th>
                  <th className="text-center p-3">Location</th>
                  <th className="text-center p-3">Candidates</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? 'divide-gray-600' : 'divide-gray-200'
                }`}
              >
                {jobsData.map((job, index) => (
                  <tr key={job.id}>
                    <td className="text-center p-3">{index + 1}</td>
                    <td className="text-center p-3">{job.title}</td>
                    <td className="text-center p-3">{job.company}</td>
                    <td className="text-center p-3">{job.location}</td>
                    <td className="text-center p-3">
                      <Link
                        to={`/jobs/${job.id}/manage-candidates`}
                        className="flex items-center justify-center gap-2"
                      >
                        <FcBusinessman size={20} />
                        <LuSquareArrowOutUpRight
                          size={20}
                          className="text-indigo-400 hover:text-indigo-500"
                        />
                      </Link>
                    </td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="text-indigo-400 cursor-pointer border-none outline-none  rounded-md hover:text-indigo-500"
                          type="button"
                          onClick={() => {
                            navigate(`/jobs/${job.id}`, {
                              state: isRemove,
                            })
                          }}
                        >
                          <IoEye size={20} />
                        </button>
                        <button
                          className="text-indigo-400 cursor-pointer border-none outline-none  rounded-md hover:text-indigo-500"
                          type="button"
                          onClick={() => {
                            navigate(`/jobs/${job.id}/edit`)
                          }}
                        >
                          <BiEdit size={20} />
                        </button>
                        <button
                          className="text-red-400  cursor-pointer border-none outline-none  rounded-md hover:text-red-500"
                          type="button"
                          onClick={() => {
                            setDeleteModal({
                              showDeleteModal: true,
                              jobId: job.id,
                            })
                          }}
                        >
                          <FaRegTrashCan sizer={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
