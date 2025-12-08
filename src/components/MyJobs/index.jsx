import React, { useState } from 'react'
import Toggle from '../common/Toggle'
import { SavedJobs } from './SavedJobs'
import { AppliedJobs } from './AppliedJobs'

export const MyJobs = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabs = [{ title: 'Saved Jobs' }, { title: 'Applied Jobs' }]
  const activeTab = tabs[activeIndex]
  console.log(activeTab, 'activeTab', activeIndex, 'activeIndex')

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 max-h-[calc(100vh-72px)] h-[calc(100vh-76px)] p-4">
      <Toggle
        options={tabs}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />
      {activeTab.title === 'Saved Jobs' && <SavedJobs />}
      {activeTab.title === 'Applied Jobs' && <AppliedJobs />}
      {/* {activeTab === 'Interviews' && <Interviews />} */}
      {/* {activeTab === 'Rejected Jobs' && <RejectedJobs />} */}
    </div>
  )
}
