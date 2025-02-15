import axios from "axios";
import  store  from "../redux/store";
import { logout } from "../redux/reducers/AuthSlice";
const api ="https://interngo.onrender.com" 
const api2='http://192.168.0.141:8080' 
const api3='http://192.168.0.130:8080' 
const api4='http://192.168.142.116:8080'
export const axiosInstance = axios.create({
    baseURL:api2,
    timeout:10000
}) 

axiosInstance.interceptors.response.use(
    response => response,
    error => { 
        
      if (error.response && error.response.status === 401) { 
        console.log(error);
        
        store.dispatch(logout());
  
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );


  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth?.data?.data?.token;   
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );