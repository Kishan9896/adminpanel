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
    url: path,
  });
};

export const PostReqestMedicines = (path, data) => {
  return RequestMedicines({
    method: "POST",
    url: path,
  });
};

export const PutRequestMedicines = (path, data) => {
  return RequestMedicines({
    method: "PUT",
    url: path,
    data: JSON.stringify("Medicines" + data.id),
  });
};
