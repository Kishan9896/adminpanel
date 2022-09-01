import { deletRequest, GetReqestMedicines, postRequest, putRequest } from "./Request";

export const GetMedicines = () => {
  return GetReqestMedicines("Medicines");
};

export const addMedicines = (values) => {
  return postRequest('Medicines/', values)
};

export const deletMedicines = (id) =>{
  return deletRequest('medicine/', id)
};

export const editMedicine = (values) =>{
  return putRequest('medicine/', values)
};