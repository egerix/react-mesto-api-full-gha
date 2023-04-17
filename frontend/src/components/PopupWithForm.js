import React from "react";

function PopupWithForm({name, btnText, isOpen, title, onClose, children, onSubmit}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <div className="popup__fields-container">
                        {children}
                        <button
                            className="popup__submit hover-opacity hover-opacity_type_btn"
                            type="submit" aria-label={btnText}>
                            {btnText}
                        </button>
                    </div>
                </form>
                <button className="popup__close hover-opacity hover-opacity_type_btn" type="button"
                        aria-label="закрыть" onClick={onClose}/>
            </div>
        </div>
    );
}

export default PopupWithForm;
