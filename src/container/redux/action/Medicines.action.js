import { GET_MEDICINES } from "../reducer/actionType";

export const Medicine = () => (dispatch) => {
    fetch('http://localhost:3004/Medicines')
        .then((response) => response.json())
        .then((data) => dispatch({ type:  GET_MEDICINES, payload: data}));
}