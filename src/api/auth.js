const axios = require('axios');

var URL;
if (window.location.host === "localhost:3000"){
    URL = 'http://localhost:8080'
}else{
    URL = 'https://server-blog-vantiennn.herokuapp.com'
}

const registerUser = (payload)=> axios.post(`${URL}/auth/register-user`, payload)
const checkLogin = (payload)=> axios.post(`${URL}/auth/login`, payload)
const verifyToken = () => axios.get(`${URL}/auth/verify-token`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const updateInfoUser = (payload) => axios.post(`${URL}/auth/update-info`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const changePassword = (payload) => axios.post(`${URL}/auth/change-password`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});


export {registerUser, checkLogin, verifyToken, updateInfoUser, changePassword};