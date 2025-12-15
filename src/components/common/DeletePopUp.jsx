import React from 'react'

export const DeletePopUp = ({
  showDeletePopUp,
  setShowDeletePopUp,
  handleDelete,
  isDarkMode,
}) => {
  return (
    <div className="flex inset-0 items-center justify-center ">
      {showDeletePopUp && (
        <div className={`absolute inset-0 backdrop-brightness-50 shadow-lg flex items-center justify-center z-50`}>
          <div className=""></div>
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-4 rounded-md shadow-md`}>
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Are you sure you want to delete this job?
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={setShowDeletePopUp}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
