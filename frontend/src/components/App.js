import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import '../App.css';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, {useEffect, useState} from "react";
import {api} from "../utils/api";
import * as auth from "../utils/auth";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePupup from "./AddPlacePupup";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import {AuthUserContext} from "../contexts/AuthUserContext";
import InfoTooltip from "./InfoTooltip";
import {authConfig} from "../utils/config";

function App() {

  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isInfoTooltipSuccess, setInfoTooltipSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('')

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setConfirmPopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard({})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;

    if (isOwn) {
      api.removeCard(card._id)
        .then(() =>
          setCards(cards.filter(item => item._id !== card._id)))
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleUpdateUser(userInfo) {
    api.updateUserInfo(userInfo)
      .then(response => {
        setCurrentUser({
          ...currentUser,
          name: response.name,
          about: response.about,
        });
        closeAllPopups();
      }).catch((e) => {
      console.error(e)
    });
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(response => {
        setCurrentUser({
          ...currentUser,
          avatar: response.avatar,
        });
        closeAllPopups();
      }).catch((e) => {
      console.error(e)
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card).then(response => {
      setCards([response, ...cards]);
      closeAllPopups()
    }).catch((e) => {
      console.error(e)
    });
  }

  function handleSignOut() {
    localStorage.removeItem(authConfig.tokenStorageName);
    setIsLoggedIn(false);
    navigate(authConfig.endpoints.login);
    setEmail('');
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem(authConfig.tokenStorageName, data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/", {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSuccess(false);
        setInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        navigate(authConfig.endpoints.login, {replace: true});
        setInfoTooltipSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSuccess(false);
      })
      .finally(() => setInfoTooltipOpen(true));
  }

  useEffect(() => {
    const token = localStorage.getItem(authConfig.tokenStorageName);
    if (!isLoggedIn && token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data.email) {
            setIsLoggedIn(true);
            setCurrentUser(data);
            setEmail(data.email);
            navigate("/", {replace: true});
          }
        })
        .catch(reportError);
    }
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(
          ([userData, cardsData]) => {
            setCurrentUser(userData);
            setCards(cardsData)
          }
        )
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn]);

  return (
    <AuthUserContext.Provider value={{isLoggedIn}}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <div className="App">
            <div className="page">
              <div className="page__container">
                <Header onLogout={handleSignOut} email={email}/>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute
                        element={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                    }
                  />
                  <Route
                    path={authConfig.endpoints.register}
                    element={<Register onRegister={handleRegister}/>}
                  />
                  <Route
                    path={authConfig.endpoints.login}
                    element={<Login onLogin={handleLogin}/>}
                  />
                </Routes>
                {isLoggedIn && <Footer/>}
              </div>

              <InfoTooltip isOpen={isInfoTooltipOpen}
                           isSuccess={isInfoTooltipSuccess}
                           onClose={closeAllPopups}/>

              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                onClose={closeAllPopups}
                                onUpdateUser={handleUpdateUser}/>

              <AddPlacePupup isOpen={isAddPlacePopupOpen}
                             onClose={closeAllPopups}
                             onAddCard={handleAddPlaceSubmit}/>

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                               onClose={closeAllPopups}
                               onUpdateAvatar={handleUpdateAvatar}/>

              <PopupWithForm title="Вы уверены?" name="confirm-delete"
                             isOpen={isConfirmPopupOpen}
                             onClose={closeAllPopups}
                             btnText="Да"/>

              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </div>
          </div>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </AuthUserContext.Provider>
  );
}

export default App;
