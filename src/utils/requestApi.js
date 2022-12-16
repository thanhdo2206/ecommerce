import axios from "axios";

const requestApi = axios.create({
  baseURL: "https://economic.onrender.com/api/v1/",
});

export default requestApi;
