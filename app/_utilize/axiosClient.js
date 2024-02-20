const { default: axios } = require("axios");

export const apiUrl = "http://vitaparapharma.com:8080/api/v1";

const axiosClient = axios.create({
  baseURL: apiUrl,

});

export default axiosClient;
