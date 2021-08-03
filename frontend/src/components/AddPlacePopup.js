import { useState, useCallback, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import Field from './Field'

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props
  const [formFieldsValues, setFormFieldsValues] = useState({ name: '', link: '' })
  const [formFieldsErrors, setFormFieldsErrors] = useState({ name: false, link: false })
  const [isFormValid, setIsFormValid] = useState(false)


  const handleInputChange = useCallback(
    input => {
      const { name, value } = input
      setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
      setFormFieldsErrors(prevState => ({ ...prevState, [name]: input.validity.valid }))
    },
    [setFormFieldsValues])


  useEffect(() => {
    setIsFormValid(!Object.values(formFieldsErrors)
      .some(i => i === false))
  },
    [formFieldsErrors])


  const handleSubmit = event =>
    onAddPlace(formFieldsValues)
      .then(result => {
        setFormFieldsValues({ name: '', link: '' })
        setIsFormValid(false)
        return Promise.resolve('Карточка добавлена')
      })


  return (
    <PopupWithForm name="add" isOpen={isOpen} caption="Новое место" buttonText="Сохранить" buttonLoadingText="Сохранение..." onClose={onClose} onSubmit={handleSubmit} submitButtomState={isFormValid}>
      <Field type="text" formType="popup" name="name" value={formFieldsValues.name} onChange={handleInputChange} required minLength="2" maxLength="30" placeholder="Название" />
      <Field type="url" formType="popup" name="link" value={formFieldsValues.link} onChange={handleInputChange} required placeholder="Ссылка на картинку" />
    </PopupWithForm>
  )
}

export default AddPlacePopup
