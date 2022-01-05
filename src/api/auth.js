const axios = require('axios');

// const URL = 'https://server-blog-vantiennn.herokuapp.com'
const URL = 'http://localhost:8080'


const registerUser = (payload)=> axios.post(`${URL}/auth/register-user`, payload)
const checkLogin = (payload)=> axios.post(`${URL}/auth/login`, payload)
const verifyToken = () => axios.get(`${URL}/auth/verify-token`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const updateInfoUser = (payload) => axios.post(`${URL}/auth/update-info`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const changePassword = (payload) => axios.post(`${URL}/auth/change-password`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});


export {registerUser, checkLogin, verifyToken, updateInfoUser, changePassword};