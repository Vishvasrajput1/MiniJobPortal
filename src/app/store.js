import { configureStore } from '@reduxjs/toolkit'

import jobsReducer from '../feature/jobs/jobsSlice'
// import savedJobsReducer from '../feature/savedJobs/savedJobsSlice'

export const store = configureStore({
  reducer: {
    jobManager: jobsReducer,
    // savedJobs: savedJobsReducer,
  },
})

export default store
