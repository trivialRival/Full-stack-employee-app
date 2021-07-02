import { createStore } from "redux";
const obj = {
    id: "",
    name: "",
    role: "",
    isSubmitted: false,
    showOverlay: false,
    id_sent: "",

    expand: false,
};
const reducerfn = (state = obj, action) => {
    if (action.type === "COLLAPSE_PERSON_INPUT") {
        return { ...state, expand: !state.expand };
    }
    if (action.type === "OVERLAY_TOGGLE") {
        return {
            ...state,
            showOverlay: !state.showOverlay,
            id_sent: action.payload_id,
        };
    }
    if (action.type === "TOGGLE") {
        return {
            ...state,
            showOverlay: !state.showOverlay,
        };
    }
    return state;
};
const store = createStore(reducerfn);

export default store;
