import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AddJob } from './AddJob'

export const AddEditJob = () => {
  const loc = useLocation()
  const { id } = useParams()
  const isEdit = loc.pathname.includes('edit')
  return <AddJob key={id} isEdit={isEdit} jobId={id} />
}
