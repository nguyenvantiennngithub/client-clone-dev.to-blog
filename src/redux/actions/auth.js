import { createAction, createActions } from "redux-actions";

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

const updateInfoUser = createActions({
    updateInfoUserRequest: (payload) => payload,
    updateInfoUserSuccess: (payload) => payload,
    updateInfoUserFailure: (err) => err,
})

const changePassword = createActions({
    changePasswordRequest: (payload) => payload,
    changePasswordSuccess: (payload) => payload,
    changePasswordFailure: (err) => err,
})

const pushNewPost = createAction('push New Post');

const verifyToken = createAction('verify token');
const signOut = createAction('signOut');
const resetMessage = createAction('resetMessage');




export {registerUser, loginUser, verifyToken, signOut, pushNewPost, updateInfoUser, changePassword, resetMessage}