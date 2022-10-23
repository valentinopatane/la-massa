import {
    FETCH_ALL,
    START_LOADING,
    END_LOADING,
    CREATE,
    UPDATE,
    DELETE,
} from "../constants/constants";
import * as api from "../api";

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchCategories();

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("Error: " + error);
    }
};
export const createCategory = (cat) => async (dispatch) => {
    try {
        const { data } = await api.createCategory(cat);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const createPlate = (categoryId, plate) => async (dispatch) => {
    try {
        const { data } = await api.createPlate(categoryId, plate);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const updatePlate = (categoryId, updatedPlate) => async (dispatch) => {
    try {
        const { data } = await api.editPlate(categoryId, updatedPlate);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const deletePlate = (categoryId, plateId) => async (dispatch) => {
    try {
        const { data } = await api.erasePlate(categoryId, plateId);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const deleteCategorie = (id) => async (dispatch) => {
    try {
        await api.deleteCat(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};
