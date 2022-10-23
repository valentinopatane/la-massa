import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import massa from "../../imgs/massa.png";
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    function handleSesion() {
        dispatch({ type: "LOGOUT" });
        setUser(null);
    }
    return (
        <main className="homeMain">
            <img src={massa} alt="logo-massa"></img>

            <div>
                {user ? (
                    <button onClick={handleSesion}>Cerrar Sesión</button>
                ) : (
                    <button onClick={() => navigate("/login")}>
                        Iniciar Sesión
                    </button>
                )}

                <button onClick={() => navigate("/menu")}>Menú</button>
            </div>
        </main>
    );
};

export default Home;
