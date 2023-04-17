import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    return (
        <PopupWithForm title="Редактировать профиль" name="person-popup"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       btnText="Сохранить">
            <label className="popup__field">
                <input className="popup__input" name="username" placeholder="Имя" id="username"
                       minLength="2"
                       maxLength="40"
                       value={name || ''}
                       onChange={handleNameChange}
                       required/>
                <span id="username-error" className="popup__input-error"/>
            </label>
            <label className="popup__field">
                <input className="popup__input" name="profession" placeholder="О себе"
                       id="profession"
                       minLength="2" maxLength="200"
                       value={description || ''}
                       onChange={handleDescriptionChange}
                       required/>
                <span id="profession-error" className="popup__input-error"/>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
