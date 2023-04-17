import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(item => item === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick(){
        onCardDelete(card)
    }

    return (
        <li className="places__place place">
            {isOwn && <button className="place__delete-button hover-opacity hover-opacity_type_icon"
                             onClick={handleDeleteClick}
                             type="button"/>}
            <img src={card.link} alt="фотография места"
                 className="place__photo hover-opacity hover-opacity_type_icon"
                 onClick={handleClick}/>
            <div className="place__description ellipsis-overflow">
                <h2 className="place__name ellipsis-overflow">{card.name}</h2>
                <div className="place__like-container">
                    <button
                        className={`place__like-button like-button hover-opacity hover-opacity_type_icon ${isLiked && 'like-button__state_liked'}`}
                        onClick={handleLikeClick}
                        type="button"></button>
                    <span className="place__like-counter">{card.likes.length}</span>
                </div>

            </div>
        </li>
    )
}

export default Card
