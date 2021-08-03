function Popup({ name, isOpen, children, ...props }) {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      {children}
    </div>
  )
}

export default Popup
