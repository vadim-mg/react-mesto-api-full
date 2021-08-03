import Popup from "./Popup"
import UniversalForm from "./UniversalForm"

function PopupWithForm({isOpen, name, children, ...props}) {
  return (
    <Popup name={name} isOpen={isOpen} >
      <UniversalForm formType="popup" {...props}>
        {children}
      </UniversalForm >
    </Popup>
  )
}

export default PopupWithForm
