import './App.css'
import { Routes, Route } from 'react-router-dom'

import { Dashboard } from './components/Dashboard/Dashboard'
import { NotFound } from './components/NotFound/NotFound'
import { Layout } from './components/Layout'
import JobDetail from './components/JobDetail/JobDetail'
import { AddJob } from './components/AddJob/AddJob'
import { ApplyForm } from './components/Aplly/ApplyForm'
import { MyJobs } from './components/MyJobs'
import { ManageJobs } from './components/ManageJobs/ManageJobs'
import { Candidates } from './components/Candidates/Candidates'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/jobs/:id/edit" element={<AddJob />} />
          <Route path="/jobs/:id/manage-candidates" element={<Candidates />} />
          <Route path="/jobs/:id/apply" element={<ApplyForm />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
