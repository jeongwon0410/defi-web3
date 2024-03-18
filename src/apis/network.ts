import axios from "axios";

const url = "http://localhost:3001/lending";
const api = axios.create({
  baseURL: url,
  validateStatus: (status) => {
    return status < 300;
  },
});

export default api;
