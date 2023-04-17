import {useState} from "react";

function Sign({title, submitBtnText, onSubmit}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formValue.email, formValue.password);
    }

    return (
        <div className="sign">
            <h2 className="sign__title">{title}</h2>
            <form className="sign__form" onSubmit={handleSubmit}>
                <input
                    className="sign__input"
                    value={formValue.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    required
                />
                <input
                    className="sign__input"
                    value={formValue.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    id="password"
                    required
                />
                <button className="sign__submit-button" type="submit">
                    {submitBtnText}
                </button>
            </form>
        </div>
    );
}

export default Sign;
