import api from "./network";

export default async function getAllAddress() {
    const res = await api.get("/");
    return res.data;
}
