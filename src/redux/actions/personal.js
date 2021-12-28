import { createAction, createActions } from "redux-actions";

const clearPersonalPosts = createAction('clearPersonalPosts');

const getProfile = createActions({
    getProfileRequest: (payload) => payload,
    getProfileSuccess: (payload) => payload,
    getProfileFailure: (err) => err,
})

export {clearPersonalPosts, getProfile}