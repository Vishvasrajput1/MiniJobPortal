import { createSlice, nanoid } from '@reduxjs/toolkit'
import jobsData, { candidatesData } from '../../data/createjobsdata'

const initialState = {
  jobs: [],
  savedJobs: [],
  isLoading: false,
  selectedJobs: [],
  error: null,
  candidates: [],
  appliedJobs: [],
  selectedCandidates: [],
  isFiltersOpen: false,
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action) => {
      if (state.jobs.find(job => job.id === action.payload.id)) return
      state.jobs = [{ ...action.payload, id: nanoid() }, ...state.jobs]
    },
    addJobView: (state, action) => {
      if (state.jobs.find(job => job.id === action.payload.id)) return
      state.jobs.push(action.payload)
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload)
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload)
      state.appliedJobs = state.appliedJobs.filter(
        job => job.id !== action.payload
      )
    },
    addJobs: (state, action) => {
      state.jobs = [...action.payload]
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
      state.candidates.push({ ...action.payload, id: nanoid() })
      state.appliedJobs.push(
        state.jobs.find(job => job.id === action.payload.job_id)
      )
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
    toggleFilters: (state, action) => {
      state.isFiltersOpen = action.payload
    },
  },
})

export const {
  addJob,
  addJobView,
  removeJob,
  updateJob,
  saveJob,
  removeSavedJob,
  addCandidate,
  appliedJobs,
  selectCandidate,
  removeCandidate,
  addJobs,
  toggleFilters,
} = jobsSlice.actions
export default jobsSlice.reducer
