import { createAction, createActions } from "redux-actions"


const getPersonalPosts = createActions({
    getPersonalPostsRequest: (payload) => payload,
    getPersonalPostsSuccess: (payload) => payload,
    getPersonalPostsFailure: (err) => err,
})


const updatePostInProfile = createActions({
    updatePostInProfileRequest: (payload) => payload,
    updatePostInProfileSuccess: (payload) => payload,
    updatePostInProfileFailure: (err) => err,
})

const clearProfile = createAction('cleartProfile')


export {getPersonalPosts, updatePostInProfile, clearProfile}