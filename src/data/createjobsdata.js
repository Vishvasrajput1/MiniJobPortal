import axios from 'axios'
import {
  certificateOptions,
  educationOptions,
  experienceOptions,
  hobbyOptions,
  maritalStatusOptions,
} from '../options'

const randomAvtar = () => {
  const avatars = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'

  return avatars + [Math.floor(Math.random() * avatars.length)]
}

function getRandomSubarray(arr) {
  const start = Math.floor(Math.random() * arr.length)
  const end = Math.floor(Math.random() * (arr.length - start) + start + 1)
  return arr.slice(start, end)
}
let jobsData = []
let candidatesData = []
const options = {
  method: 'GET',
  url: 'https://apis.ccbp.in/jobs',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${String(import.meta.env.VITE_APP_API_KEY)}`,
  },
}
const fetchData = async () => {
  try {
    const { data } = await axios.request(options)
    return data.jobs
  } catch (error) {
    console.error(error)
  }
}

jobsData = await fetchData()
jobsData = jobsData.map(job => {
  return {
    ...job,
    hobby: getRandomSubarray(hobbyOptions),
    certificates: getRandomSubarray(certificateOptions),
    education: getRandomSubarray(educationOptions),
    experience:
      experienceOptions[Math.floor(Math.random() * experienceOptions.length)],
    isSaved: false,
    apply_link: '',
  }
})

const randomWord = () => {
  return Math.random().toString(36).slice(2)
}

const generateCandidates = async () => {
  return Array.from({ length: 60 }, () => {
    return {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: randomWord(),
      profile_pic: randomAvtar(),
      email: `${randomWord()}@gmail.com`,
      phone: `+91${Math.floor(Math.random() * 1000000000)}`,
      resume: {
        name: randomWord(),
        url: randomAvtar(),
      },
      coverLetter: {
        name: randomWord(),
        url: randomAvtar(),
      },
      previous_company: randomWord(),
      position: 'Software Engineer',
      maritial_status:
        maritalStatusOptions[
          Math.floor(Math.random() * maritalStatusOptions.length)
        ],
      address: randomWord(),
      job_id: jobsData[Math.floor(Math.random() * jobsData.length)].id,
      isSelected: Math.random() > 0.5,
      isRejected: false,
      hobby: getRandomSubarray(hobbyOptions),
      certificates: getRandomSubarray(certificateOptions),
      education: getRandomSubarray(educationOptions),
      experience:
        experienceOptions[Math.floor(Math.random() * experienceOptions.length)],
    }
  })
}

candidatesData = await generateCandidates()

export default jobsData
export { candidatesData }
