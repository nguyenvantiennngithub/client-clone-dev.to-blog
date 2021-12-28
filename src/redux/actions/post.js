import { createAction, createActions } from "redux-actions"

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

const editPost = createActions({
    editPostRequest: (payload) => payload,
    editPostSuccess: (payload) => payload,
    editPostFailure: (err) => err,
})

const deletePost = createActions({
    deletePostRequest: (payload) => payload,
    deletePostSuccess: (payload) => payload,
    deletePostFailure: (err) => err,
})
const clearPostAuthor = createAction('clearPostAuthor');

export {createPost, editPost, getPost, heartPost, bookmark, following, deletePost, clearPostAuthor,}