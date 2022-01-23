
const axios = require('axios');

var URL;
if (window.location.host === "localhost:3000"){
    URL = 'http://localhost:8080'
}else{
    URL = 'https://server-blog-vantiennn.herokuapp.com'
}


const getNotification = () => axios.get(`${URL}/notification/`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const seenNotification = (payload) => axios.post(`${URL}/notification/seen`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
export {getNotification, seenNotification};