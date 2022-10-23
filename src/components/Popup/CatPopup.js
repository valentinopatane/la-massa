import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../controllers/categories";

const Popup = (props) => {
    const initialState = {
        name: "",
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
        dispatch(createCategory(formData));
    }

    return props.trigger ? (
        <div className="popup">
            <div className="popupInner">
                <h5>Crear Categoría: </h5>
                <form>
                    <input
                        name="name"
                        placeholder="Nombre de la categoría"
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
