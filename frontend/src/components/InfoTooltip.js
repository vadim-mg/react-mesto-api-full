import React from 'react'

function InfoTooltip({ iconClass, text, onClose }) {
  return (
    <div className="popup__container" >
      <button className="popup__close-button popup__close-button_center" type="button" aria-label="close_popup" onClick={onClose}></button>
      <div className="popup__fields">
        <div className={`popup__tooltip-image ${iconClass}`} ></div>
        <p className="popup__tooltip-text">{text}</p>
      </div>
    </div>
  )
}


export default InfoTooltip
