import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;


const getPosts = (data) => axios.get(`${URL}/post/all?currentPage=${data.currentPage}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const uploadImageBlog = (url) => axios.post(`${URL}/post/upload-image`, url, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const createPost = (data) =>axios.post(`${URL}/post/create-post`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})//{content: {html, text}, cover, title, tags}
const getPersonalPosts = (data) => axios.get(`${URL}/post/personal-post?sort=${data}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const getPost = (data) => axios.get(`${URL}/post/${data}`)
const heartPost = (data) => axios.post(`${URL}/post/${data.slug}/heart`, {isPush: data.isPush}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const bookmark = (data) => axios.post(`${URL}/post/${data.slug}/bookmark`, {isPush: data.isPush}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const followUser = (data) => axios.post(`${URL}/user/${data.author}/follow`, {isPush: data.isPush}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const editPost = (data) => axios.post(`${URL}/post/${data.slug}/edit`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const deletePost = (data) => axios.post(`${URL}/post/${data}/delete`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
const getProfile = (data) => axios.get(`${URL}/post/${data}/profile`)

export {
    getPosts, uploadImageBlog, createPost, getPersonalPosts
    , getPost, heartPost, bookmark, followUser, editPost, 
    deletePost, getProfile
}