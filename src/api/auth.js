import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

const registerUser = (payload)=> axios.post(`${URL}/auth/register-user`, payload)
const checkLogin = (payload)=> axios.post(`${URL}/auth/login`, payload)
const loginSocial = (payload) => axios.post(`${URL}/auth/login-social`, payload);
const verifyToken = () => axios.get(`${URL}/auth/verify-token`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const updateInfoUser = (payload) => axios.post(`${URL}/auth/update-info`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const changePassword = (payload) => axios.post(`${URL}/auth/change-password`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});


export {registerUser, checkLogin, verifyToken, updateInfoUser, changePassword, loginSocial};