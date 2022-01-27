import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

const getNotification = () => axios.get(`${URL}/notification/`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
const seenNotification = (payload) => axios.post(`${URL}/notification/seen`, payload, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
export {getNotification, seenNotification};