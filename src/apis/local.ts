import axios from "axios";
import useSWR from "swr";

const baseURL = "http://101.101.211.232:3000/lending";

const api = axios.create({ baseURL, validateStatus: (status) => status < 300 });

type AllAddress = {
  id: number;
  rank: number;
  address: string;
  deposit: number;
  borrow: number;
  referral: number;
  total: number;
}[];

export const useAllAddress = () => {
  // TODO: baseURL 이렇게 쓰는게 맞는지
  return useSWR<AllAddress>(baseURL, () =>
    fetch(baseURL).then((r) => r.json()),
  );
};

export const saveAddress = async (address: string) => {
  await api.post("/", { address });
};
