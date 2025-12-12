import axios from 'axios'
import {
  certificateOptions,
  educationOptions,
  experienceOptions,
  hobbyOptions,
  maritalStatusOptions,
  skillOptions,
} from '../options'
import { nanoid } from 'nanoid'

const randomAvtar = () => {
  const avatars = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'

  return avatars + [Math.floor(Math.random() * avatars.length)]
}

function getRandomSubarray(arr) {
  const start = Math.floor(Math.random() * arr.length)
  const end = Math.floor(Math.random() * (arr.length - start) + start + 1)
  return arr.slice(start, end)
}

const randomWord = () => {
  return Math.random().toString(36).slice(2)
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

const intitialJobData = await fetchData()

const arrangeData = data => {
  return data.map(job => {
    return {
      ...job,
      company_logo_url: `https://picsum.photos/200/300?random=${
        Math.random() * 10
      }`,
      rating: Math.floor(Math.random() * 5) + 1,
      job_description: job.job_description || randomWord(),
      hobby: getRandomSubarray(hobbyOptions),
      certificates: getRandomSubarray(certificateOptions),
      education: getRandomSubarray(educationOptions),
      experience:
        experienceOptions[Math.floor(Math.random() * experienceOptions.length)],
      isSaved: false,
      apply_link: '',
      skills: getRandomSubarray(skillOptions),
    }
  })
}
const generateJob = async () => {
  return Array.from({ length: 10 }, () => {
    return {
      id: nanoid(),
      title:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .title,
      company:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .company || randomWord(),
      location:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .location,
      job_description:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .job_description,
      employment_type:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .employment_type,
      hobby: getRandomSubarray(hobbyOptions),
      certificates: getRandomSubarray(certificateOptions),
      education: getRandomSubarray(educationOptions),
      experience:
        experienceOptions[Math.floor(Math.random() * experienceOptions.length)],
      isSaved: false,
      apply_link: '',
      skills: getRandomSubarray(skillOptions),
      company_logo_url:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .company_logo_url,
      datePosted:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .datePosted,
      rating:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .rating,
      package_per_annum:
        intitialJobData[Math.floor(Math.random() * intitialJobData.length)]
          .package_per_annum,
    }
  })
}

jobsData = await generateJob()

const generateCandidates = async () => {
  return Array.from({ length: 60 }, () => {
    return {
      id: nanoid(),
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
      isSelected: false,
      isRejected: false,
      hobby: getRandomSubarray(hobbyOptions),
      certificates: getRandomSubarray(certificateOptions),
      education: getRandomSubarray(educationOptions),
      experience:
        experienceOptions[Math.floor(Math.random() * experienceOptions.length)],
      skills: getRandomSubarray(skillOptions),
    }
  })
}

candidatesData = await generateCandidates()
export { generateJob, generateCandidates, arrangeData }
export default jobsData
export { candidatesData }
