const axios = require('axios');

// const URL = 'https://server-blog-vantiennn.herokuapp.com'
const URL = 'http://localhost:8080'


const comment = (payload) => axios.post(`${URL}/comment/`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const showReply = (payload) => axios.get(`${URL}/comment/${payload.id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const heartComment = (payload) => axios.post(`${URL}/comment/${payload.id}/heart`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const editComment = (payload) => axios.patch(`${URL}/comment/${payload.id}`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const deleteComment = (payload) => axios.delete(`${URL}/comment/${payload.id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});


export {comment, showReply, heartComment, editComment, deleteComment};