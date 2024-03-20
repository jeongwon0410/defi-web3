import axios from "axios";

// const url = "http://10.41.169.226:3000/lending";
const url = "http://101.101.211.232:3000/lending";
const api = axios.create({
  baseURL: url,
  validateStatus: (status) => {
    return status < 300;
  },
});

export default api;
