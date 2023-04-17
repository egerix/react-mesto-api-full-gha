import Sign from "./Sign";

function Login({onLogin}) {

    return (
        <>
            <Sign
                title="Вход"
                submitBtnText="Войти"
                onSubmit={onLogin}
            />
        </>
    );
}

export default Login;
