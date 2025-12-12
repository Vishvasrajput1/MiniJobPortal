import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFilters } from '../feature/jobs/jobsSlice'
import { keyForSearch } from '../options'

function useFilterData(
  allData,
  initialData,
  filters,
  setFilteredData,
  setLength,
  search = ''
) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // const isFiltersOpen = useSelector(state => state.jobManager.isFiltersOpen)
  const handleSearch = (filtered, search) => {
    const filteredSearch = filtered.filter(job =>
      Object.entries(job).some(([key, value]) => {
        if (keyForSearch.includes(key)) {
          return value?.toLowerCase().includes(search.toLowerCase())
        }
      })
    )
    return filteredSearch
  }
  const dispatch = useDispatch()
  useEffect(() => {
    let filtered = allData || initialData

    if (search?.trim()) {
      filtered = handleSearch(filtered, search)
    }
    if (filters.experience) {
      filtered = filtered.filter(job => job.experience === filters.experience)
    }
    if (filters.education.length > 0) {
      filtered = filtered.filter(job =>
        filters.education.every(edu => job.education.includes(edu))
      )
    }
    if (filters.hobbies.length > 0) {
      filtered = filtered.filter(job =>
        filters.hobbies.every(hobby => job.hobby.includes(hobby))
      )
    }
    if (filters.certificates.length > 0) {
      filtered = filtered.filter(job =>
        filters.certificates.every(cert => job.certificates.includes(cert))
      )
    }
    if (
      search.trim() ||
      filters.experience ||
      filters.education.length > 0 ||
      filters.hobbies.length > 0 ||
      filters.certificates.length > 0
    ) {
      setIsFiltersOpen(true)
      if (!isFiltersOpen) {
        dispatch(toggleFilters(true))
      }

      setFilteredData(filtered)
    }
    if (
      !(
        search.trim() ||
        filters.experience ||
        filters.education.length > 0 ||
        filters.hobbies.length > 0 ||
        filters.certificates.length > 0
      ) &&
      isFiltersOpen &&
      initialData
    ) {
      setIsFiltersOpen(false)
      setFilteredData(initialData)
      dispatch(toggleFilters(false))
    }

    setLength(filtered.length)
  }, [filters, search, setFilteredData, setLength])
}

export default useFilterData
