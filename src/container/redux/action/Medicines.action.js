import { addMethod } from "yup";
import { addMedicines, deletMedicines, editMedicine, GetMedicines } from "../../../common/apis/Medicine.Api";
import { Base_URL } from "../../../Shared/Base_URL";
import {
  GET_MEDICINES,
  LOADING_MEDICINES,
  ERROR_MEDICINES,
  ADD_MEDICINES,
  DELETE_MEDICINES,
  UPDATE_MEDICINES,
} from "../reducer/actionType";

export const Medicine = () => (dispatch) => {
  return (dispatch) => {
    dispatch(MedicineLoading());

    setTimeout(() => {
      GetMedicines()
        .then((res) => dispatch({ type: GET_MEDICINES, payload: res.data }))
        .catch((error) => dispatch(MedicineError(error.message)));
      // fetch(Base_URL +'Medicines')
      // .then(response => {
      //     if (response.ok) {
      //       return response;
      //     } else {
      //       var error = new Error('Something Went Wrong' + response.status + ': ' + response.statusText);
      //       error.response = response;
      //       throw error;
      //     }
      //   },
      //     error => {
      //       var errmess = new Error(error.message);
      //       throw errmess;
      //     })
      //   .then(response => response.json())
      // .then((data) => dispatch({ type:  GET_MEDICINES, payload: data}))
      // .catch((error) => dispatch(MedicineError(error.message)))
    }, 2000);
  }
};

export const AddMedicine = (medicine) => {
  return async (dispatch) => {
    try {
      const res = await addMedicines(medicine);
      if (res.status === 201) {
        dispatch({ type: ADD_MEDICINES, payload: medicine })
      }
      // setTimeout(() => {
      //   fetch(Base_URL + "Medicines", {
      //     method: "POST",
      //     body: JSON.stringify(dataIn),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //     .then(
      //       (response) => {
      //         if (response.ok) {
      //           return response;
      //         } else {
      //           var error = new Error(
      //             "Something Went Wrong" +
      //               response.status +
      //               ": " +
      //               response.statusText
      //           );
      //           error.response = response;
      //           throw error;
      //         }
      //       },
      //       (error) => {
      //         var errmess = new Error(error.message);
      //         throw errmess;
      //       }
      //     )
      //     .then((response) => response.json())
      //     .then((dataIn) => dispatch({ type: ADD_MEDICINES, payload: dataIn }))
      //     .catch((error) => dispatch(MedicineError(error.message)));
      // }, 2000);
    } catch (error) {
      dispatch(MedicineError(error.message));
    }
  };
  }
  

export const DeleteMedicine = (id) => {
  return async (dispatch) => {
    try {
      const res = await deletMedicines(id);
      if (res.status === 200) {
        dispatch({ type: DELETE_MEDICINES, payload: id });
    }
      // setTimeout(() => {
      //   fetch(Base_URL + "Medicines/" + id, {
      //     method: "DELETE",
      //   })
      //     .then(
      //       (response) => {
      //         if (response.ok) {
      //           return response;
      //         } else {
      //           var error = new Error(
      //             "Something Went Wrong" +
      //               response.status +
      //               ": " +
      //               response.statusText
      //           );
      //           error.response = response;
      //           throw error;
      //         }
      //       },
      //       (error) => {
      //         var errmess = new Error(error.message);
      //         throw errmess;
      //       }
      //     )
      //     .then((response) => response.json())
      //     .then(dispatch({ type: DELETE_MEDICINES, payload: id }))
      //     .catch((error) => dispatch(MedicineError(error.message)));
      // }, 2000);
    } catch (error) {
      dispatch(MedicineError(error.message));
    }
  }
  
};

export const UpdateMedicine = (medicine) => {
  return async (dispatch) => {
    try {
      const res = await editMedicine(medicine)
      if (res.status === 200) {
        dispatch({ type: UPDATE_MEDICINES, payload: medicine });
      }
      // setTimeout(() => {
      //   fetch(Base_URL + "Medicines/" + data.id, {
      //     method: "PUT",
      //     body: JSON.stringify(data),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //     .then(
      //       (response) => {
      //         if (response.ok) {
      //           return response;
      //         } else {
      //           var error = new Error(
      //             "Something Went Wrong" +
      //               response.status +
      //               ": " +
      //               response.statusText
      //           );
      //           error.response = response;
      //           throw error;
      //         }
      //       },
      //       (error) => {
      //         var errmess = new Error(error.message);
      //         throw errmess;
      //       }
      //     )
      //     .then((response) => response.json())
      //     .then((id) => dispatch({ type: UPDATE_MEDICINES, payload: data }))
      //     .catch((error) => dispatch(MedicineError(error.message)));
      // }, 2000);
    } catch (error) {
      dispatch(MedicineError(error.message));
    }
  }
  
};

export const MedicineLoading = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_MEDICINES });
  }
};

export const MedicineError = (error) => {
  return (dispatch) => {
    dispatch({ type: ERROR_MEDICINES, payload: error });
  }
};
