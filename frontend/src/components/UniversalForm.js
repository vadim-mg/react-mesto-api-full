import { useState, useEffect } from "react"

function UniversalForm(props) {
  const { formFooterText, name, onSubmit, onClose, caption, children, submitButtomState, buttonLoadingText, buttonText, formType } = props

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    // меняем состояние до размонтирования компонента, чтоб избежать ошибки: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
    return () => {
      setLoading(false)
    }
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    onSubmit(event)
      .then(result => {
        if (typeof result === "function") result()
      })
      .catch(err => console.log(err))
      .finally(result => {
        setLoading(false)
      })
  }

  // классы формы зависят от типа formType, который может быть popup или form
  const formClasses = {
    'form': formType + '__container',
    'fieldset': formType + '__fields',
    'legend': formType + '__caption',
    'closeBtn': formType + '__close-button',
    'submintBtn': formType + '__button',
  }

  return (
    <form
      name={name}
      className={formClasses.form}
      autoComplete="off" noValidate
      onSubmit={handleSubmit}>
      {onClose && <button className={formClasses.closeBtn} type="button" aria-label="close_popup" onClick={onClose}></button>}
      <fieldset className={formClasses.fieldset}>
        {caption && <legend className={formClasses.legend}>{caption}</legend>}
        {children}
        {onSubmit && <button type="submit" disabled={!submitButtomState || loading}
          className={formClasses.submintBtn + (submitButtomState ? "" : ' ' + formClasses.submintBtn + '_disabled')}>
          {loading ? buttonLoadingText : buttonText}
        </button>}
        {formFooterText}
      </fieldset>
    </form>
  )
}

export default UniversalForm
