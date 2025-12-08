import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import jobsData, { candidatesData } from '../../data/createjobsdata'

const initialState = {
  jobs: jobsData,
  savedJobs: [],
  isLoading: false,
  error: null,
  candidates: candidatesData,
  appliedJobs: [],
  selectedCandidates: [],
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs = [{ ...action.payload, id: nanoid() }, ...state.jobs]
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload)
    },
    updateJob: (state, action) => {
      state.jobs = state.jobs.map(job => {
        if (job.id === action.payload.id) {
          return { ...job, ...action.payload }
        }
        return job
      })
    },
    saveJob: (state, action) => {
      if (state.savedJobs.find(job => job.id === action.payload.id)) return
      state.jobs = state.jobs.map(job => {
        if (job.id === action.payload.id) {
          return { ...job, isSaved: true }
        }
        return job
      })
      state.savedJobs.push(action.payload)
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload)
      state.jobs = state.jobs.map(job => {
        if (job.id === action.payload) {
          return { ...job, isSaved: false }
        }
        return job
      })
    },
    addCandidate: (state, action) => {
      state.candidates = [
        { ...action.payload, id: nanoid() },
        ...state.candidates,
      ]
      state.appliedJobs.push(action.payload.job_id)
    },
    selectCandidate: (state, action) => {
      state.selectedCandidates.push(action.payload)
      state.candidates = state.candidates.map(candidate => {
        if (candidate.id === action.payload.id) {
          return { ...candidate, isSelected: true }
        }
        return candidate
      })
    },
    removeCandidate: (state, action) => {
      state.selectedCandidates = state.selectedCandidates.filter(
        candidate => candidate.id !== action.payload
      )
      state.candidates = state.candidates.map(candidate => {
        if (candidate.id === action.payload) {
          return { ...candidate, isSelected: false, isRejected: true }
        }
        return candidate
      })
    },
  },
})

export const {
  addJob,
  removeJob,
  updateJob,
  saveJob,
  removeSavedJob,
  addCandidate,
  appliedJobs,
  selectCandidate,
  removeCandidate,
} = jobsSlice.actions
export default jobsSlice.reducer
