import React from "react";


function InfoTooltip({isOpen, onClose, isSuccess}) {
    return (
        <div className={`popup ${isOpen ? `popup_opened` : ''}`}>
            <div className="popup__container popup__container_type_sign-up">
                <button className="popup__close hover-opacity hover-opacity_type_btn" type="button"
                        aria-label="закрыть" onClick={onClose}></button>
                <div className={`popup__logo popup__logo_type_${isSuccess ? 'success' : 'failure'}`}/>
                <h2 className="popup__title popup__title_type_info">{
                    isSuccess
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте еще раз."}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;
