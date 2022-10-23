import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../imgs/left-arrow-svgrepo-com.svg";
const BackArrow = () => {
    const navigate = useNavigate();
    return (
        <div className="backButton" onClick={() => navigate(-1)}>
            <img src={arrow}></img>
        </div>
    );
};

export default BackArrow;
