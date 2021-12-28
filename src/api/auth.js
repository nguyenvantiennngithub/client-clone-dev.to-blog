const axios = require('axios');

const URL = 'https://server-blog-vantiennn.herokuapp.com'

const registerUser = (payload)=> axios.post(`${URL}/auth/register-user`, payload)
const checkLogin = (payload)=> axios.post(`${URL}/auth/login`, payload)
const verifyToken = () => axios.get(`${URL}/auth/verify-token`, {headers: {Authorization: localStorage.getItem('token')}});


export {registerUser, checkLogin, verifyToken};