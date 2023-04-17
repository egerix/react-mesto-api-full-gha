import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePupup({isOpen, onClose, onAddCard}) {

    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    const handlePlaceNameChange = function (e) {
        setPlaceName(e.target.value);
    }

    const handlePlaceLinkChange = function (e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddCard({
            name: placeName,
            link: placeLink,
        });
    }

    return (
        <PopupWithForm title="Новое место" name="add-place"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       btnText="Создать">
            <label className="popup__field">
                <input className="popup__input" name="place-name" placeholder="Название"
                       id="place-name"
                       minLength="2"
                       maxLength="30"
                       onChange={handlePlaceNameChange}
                       value={placeName || ''}
                       required/>
                <span id="place-name-error" className="popup__input-error"/>
            </label>
            <label className="popup__field">
                <input className="popup__input" name="place-link" placeholder="Ссылка на картинку"
                       id="place-link"
                       type="url"
                       onChange={handlePlaceLinkChange}
                       value={placeLink || ''}
                       required/>
                <span id="place-link-error" className="popup__input-error"/>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePupup;
