import { addMethod } from "yup";
import { GetMedicines, PostMedicines } from "../../../common/apis/Medicine.Api";
import { Base_URL } from "../../../Shared/Base_URL";
import {
  GET_MEDICINES,
  LOADING_MEDICINES,
  ERROR_MEDICINES,
  ADD_MEDICINES,
  DELETE_MEDICINES,
  UPDATE_MEDICINES,
} from "../reducer/actionType";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { db, storage } from "../../../firebase";
import { ActionTypes } from "@mui/base";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


// Firebase Read Code
export const Medicine = () => async (dispatch) => {

  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      console.log(data);
      dispatch({ type: GET_MEDICINES, payload: data })
      console.log(`${doc.id} => ${doc.data()}`);
    });
    // dispatch(MedicineLoading());
    // setTimeout(() => {
    //   GetMedicines()
    //     .then((data) => dispatch({ type: GET_MEDICINES, payload: data.data }))
    //     .catch((error) => dispatch(MedicineError(error.message)));
    //   console.log(GetMedicines());
    //   // fetch(Base_URL + 'Medicines')
    //   //   .then(response => {
    //   //     if (response.ok) {
    //   //       return response;
    //   //     } else {
    //   //       var error = new Error('Something Went Wrong' + response.status + ': ' + response.statusText);
    //   //       error.response = response;
    //   //       throw error;
    //   //     }
    //   //   },
    //   //     error => {
    //   //       var errmess = new Error(error.message);
    //   //       throw errmess;
    //   //     })
    //   //   .then(response => response.json())
    //   //   .then((data) => dispatch({ type: GET_MEDICINES, payload: data }))
    //   //   .catch((error) => dispatch(MedicineError(error.message)))
    // }, 2000);
  } catch (error) {
    // dispatch(MedicineError(error.message));
  }
};

// Firebase Add Code
export const AddMedicine = (dataIn) => async (dispatch) => {
  console.log(dataIn);
  try {
    const randomNum = Math.floor(Math.random() * 1000000);
    const spaceRef = ref(storage, 'images/' + randomNum);
    uploadBytes(spaceRef, dataIn.Prof_img).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (url) => {
          console.log(url);
          const docRef = await addDoc(collection(db, "users"), { ...dataIn, Prof_img: url, File_Number: randomNum });
          dispatch({ type: ADD_MEDICINES, payload: { ...dataIn, Prof_img: url, id: docRef.id, } })
        })
      console.log('Uploaded a blob or file!');
    });




  } catch (error) {
    dispatch(MedicineError(error.message));
  }
};

// setTimeout(() => {
//   PostMedicines()
//     .then((dataIn) =>
//       dispatch({ type: ADD_MEDICINES, payload: dataIn.data })
//     )
//     .catch((error) => dispatch(MedicineError(error.message)));
//   // fetch(Base_URL + "Medicines", {
//   //   method: "POST",
//   //   body: JSON.stringify(dataIn),
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // })
//   //   .then(
//   //     (response) => {
//   //       if (response.ok) {
//   //         return response;
//   //       } else {
//   //         var error = new Error(
//   //           "Something Went Wrong" +
//   //             response.status +
//   //             ": " +
//   //             response.statusText
//   //         );
//   //         error.response = response;
//   //         throw error;
//   //       }
//   //     },
//   //     (error) => {
//   //       var errmess = new Error(error.message);
//   //       throw errmess;
//   //     }
//   //   )
//   //   .then((response) => response.json())
//   //   .then((dataIn) => dispatch({ type: ADD_MEDICINES, payload: dataIn }))
//   //   .catch((error) => dispatch(MedicineError(error.message)));
// }, 2000);


export const DeleteMedicine = (dataIn) => async (dispatch) => {
  console.log(dataIn);
  try {
    const MedicineRef = ref(storage, 'images/' + dataIn.File_Number);
    deleteObject(MedicineRef).then(async () => {
      await deleteDoc(doc(db, "users", dataIn.id));
      dispatch({ type: DELETE_MEDICINES, payload: dataIn.id })
    }).catch((error) => {
      dispatch(MedicineError(error.message));
    });


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
    //             response.status +
    //             ": " +
    //             response.statusText
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
};

export const UpdateMedicine = (data) => async (dispatch) => {
  console.log(data);
  try {
    const washingtonRef = doc(db, "users", data.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      name: data.name,
      price: data.price,
      quntity: data.quntity,
      expiry: data.expiry
    });

    dispatch({ type: UPDATE_MEDICINES, payload: data })

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
    //             response.status +
    //             ": " +
    //             response.statusText
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
};

export const MedicineLoading = () => (dispatch) => {
  dispatch({ type: LOADING_MEDICINES });
};

export const MedicineError = (error) => (dispatch) => {
  dispatch({ type: ERROR_MEDICINES, payload: error });
};
