import { useParams } from 'react-router-dom'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import CandidateCard from '../common/CandidateCard'
import { FilterSidebar } from '../common/FilterSidebar'

export const Candidates = () => {
  const allCandidates = useSelector(state => state.jobManager.candidates)
  const isDarkMode = useSelector(state => state.jobManager.isDarkMode)
  const { id } = useParams()
  const [filteredCandidates, setFilteredCandidates] = useState(
    allCandidates.filter(
      candidate => candidate.job_id === id && !candidate.isRejected
    )
  )

  return (
    <>
      <div className={`flex overflow-hidden max-h-[calc(100vh-72px)] ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100'}`}>
        <FilterSidebar
          initialData={allCandidates}
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
