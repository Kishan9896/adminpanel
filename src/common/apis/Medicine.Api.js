import { deletRequest, GetReqestMedicines, postRequest, putRequest } from "./Request";
import { URL } from "./URL";

export const GetMedicines = () => GetReqestMedicines(URL.medicine);

export const addMedicines = (values) => postRequest(URL.medicine, values);

export const deletMedicines = (id) => deletRequest(`${URL.medicine}/`, id);

export const editMedicine = (values) => putRequest(`${URL.medicine}/`, values);