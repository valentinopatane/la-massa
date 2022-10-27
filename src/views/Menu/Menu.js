import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../controllers/categories";

import massa from "../../imgs/massa.png";

import Popup from "../../components/Popup/PlatePopup";
import Nav from "../../components/Nav/Nav";
import DeletePopup from "../../components/Popup/DeletePopup";
import Plate from "../../components/Plates/Plate";

const Menu = () => {
    const dispatch = useDispatch();
    const { isLoading, categories } = useSelector((state) => state.categories);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [popup, setPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const [addId, setAddId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    function handleErase(catId) {
        setDeletePopup(true);
        setDeleteId(catId);
    }

    return (
        <main className="menuMain">
            <header>
                <img src={massa} alt="massa-logo"></img>
            </header>

            <Nav categories={categories} user={user} />

            <section className="plateSection">
                {isLoading ? (
                    <div className="spinnerContainer">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    categories.map((cat) => (
                        <div className="plateContainer" key={cat.categorieId}>
                            <h3>{cat.name}</h3>

                            <Plate user={user} setUser={setUser} cat={cat} />

                            {user ? (
                                <div className="addDeleteContainer">
                                    <button
                                        className="addPlate"
                                        onClick={() => {
                                            setPopup(!popup);
                                            setAddId(cat.categorieId);
                                        }}
                                    >
                                        Añadir opción a{" "}
                                        <strong>{cat.name}</strong>
                                    </button>
                                    <button
                                        className="deletePlate"
                                        onClick={() =>
                                            handleErase(cat.categorieId)
                                        }
                                    >
                                        Eliminar categoría
                                    </button>
                                    <DeletePopup
                                        trigger={deletePopup}
                                        setDeletePopup={setDeletePopup}
                                        catId={cat.categorieId}
                                        deleteId={deleteId}
                                    />
                                </div>
                            ) : null}
                            <Popup
                                trigger={popup}
                                setPopup={setPopup}
                                addId={addId}
                                catId={cat.categorieId}
                            />
                        </div>
                    ))
                )}
            </section>
        </main>
    );
};

export default Menu;
