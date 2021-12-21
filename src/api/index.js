const axios = require('axios');

const URL = 'http://localhost:8080'
const headers = {
    'Authorization': localStorage.getItem('token'),
}
const registerUser = (payload)=> axios.post(`${URL}/auth/register-user`, payload)
const checkLogin = (payload)=> axios.post(`${URL}/auth/login`, payload)
const verifyToken = () => axios.get(`${URL}/auth/verify-token`, {headers});
const uploadImageBlog = (url) => axios.post(`${URL}/post/upload-image`, url, {headers})
const createPost = (data) => axios.post(`${URL}/post/create-post`, data, {headers})//{content: {html, text}, cover, title, tags}
const getPost = (data) => axios.get(`${URL}/post/${data}`)
const heartPost = (data) => axios.post(`${URL}/post/${data.slug}/heart`, {isPush: data.isPush}, {headers})
const bookmark = (data) => axios.post(`${URL}/post/${data.slug}/bookmark`, {isPush: data.isPush}, {headers})
const followUser = (data) => axios.post(`${URL}/user/${data.author}/follow`, {isPush: data.isPush}, {headers})
const getPosts = () => axios.get(`${URL}/post/all`, {headers})
const editPost = (data) => axios.post(`${URL}/post/${data.slug}/edit`, data, {headers})
export {
    registerUser, checkLogin, verifyToken, uploadImageBlog, 
    createPost, getPost, heartPost, bookmark, followUser, getPosts, editPost}
