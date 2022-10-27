import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategories, updatePlate } from "../../controllers/categories";
import DeletePlatePopup from "../Popup/DeletePlatePopup";
import decode from "jwt-decode";

const initialState = {
    title: "",
    description: "",
    price: "",
};
const Plate = ({ user, setUser, plate, cat }) => {
    const dispatch = useDispatch();

    const [deletePlatePopup, setDeletePlatePopup] = useState(false);

    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const [deleteId, setDeleteId] = useState("");

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const token = user?.token;

        const logout = () => {
            dispatch({ type: "LOGOUT" });

            setUser(null);
        };

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem("user")));
    }, [edit]);

    function handleEdit(plate) {
        setEdit(true);
        setEditId(plate.plateId);
        setFormData({ ...formData, ...plate });
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    function handleSave(catId, plateId, e) {
        e.preventDefault();
        setEdit(false);
        setEditId("");
        const editData = {
            plateId: plateId,
            title: formData.title,
            description: formData.description,
            price: formData.price,
        };
        dispatch(updatePlate(catId, { ...editData }));
        dispatch(getCategories());
    }

    return (
        <ul>
            {cat.plates.map((plate) => (
                <li key={plate.plateId}>
                    <DeletePlatePopup
                        trigger={deletePlatePopup}
                        catId={cat.categorieId}
                        setDeletePlatePopup={setDeletePlatePopup}
                        plateId={plate.plateId}
                        deleteId={deleteId}
                    />
                    <div>
                        {plate.plateId !== editId ? (
                            <>
                                <h6>{plate.title}</h6>
                                <p>{plate.description}</p>
                                <span>{plate.price}$</span>
                            </>
                        ) : (
                            <>
                                <input
                                    className="inputEditPlateTitle"
                                    onChange={handleChange}
                                    value={formData.title}
                                    name="title"
                                ></input>
                                <input
                                    className="inputEditPlateDescription"
                                    onChange={handleChange}
                                    value={formData.description}
                                    name="description"
                                ></input>
                                <input
                                    className="inputEditPlatePrice"
                                    onChange={handleChange}
                                    value={formData.price}
                                    name="price"
                                ></input>
                            </>
                        )}

                        {user ? (
                            <div className="editDeleteButtons">
                                {!edit ? (
                                    <>
                                        <span onClick={() => handleEdit(plate)}>
                                            Editar
                                        </span>
                                        <span
                                            onClick={() => {
                                                setDeletePlatePopup(true);
                                                setDeleteId(plate.plateId);
                                            }}
                                        >
                                            Borrar
                                        </span>
                                    </>
                                ) : plate.plateId === editId ? (
                                    <>
                                        <span
                                            onClick={(e) =>
                                                handleSave(
                                                    cat.categorieId,
                                                    plate.plateId,
                                                    e
                                                )
                                            }
                                        >
                                            Guardar
                                        </span>
                                        <span
                                            onClick={() => {
                                                setEdit(!edit);
                                                setEditId("");
                                            }}
                                        >
                                            Cancelar
                                        </span>
                                    </>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Plate;
