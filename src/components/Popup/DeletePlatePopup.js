import React from "react";
import { useDispatch } from "react-redux";
import { deletePlate } from "../../controllers/categories";

const DeletePlatePopup = ({
    catId,
    plateId,
    deleteId,
    setDeletePlatePopup,
    trigger,
}) => {
    const dispatch = useDispatch();
    function handleErase() {
        dispatch(deletePlate(catId, plateId));
        setDeletePlatePopup(false);
    }
    return trigger && deleteId === plateId ? (
        <div className="popup">
            <div className="popupInner">
                <h5>¿Estás seguro?</h5>
                <div className="sureButtons">
                    <span className="sureButton" onClick={handleErase}>
                        Si
                    </span>
                    <span
                        className="notSureButton"
                        onClick={() => setDeletePlatePopup(false)}
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
