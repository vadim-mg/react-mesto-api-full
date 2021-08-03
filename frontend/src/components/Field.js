import { useState } from 'react'

function Field({ formType, onChange, ...props }) {
  const fieldClasses = {
    'field': formType + '__field',
    'input': formType + '__input',
    'error': formType + '__error',
    'errorActive': formType + '__error_active',
  }

  const [classError, setClassError] = useState(fieldClasses.error)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = event => {
    const input = event.target
    setErrorMessage(input.validationMessage)
    setClassError(fieldClasses.error + (!input.validity.valid ? ' ' + fieldClasses.errorActive : ''))
    onChange(input)
  }

  return (
    <label className={fieldClasses.field}>
      <input {...props} className={fieldClasses.input} onChange={handleChange} />
      <span className={classError}>{errorMessage}</span>
    </label>
  )
}

export default Field

