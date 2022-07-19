import { DECREMENT, INCREMENT } from "../reducer/actionType"


export const increment = () => (dispatch) => {
        dispatch({ type : INCREMENT });
}

export const decrement = () => (dispatch) => {
   
        dispatch({ type : DECREMENT });
}