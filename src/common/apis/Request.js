import axios from "axios";
import { Base_URL } from "../../Shared/Base_URL";

const instance = axios.create({
  baseURL: Base_URL
});

const RequestMedicines = (config) => {
  return instance.request(config);
};

export const GetReqestMedicines = (path) => {
  return RequestMedicines({
    method: "get",
    URL: path,
  });
};

export const postRequest = (path, values) => {
  return RequestMedicines({
    method: "post",
    url: path,
    data: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
};

export const deletRequest = (path, id) => {
  return RequestMedicines({
    method: "delete",
    url: path + id,
    headers: {
      "Content-Type": "application/json",
    },
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
