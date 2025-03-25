import axios from 'axios';


export const  apiMock = axios.create({
  baseURL: 'https://67e21e1097fc65f53534a77f.mockapi.io',
  headers:{
    'Content-Type': 'application/json'
  }
})

apiMock.interceptors.request.use(async config => {
  return config;
});