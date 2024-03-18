import api from "./network";

export default function getAddress(address: string) {
  return api.get("/address/" + address);
}
