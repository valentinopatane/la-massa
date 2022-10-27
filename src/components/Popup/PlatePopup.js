import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlate, getCategories } from "../../controllers/categories";

const Popup = (props) => {
    const initialState = {
        title: "",
        description: "",
        price: "",
    };
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    function handleCreation(e) {
        e.preventDefault();
        dispatch(createPlate(props.catId, { ...formData }));
        props.setPopup(false);
        dispatch(getCategories());
    }
    return props.trigger && props.addId === props.catId ? (
        <div className="popup">
            <div className="popupInner">
                <h5>Crear Opción: </h5>

                <form>
                    <input
                        name="title"
                        placeholder="Nombre del plato"
                        onChange={handleChange}
                    />
                    <input
                        name="description"
                        placeholder="Descripción"
                        onChange={handleChange}
                    />
                    <input
                        name="price"
                        placeholder="Precio"
                        onChange={handleChange}
                    />
                    <button onClick={handleCreation}>Crear</button>
                </form>
                <div>
                    <button
                        className="popupClose"
                        onClick={() => props.setPopup(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default Popup;
