import { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import UniversalForm from "./UniversalForm"
import Field from "./Field"

function Register({ onSignUp }) {

  const [formFieldsValues, setFormFieldsValues] = useState({ email: '', password: '' })
  const [formFieldsErrors, setFormFieldsErrors] = useState({ email: false, password: false })
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(
    () => setIsFormValid(!Object.values(formFieldsErrors).some(i => i === false)),
    [formFieldsErrors]
  )


  const handleInputChange = useCallback(
    input => {
      const { name, value } = input
      setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
      setFormFieldsErrors(prevState => ({ ...prevState, [name]: input.validity.valid }))
    },
    [setFormFieldsValues]
  )


  const handleSubmit = e => onSignUp(formFieldsValues)
    .then(val => Promise.resolve(val))


  const formFooterText = (
    <p className="form__text">Уже зарегистрированы?&nbsp;
      <Link to="/sign-in" className="form__link" target="_self">Войти</Link>
    </p>
  )


  return (
    <UniversalForm caption="Регистрация" name="Register" buttonText="Регистрация" buttonLoadingText="Регистрация..." onSubmit={handleSubmit} submitButtomState={isFormValid} formType="form" isRegistration="true" formFooterText={formFooterText}>
      <Field onChange={handleInputChange} type="email" className="form__input" formType="form" name="email" required placeholder="Email" value={formFieldsValues.email} />
      <Field onChange={handleInputChange} type="password" className="form__input" formType="form" name="password" required minLength="8" maxLength="20" placeholder="Пароль" value={formFieldsValues.about} />
    </UniversalForm>
  )
}

export default Register
