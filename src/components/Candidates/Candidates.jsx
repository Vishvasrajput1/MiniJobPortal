import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { candidatesData } from '../../data/createjobsdata'
import CandidateCard from '../common/CandidateCard'
import { FilterSidebar } from '../common/FilterSidebar'

export const Candidates = () => {
  const allCandidates = useSelector(state => state.jobManager.candidates)
  const { id } = useParams()
  const [candidates, setCandidates] = useState(allCandidates)
  const [filteredCandidates, setFilteredCandidates] = useState([])

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidatesData = await allCandidates.filter(
        candidate => candidate.job_id === id && !candidate.isRejected
      )
      setCandidates(candidatesData)
      setFilteredCandidates(candidatesData)
    }

    fetchCandidates()
  }, [id, allCandidates])

  return (
    <>
      <div className="flex overflow-hidden max-h-[calc(100vh-72px)] bg-gray-100">
        <FilterSidebar
          initialData={candidates}
          setFilteredData={setFilteredCandidates}
          title="Candidates"
        />
        <div className="flex-1 p-4 overflow-y-auto hide-scrollbar space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidateDetails={candidate} />
            ))
          ) : (
            <div className="text-center p-4">No candidates found</div>
          )}
        </div>
      </div>{' '}
    </>
  )
}
