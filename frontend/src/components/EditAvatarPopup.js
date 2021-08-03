import { useState, useEffect, useCallback } from 'react'
import PopupWithForm from './PopupWithForm'
import Field from './Field'

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props

  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)


  useEffect(() => {
    setIsFormValid(error)
  }, [error])


  const handleInputChange = useCallback(
    input => {
      setValue(input.value)
      setError(input.validity.valid)
    },
    [setValue]
  )


  const handleSubmit = event =>
    onUpdateAvatar({ avatar: value })
      .then(result => {
        setValue('')
        setIsFormValid(false)
        return Promise.resolve('Аватар обновлен')
      })


  return (
    <PopupWithForm name="edit-avatar" isOpen={isOpen} caption="Обновить аватар" buttonText="Сохранить" buttonLoadingText="Сохранение..." onClose={onClose} onSubmit={handleSubmit} submitButtomState={isFormValid}>
      <Field onChange={handleInputChange} type="url" formType="popup" name="link" required placeholder="Ссылка на изображение с аватаром" value={value} />
    </PopupWithForm>
  )
}

export default EditAvatarPopup
