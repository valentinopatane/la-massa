import { AUTH } from "../constants/constants";
import * as api from "../api";

export const login =
    (formData, navigate, setLoginError) => async (dispatch) => {
        try {
            const { data } = await api.logIn(formData);

            dispatch({ type: AUTH, payload: data });
            navigate("/menu");
        } catch (error) {
            setLoginError(true);
            console.log(error);
            return false;
        }
    };
