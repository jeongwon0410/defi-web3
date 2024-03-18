import api from "./network";

export default function saveAddress(address: string) {
  return api.post("/", { address });
}
