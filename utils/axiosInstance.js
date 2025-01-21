import axios from "axios";
const api ="http://192.168.0.141:8080" 
export const axiosInstance = axios.create({
    baseURL:api
})