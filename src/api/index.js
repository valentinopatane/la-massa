import axios from "axios";

const API = axios.create({
    baseURL: "https://tired-jade-button.cyclic.app/",
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
        }`;
    }
    return req;
});

/*CATEGORIES*/
export const fetchCategories = () => API.get("/api/categories");
export const createCategory = (newCat) => API.post("/api/categories", newCat);
export const deleteCat = (id) => API.delete(`/api/categories/${id}`);
/*AUTH*/
export const logIn = (formData) => API.post("/login", formData);
/*PLATES*/
export const createPlate = (catId, plate) =>
    API.post(`/api/plates/${catId}`, plate);
export const editPlate = (catId, editedPlate) =>
    API.put(`/api/plates/${catId}`, editedPlate);
export const erasePlate = (catId, plateId) =>
    API.delete(`/api/plates/${catId}`, { data: { plateId } });
