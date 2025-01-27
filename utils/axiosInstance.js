import axios from "axios";
const api ="https://interngo.onrender.com" 
const api2='http://192.168.0.141:8080' 
const api3='http://192.168.0.130:8000' 
export const axiosInstance = axios.create({
    baseURL:api,
    timeout:10000
}) 