import axios from 'axios';

const API = axios.create({baseURL : process.env.REACT_APP_BASEURL});

API.interceptors.request.use((req) => {
     if(localStorage.getItem('token')){
          req.headers.Authrization = `Bearer ${localStorage.getItem('token')}`;
     }
     return req;
});

export default API;