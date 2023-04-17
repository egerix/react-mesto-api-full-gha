import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="change-avatar"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       btnText="Сохранить">
            <label className="popup__field">
                <input className="popup__input" name="avatar-link" placeholder="Ссылка на картинку"
                       id="avatar-link"
                       type="url"
                       ref={avatarRef}
                       required/>
                <span id="avatar-link-error" className="popup__input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
