import React from "react";
import {Navigate} from "react-router-dom";
import {AuthUserContext} from "../contexts/AuthUserContext";
import {authConfig} from "../utils/config";

function ProtectedRoute({element: Component, ...props}) {
    const {isLoggedIn} = React.useContext(AuthUserContext);
    return isLoggedIn ? (
        <Component {...props} />
    ) : (
        <Navigate to={authConfig.endpoints.login} replace/>
    );
}

export default ProtectedRoute;
