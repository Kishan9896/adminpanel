import axios from "axios";
import { Base_URL } from "../../Shared/Base_URL";

const instance = axios.create({
  baseURL: Base_URL + "Medicines",
  timeout: 2000,
});

const RequestMedicines = (config) => {
  return instance.request(config);
};

export const GetReqestMedicines = () => {
  return RequestMedicines({
    method: "GET",
    URL: "Medicines",
  });
};
