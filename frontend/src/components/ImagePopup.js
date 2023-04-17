function ImagePopup({card, onClose}) {
    return (
        <div className={`popup ${card.link ? 'popup_opened' : ''}`} id="full-image-popup">
            <div className="popup__container popup__container_size_full">
                <img src={card.link} alt="картинка места" className="popup__image"/>
                <p className="popup__bottom-label">{card.name}</p>
                <button className="popup__close hover-opacity hover-opacity_type_btn" type="button"
                        aria-label="закрыть" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;
