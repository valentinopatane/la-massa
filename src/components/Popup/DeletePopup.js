import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategorie } from "../../controllers/categories";

const DeletePopup = (props) => {
    const dispatch = useDispatch();
    function handleErase() {
        dispatch(deleteCategorie(props.catId));
        props.setDeletePopup(false);
    }
    return props.trigger ? (
        <div className="popup">
            <div className="popupInner">
                <h5>¿Estás seguro?</h5>
                <div className="sureButtons">
                    <span className="sureButton" onClick={() => handleErase()}>
                        Si
                    </span>
                    <span
                        className="notSureButton"
                        onClick={() => props.setDeletePopup(false)}
                    >
                        No
                    </span>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default DeletePopup;
