import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from "../contexts/CardsContext";

function Main({
                  onAddPlace,
                  onCardClick,
                  onEditAvatar,
                  onEditProfile,
                  onCardLike,
                  onCardDelete,
              }) {
    const currentUser = useContext(CurrentUserContext);
    const cardsContext = useContext(CardsContext);

    return (
        <main className="page__content content">
            <section className="profile section">
                <div className="profile__info">
                    <div className="profile__avatar-container" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="аватарка"
                             className="profile__avatar"/>
                    </div>
                    <div className="profile__description">
                        <div className="profile__name-row">
                            <h1 className="profile__name ellipsis-overflow">{currentUser.name}</h1>
                            <button className="profile__edit-button hover-opacity hover-opacity_type_btn"
                                    aria-label="редактирования профиля"
                                    type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__profession ellipsis-overflow">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button hover-opacity hover-opacity_type_btn"
                        aria-label="добавление карточки" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="places section">
                <ul className="places__list">
                    {cardsContext.map((card, _) => {
                        return (<Card card={card}
                                      key={card._id}
                                      onCardClick={onCardClick}
                                      onCardLike={onCardLike}
                                      onCardDelete={onCardDelete}/>)
                    })}
                </ul>
            </section>

        </main>
    );
}

export default Main;
