import {Link} from "react-router-dom";
import Sign from "./Sign";
import {authConfig} from "../utils/config";

function Register({onRegister}) {

    return (
        <>
            <Sign
                title="Регистрация"
                submitBtnText="Зарегистрироваться"
                onSubmit={onRegister}
            />
            <p className="register-info">
                Уже зарегистрированы? <Link to={authConfig.endpoints.login} className="register-info__link">Войти</Link>
            </p>
        </>
    );
}

export default Register;
