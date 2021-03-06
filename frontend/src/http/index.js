import axios from 'axios';


const $host = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
})

const authIterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}


$authHost.interceptors.request.use(authIterceptor);

export {
    $host,
    $authHost
}