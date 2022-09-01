import axios from "axios";
import { Base_URL } from "../../Shared/Base_URL";

const instance = axios.create({
  baseURL: Base_URL,
  timeout: 2000,
});

const RequestMedicines = (config) => {
  return instance.request(config);
};

export const GetReqestMedicines = (path) => {
  return RequestMedicines({
    method: "GET",
    URL: path,
  });
};

export const postRequest = (path, values) => {
  return RequestMedicines({
    method: "POST",
    url: path,
    data: JSON.stringify(values),
  })
};

export const deletRequest = (path, id) =>{
  return RequestMedicines({
    method: "DELET",
    url: path + id,
  
  })
}

export const putRequest = (path, values) => {
return RequestMedicines({
  method: "PUT",
  url: path + values.id,
  data: JSON.stringify(values),
  headers: {
    "Content-Type": "application/json",
  },

});
};
