const { default: axios } = require("axios");

export const apiUrl = "https://api.vitaparapharma.com/api/v1";

const axiosClient = axios.create({
  baseURL: apiUrl,

});

export default axiosClient;


