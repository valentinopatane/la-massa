import React from "react";
import { useDispatch } from "react-redux";
import { deletePlate } from "../../controllers/categories";

const DeletePlatePopup = (props) => {
    const dispatch = useDispatch();
    function handleErase() {
        dispatch(deletePlate(props.catId, props.plateId));
        props.setDeletePlatePopup(false);
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
                        onClick={() => props.setDeletePlatePopup(false)}
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

export default DeletePlatePopup;
