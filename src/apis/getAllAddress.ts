import api from "./network";

export default function getAllAddress() {
  return api.get("/").then((res) => {
    return res.data;
  });
}
