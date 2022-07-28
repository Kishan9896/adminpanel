import { Base_URL } from "../../../Shared/Base_URL";
import { GET_MEDICINES, LOADING_MEDICINES, ERROR_MEDICINES } from "../reducer/actionType";

export const Medicine = () => (dispatch) => {

    dispatch(MedicineLoading())

    try {
        setTimeout(() => {
            fetch(Base_URL +'Medicines')
            .then(response => {
                if (response.ok) {
                  return response;
                } else {
                  var error = new Error('Something Went Wrong' + response.status + ': ' + response.statusText);
                  error.response = response;
                  throw error;
                }
              },
                error => {
                  var errmess = new Error(error.message);
                  throw errmess;
                })
              .then(response => response.json())
            .then((data) => dispatch({ type:  GET_MEDICINES, payload: data}))
            .catch((error) => dispatch(MedicineError(error.message)))
        }, 2000)
    } catch (error) {
        console.log(error);
    }
    
    
}

export const MedicineLoading = () => (dispatch) => {
    dispatch({type : LOADING_MEDICINES})
}

export const MedicineError = (error) => (dispatch) => {
    dispatch({type : ERROR_MEDICINES, payload: error})
}