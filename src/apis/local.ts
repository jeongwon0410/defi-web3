import axios from "axios";

const baseURL = "http://101.101.211.232:3000/lending";

const api = axios.create({ baseURL, validateStatus: (status) => status < 300 });

export const saveAddress = async (address: string) => {
  await api.post("/", { address });
};

export const getAllAddress = async () => {
  const res = await api.get("/");
  return res.data;
};
