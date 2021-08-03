import { useState, useCallback, useEffect } from "react"
import UniversalForm from "./UniversalForm"
import Field from "./Field"

function Login({ onSignIn }) {

  const [formFieldsValues, setFormFieldsValues] = useState({ email: '', password: '' })
  const [formFieldsErrors, setFormFieldsErrors] = useState({ email: false, password: false })
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(
    () => setIsFormValid(!Object.values(formFieldsErrors).some(i => i === false))
    , [formFieldsErrors]
  )

  const handleInputChange = useCallback(
    input => {
      const { name, value } = input
      setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
      setFormFieldsErrors(prevState => ({ ...prevState, [name]: input.validity.valid }))
    },
    [setFormFieldsValues]
  )

  const handleSubmit = e => onSignIn(formFieldsValues)
    .then(val => Promise.resolve(val))

  return (
    <UniversalForm caption="Вход" name="login" buttonText="Войти" buttonLoadingText="Автроизация..." onSubmit={handleSubmit} submitButtomState={isFormValid} formType="form">
      <Field onChange={handleInputChange} className="form__input" formType="form" name="email" required placeholder="Email" value={formFieldsValues.email} />
      <Field onChange={handleInputChange} type="password" className="form__input" formType="form" name="password" required placeholder="Пароль" value={formFieldsValues.about} />
    </UniversalForm>
  )
}

export default Login
