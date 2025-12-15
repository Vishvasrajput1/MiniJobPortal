export const validateForm = (data, formConfig) => {
  const newErrors = {}

  formConfig?.forEach(field => {
    if (field?.required && !data[field.name]) {
      newErrors[field.name] = `${
        field?.label.charAt(0).toUpperCase() + field.label.slice(1)
      } is required.`
    }
  })
  if (!data?.hobby || data?.hobby.length === 0) {
    newErrors.hobby = 'Hobby is required.'
  }
  if (!data?.certificates || data?.certificates.length === 0) {
    newErrors.certificates = 'Certificates is required.'
  }
  if (!data?.education || data?.education.length === 0) {
    newErrors.education = 'Education is required.'
  }

  if (
    data?.company_logo_url &&
    !/^(ftp|http|https):\/\/[^ "]+$/.test(data?.company_logo_url)
  ) {
    newErrors.company_logo_url = 'Please enter a valid URL.'
  }
  if (
    data?.rating &&
    (isNaN(Number(data?.rating)) ||
      Number(data?.rating) < 0 ||
      Number(data?.rating) > 5)
  ) {
    newErrors.rating = 'Rating must be between 0 and 5.'
  }
   if (data?.resume && data?.resume?.size > 1024 * 1024 * 2) {
     newErrors.resume = 'Resume size should be less than 2MB'
   }
   if (data?.coverLetter?.size > 1000000) {
     newErrors.coverLetter = 'Cover Letter size should be less than 1MB'
   }
   if (
     data?.resume &&
     data?.resume?.type.split('/')[1] !== 'pdf' &&
     data?.resume?.type.split('/')[0] !== 'image'
   ) {
     newErrors.resume = 'Resume should be in pdf or image format'
   }
   if (
     data?.coverLetter &&
     data?.coverLetter?.type?.split('/')[1] !== 'pdf' &&
     data?.coverLetter?.type?.split('/')[0] !== 'image'
   ) {
     newErrors.coverLetter = 'Cover Letter should be in pdf or image format'
   }

  return newErrors
}
