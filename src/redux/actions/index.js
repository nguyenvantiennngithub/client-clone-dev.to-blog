import {createAction, createActions} from 'redux-actions'

const getType = (reduxAction) =>{
    return reduxAction().type;
}

// USER ACTIONS
const registerUser = createActions({
    registerUserRequest: (payload) => payload,
    registerUserSuccess: (payload) => payload,
    registerUserFailure: (err) => err,
})

const loginUser = createActions({
    loginUserRequest: (payload) => payload,
    loginUserSuccess: (payload) => payload,
    loginUserFailure: (err) => err,
})

const verifyToken = createAction('verify token');
const signOut = createAction('signOut');

//POST ACTION
const createPost = createActions({
    createPostRequest: (payload) => payload,
    createPostSuccess: () => undefined,
    createPostFailure: (err) => err,
})

const getPost = createActions({
    getPostRequest: (payload) => payload,
    getPostSuccess: (payload) => payload,
    getPostFailure: (err) => err,
})

const heartPost = createActions({
    heartPostRequest: (payload) => payload,
    heartPostSuccess: (payload) => payload,
    heartPostFailure: (err) => err,
})

const bookmark = createActions({
    bookmarkRequest: (payload) => payload,
    bookmarkSuccess: (payload) => payload,
    bookmarkFailure: (err) => err,
})

const following = createActions({
    followingRequest: (payload) => payload,
    followingSuccess: (payload) => payload,
    followingFailure: (err) => err,
})
const clearPostAuthor = createAction('clearPostAuthor');

const getPosts = createActions({
    getPostsRequest: (payload) => payload,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
})


const updatePostOfPosts = createActions({
    updatePostOfPostsRequest: (payload) => payload,
    updatePostOfPostsSuccess: (payload) => payload,
    updatePostOfPostsFailure: (err) => err,
})


const editPost = createActions({
    editPostRequest: (payload) => payload,
    editPostSuccess: (payload) => payload,
    editPostFailure: (err) => err,
})

export {
    getType, 
    registerUser, loginUser, verifyToken, signOut, 
    createPost, editPost, getPost, heartPost, bookmark,
    following, clearPostAuthor,
    getPosts, updatePostOfPosts
}