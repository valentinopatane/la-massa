import {
    FETCH_ALL,
    START_LOADING,
    END_LOADING,
    CREATE,
    UPDATE,
    DELETE,
} from "../constants/constants";

export default (state = { isLoading: true, categories: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                categories: action.payload,
            };
        case CREATE:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case UPDATE:
            return {
                ...state,
                categories: state.categories.map((p) =>
                    p.categorieId === action.payload.categorieId
                        ? action.payload
                        : p
                ),
            };
        case DELETE:
            return {
                ...state,
                categories: state.categories.filter(
                    (p) => p.categorieId !== action.payload
                ),
            };
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
