const { default: axios } = require("axios");

export const apiUrl = "http://195.35.28.106:8080/api/v1";

const axiosClient = axios.create({
  baseURL: apiUrl,

});

export default axiosClient;
