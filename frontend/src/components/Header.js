import logo from '../images/logo.svg';
import {Link, Route, Routes} from "react-router-dom";
import React from "react";
import {AuthUserContext} from "../contexts/AuthUserContext";
import {authConfig} from "../utils/config";

function Header({onLogout, email}) {
    const {isLoggedIn} = React.useContext(AuthUserContext);

    return (
        <header className="page__header header section">
            <img className="header__logo" src={logo} alt="лого"/>
            <div className="header__container">
                {isLoggedIn && <p className="header__email">{email}</p>}
                <Routes>
                    <Route path="/"
                           element={<button className="header__logout" type="button" onClick={onLogout}>Выйти</button>}
                    />
                    <Route path={authConfig.endpoints.register}
                           element={<Link className="header__link" to={authConfig.endpoints.login}>Войти </Link>}
                    />
                    <Route path={authConfig.endpoints.login}
                           element={<Link className="header__link" to={authConfig.endpoints.register}>Регистрация </Link>}
                    />
                </Routes>
            </div>
        </header>
    );
}

export default Header;
