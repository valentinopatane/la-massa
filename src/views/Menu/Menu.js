import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, updatePlate } from "../../controllers/categories";

import massa from "../../imgs/massa.png";

import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/PlatePopup";
import Nav from "../../components/Nav/Nav";
import DeletePopup from "../../components/Popup/DeletePopup";
import DeletePlatePopup from "../../components/Popup/DeletePlatePopup";

const initialState = {
    title: "",
    description: "",
    price: "",
};

const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, categories } = useSelector((state) => state.categories);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [formData, setFormData] = useState(initialState);

    const [popup, setPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePlatePopup, setDeletePlatePopup] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem("user")));
    }, [edit]);

    const logout = () => {
        dispatch({ type: "LOGOUT" });

        setUser(null);
    };

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
    function handleErase() {
        setDeletePopup(true);
    }

    return (
        <main className="menuMain">
            <header>
                <img src={massa} alt="massa-logo"></img>
            </header>

            <Nav categories={categories} user={user} />

            <section className="plateSection">
                {categories.map((cat) => (
                    <div className="plateContainer" key={cat.categorieId}>
                        <h3>{cat.name}</h3>
                        <ul>
                            {cat.plates.map((plate) => (
                                <li key={plate.plateId}>
                                    <DeletePlatePopup
                                        trigger={deletePlatePopup}
                                        setDeletePlatePopup={
                                            setDeletePlatePopup
                                        }
                                        catId={cat.categorieId}
                                        plateId={plate.plateId}
                                    />
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
                                                    <span
                                                        onClick={() =>
                                                            handleEdit(plate)
                                                        }
                                                    >
                                                        Editar
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            setDeletePlatePopup(
                                                                true
                                                            )
                                                        }
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
                                </li>
                            ))}
                        </ul>
                        {user ? (
                            <div className="addDeleteContainer">
                                <button
                                    className="addPlate"
                                    onClick={() => setPopup(!popup)}
                                >
                                    Añadir opción a <strong>{cat.name}</strong>
                                </button>
                                <button
                                    className="deletePlate"
                                    onClick={handleErase}
                                >
                                    Eliminar categoría
                                </button>
                                <DeletePopup
                                    trigger={deletePopup}
                                    setDeletePopup={setDeletePopup}
                                    catId={cat.categorieId}
                                />
                            </div>
                        ) : null}
                        <Popup
                            trigger={popup}
                            setPopup={setPopup}
                            catId={cat.categorieId}
                        />
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Menu;
