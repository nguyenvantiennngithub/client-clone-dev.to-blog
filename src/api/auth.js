const axios = require('axios');

const URL = 'http://localhost:8080'

const registerUser = (payload)=> axios.post(`${URL}/auth/register-user`, payload)
const checkLogin = (payload)=> axios.post(`${URL}/auth/login`, payload)
const verifyToken = () => axios.get(`${URL}/auth/verify-token`, {headers: {Authorization: localStorage.getItem('token')}});


export {registerUser, checkLogin, verifyToken};