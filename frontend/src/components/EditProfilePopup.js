import { useState, useCallback, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'
import Field from './Field'

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props
  const currentUser = useContext(CurrentUserContext)

  const [formFieldsValues, setFormFieldsValues] = useState({ name: '', about: '' })
  const [formFieldsErrors, setFormFieldsErrors] = useState({ name: true, link: true })
  const [isFormValid, setIsFormValid] = useState(false)


  useEffect(() => {
    if (currentUser) setFormFieldsValues(currentUser)
  }, [currentUser, isOpen])


  useEffect(() => {
    if (Object.values(formFieldsErrors).some(i => i === false)) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [formFieldsErrors])


  const handleInputChange = useCallback(
    input => {
      const { name, value } = input
      setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
      setFormFieldsErrors(prevState => ({ ...prevState, [name]: input.validity.valid }))
    },
    [setFormFieldsValues]
  )


  const handleSubmit = event =>
    onUpdateUser(formFieldsValues)
      .then(result => Promise.resolve('Профиль обновлен'))


  return (
    <PopupWithForm name="edit-profile" isOpen={isOpen} caption="Редактировать профиль" buttonText="Сохранить" buttonLoadingText="Сохранение..." onClose={onClose} onSubmit={handleSubmit} submitButtomState={isFormValid}>
      <Field onChange={handleInputChange} type="text" formType="popup" name="name" required minLength="2" maxLength="40" placeholder="Имя" value={formFieldsValues.name} />
      <Field onChange={handleInputChange} type="text" formType="popup" name="about" required minLength="2" maxLength="200" placeholder="O себе" value={formFieldsValues.about} />
    </PopupWithForm>
  )
}


export default EditProfilePopup
