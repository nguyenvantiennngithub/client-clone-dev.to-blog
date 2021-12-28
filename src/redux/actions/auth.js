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

const verifyToken = createAction('verify token');
const signOut = createAction('signOut');




export {registerUser, loginUser, verifyToken, signOut,}