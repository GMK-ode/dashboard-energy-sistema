import axios from 'axios';
import { parseCookies } from 'nookies';



const { accessToken: token } = parseCookies();
export const  apiMicrosoft= axios.create({
  baseURL: 'https://graph.microsoft.com/v1.0/me/drive/',
  headers:{
    'Content-Type': 'application/json',
  }
});

apiMicrosoft.interceptors.request.use(config => {
  console.log(config);
  return config;
});

if (token) {
  apiMicrosoft.defaults.headers.Authorization = `Bearer ${token}`;
}