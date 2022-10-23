import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import massa from "../../imgs/massa.png";
import { login } from "../../controllers/auth";
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [loginError, setLoginError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const logData = {
            email: formData.email,
            password: formData.password,
        };

        dispatch(login(logData, navigate, setLoginError));
    };

    return (
        <main className="homeMain">
            <img src={massa} alt="massa-logo"></img>
            <form>
                <input
                    placeholder="Usuario"
                    onChange={handleChange}
                    type="email"
                    name="email"
                />
                <input
                    placeholder="Contraseña"
                    onChange={handleChange}
                    type="password"
                    name="password"
                />
                <button onClick={handleSubmit}>Entrar</button>
            </form>
            {loginError ? (
                <span className="errorLogin">
                    Usuario o contraseña incorrectos. Vuelve a intentarlo
                </span>
            ) : null}
        </main>
    );
};

export default Auth;
