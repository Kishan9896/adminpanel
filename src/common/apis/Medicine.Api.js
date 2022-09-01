import {
  GetReqestMedicines,
  PostReqestMedicines,
  PutRequestMedicines,
} from "./Request";

export const GetMedicines = (path) => {
  return GetReqestMedicines("Medicines");
};

export const PostMedicines = (path, data) => {
  return PostReqestMedicines("Medicines/" + data.id);
};

export const PutMedicines = (data) => {
  return PutRequestMedicines("Medicines" + data);
};
