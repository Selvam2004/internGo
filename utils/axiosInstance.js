import axios from "axios";
const api ="https://interngo.onrender.com" 
const api2='http://192.168.0.141:8080' 
const api3='http://192.168.0.130:10000' 
const api4='http://192.168.142.116:8080'
export const axiosInstance = axios.create({
    baseURL:api3,
    timeout:10000
}) 