import axios from "axios";
const api ="https://interngo.onrender.com" 
export const axiosInstance = axios.create({
    baseURL:api
})